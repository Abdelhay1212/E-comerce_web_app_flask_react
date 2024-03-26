#!/usr/bin/python3
'''contains Cart class'''
from models.base_model import BaseModel, Base
from sqlalchemy import Column, Integer, ForeignKey, DECIMAL


class Cart(Base, BaseModel):
    '''Defines the class Cart'''
    __tablename__ = 'carts'

    quantity = Column(Integer, nullable=False)
    subtotal = Column(DECIMAL, nullable=False)
    product_id = Column(Integer, ForeignKey('products.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
