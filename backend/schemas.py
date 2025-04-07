from pydantic import BaseModel, ConfigDict
from datetime import datetime


class ExpenseBase(BaseModel):
    name: str
    amount: float
    category: str


class ExpenseCreate(ExpenseBase):
    pass


class Expense(ExpenseBase):
    id: int
    date: datetime  # Include the date in the response

    model_config = ConfigDict(from_attributes=True)  # Enable ORM mode


class IncomeBase(BaseModel):
    name: str
    category: str
    amount: float


class IncomeCreate(IncomeBase):
    pass  # No id or date, as these are added in the backend


class Income(BaseModel):
    id: int
    name: str
    category: str
    amount: float
    date: datetime

    model_config = ConfigDict(from_attributes=True)  # Enable ORM mode
