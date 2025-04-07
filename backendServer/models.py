from sqlalchemy import Column, Integer, String, Float, DateTime
from database import Base
from datetime import datetime, timezone


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    category = Column(String, nullable=False)
    date = Column(DateTime, default=datetime.now(timezone.utc), nullable=False)


class Income(Base):
    __tablename__ = "income"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    category = Column(String, nullable=False)
    date = Column(DateTime, default=datetime.now(timezone.utc), nullable=False)
