from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from database import get_db
from models import Income
from schemas import IncomeCreate, Income as IncomeSchema

router = APIRouter()


@router.get("/", response_model=dict)
def get_income(db: Session = Depends(get_db)):
    income = db.query(Income).all()
    total_income = sum(inc.amount for inc in income)
    # Convert SQLAlchemy models to Pydantic models using model_validate
    income_pydantic = [
        {
            **IncomeSchema.model_validate(inc).model_dump(),
            "date": inc.date.strftime("%H:%M:%S, %d %B %Y"),  # Format the date
        }
        for inc in income
    ]
    return {"total_income": total_income, "income": income_pydantic}


@router.post("/add", response_model=IncomeSchema)
def add_income(income: IncomeCreate, db: Session = Depends(get_db)):
    # Get the latest ID from the database and increment it
    latest_income = db.query(Income).order_by(Income.id.desc()).first()
    new_id = (latest_income.id + 1) if latest_income else 1

    db_income = Income(
        id=new_id,  # Assign the new ID
        name=income.name,
        amount=income.amount,
        category=income.category,
        date=datetime.now(timezone.utc),  # Automatically add the current date
    )
    db.add(db_income)
    db.commit()
    db.refresh(db_income)  # Refresh to get the id and date
    return db_income


@router.delete("/delete/{income_id}", response_model=dict)
def delete_income(income_id: int, db: Session = Depends(get_db)):
    income = db.query(Income).filter(Income.id == income_id).first()
    if not income:
        raise HTTPException(status_code=404, detail="Income not found")
    db.delete(income)
    db.commit()
    return {"message": "Income deleted successfully"}
