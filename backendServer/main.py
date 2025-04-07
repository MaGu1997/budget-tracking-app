from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from routes import expenses, income
from database import Base, engine, SessionLocal
from sqlalchemy.orm import Session
from schemas import Expense as ExpenseSchema, Income as IncomeSchema
from models import Expense, Income

# Initialize database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:52492",
    ],  # Frontend origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Root route
@app.get("/", response_model=dict)
def read_root(db: Session = Depends(get_db)):
    expenses = db.query(Expense).all()
    income = db.query(Income).all()
    return {
        "message": "Welcome to the Budget Tracking API!",
        "expenses": [ExpenseSchema.model_validate(expense) for expense in expenses],
        "income": [IncomeSchema.model_validate(inc) for inc in income],
    }


# Include routes
app.include_router(expenses.router, prefix="/expenses", tags=["Expenses"])
app.include_router(income.router, prefix="/income", tags=["Income"])
