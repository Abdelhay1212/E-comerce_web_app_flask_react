#!/usr/bin/python3
'''contains Order class'''
from models.base_model import BaseModel, Base
from sqlalchemy import Column, Integer, Enum, ForeignKey


class Order(Base, BaseModel):
    '''Defines the class Order'''
    __tablename__ = 'orders'

    quantity = Column(Integer, nullable=False)
    status = Column(Enum('Processing', 'Shipped', 'Delivered'),
                    nullable=False, default='Processing')
    product_id = Column(Integer, ForeignKey('products.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
