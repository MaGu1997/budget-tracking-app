from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from database import get_db
from models import Expense
from schemas import ExpenseCreate, Expense as ExpenseSchema

router = APIRouter()


@router.get("/", response_model=dict)
def get_expenses(db: Session = Depends(get_db)):
    expenses = db.query(Expense).all()
    total_expenses = sum(expense.amount for expense in expenses)
    # Convert SQLAlchemy models to Pydantic models using model_validate
    expenses_pydantic = [
        {
            **ExpenseSchema.model_validate(expense).model_dump(),
            "date": expense.date.strftime("%H:%M:%S, %d %B %Y"),  # Format the date
        }
        for expense in expenses
    ]
    return {"total_expenses": total_expenses, "expenses": expenses_pydantic}


@router.post("/add", response_model=ExpenseSchema)
def add_expense(expense: ExpenseCreate, db: Session = Depends(get_db)):
    # Get the latest ID from the database and increment it
    latest_expense = db.query(Expense).order_by(Expense.id.desc()).first()
    new_id = (latest_expense.id + 1) if latest_expense else 1

    db_expense = Expense(
        id=new_id,  # Assign the new ID
        name=expense.name,
        amount=expense.amount,
        category=expense.category,
        date=datetime.now(timezone.utc),  # Automatically add the current date
    )
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense


@router.delete("/delete/{expense_id}", response_model=dict)
def delete_expense(expense_id: int, db: Session = Depends(get_db)):
    expense = db.query(Expense).filter(Expense.id == expense_id).first()
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    db.delete(expense)
    db.commit()
    return {"message": "Expense deleted successfully"}
