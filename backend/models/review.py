#!/usr/bin/python3
'''contains Review class'''
from models.base_model import BaseModel, Base
from sqlalchemy import Column, Integer, Text, ForeignKey


class Review(Base, BaseModel):
    '''Defines the class Order'''
    __tablename__ = 'reviews'

    rating = Column(Integer, nullable=False)
    comment = Column(Text, nullable=False)
    product_id = Column(Integer, ForeignKey('products.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
