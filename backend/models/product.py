#!/usr/bin/python3
'''contains User class'''
from models.base_model import BaseModel, Base
from sqlalchemy.orm import relationship
from sqlalchemy import Table, Column, Integer, String, Text, ForeignKey, DECIMAL


product_category_association = Table('product_category', Base.metadata,
                                     Column('product_id', Integer, ForeignKey(
                                         'products.id'), primary_key=True),
                                     Column('category_id', Integer, ForeignKey(
                                         'categories.id'), primary_key=True)
                                     )


class Product(BaseModel, Base):
    '''Defines the Product class'''
    __tablename__ = 'products'

    title = Column(String(120), nullable=False)
    new_price = Column(DECIMAL(10, 2), nullable=False)
    old_price = Column(DECIMAL(10, 2), nullable=False)
    stock = Column(Integer, nullable=False)
    sales = Column(Integer, nullable=False)
    description = Column(Text, nullable=False)
    image = Column(String(250), nullable=False)
    promo_code = Column(String(20), nullable=True)

    categories = relationship(
        'Category', secondary=product_category_association, back_populates='products')
    carts = relationship('Cart', backref='product')
    orders = relationship('Order', backref='product')
    reviews = relationship('Review', backref='product')


class Category(BaseModel, Base):
    '''Defines the Category class'''
    __tablename__ = 'categories'

    name = Column(String(50), nullable=False)
    products = relationship(
        "Product", secondary=product_category_association, back_populates="categories")
