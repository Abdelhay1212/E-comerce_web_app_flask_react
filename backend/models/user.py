#!/usr/bin/python3
'''contains User class'''
from sqlalchemy.orm import relationship
from models.base_model import BaseModel, Base
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey


class User(BaseModel, Base):
    '''Defines the class User'''
    __tablename__ = 'users'

    username = Column(String(60), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    first_name = Column(String(60), nullable=False)
    last_name = Column(String(60), nullable=False)
    password = Column(String(100), nullable=False)
    salt = Column(String(60), nullable=False)
    admin = Column(Boolean, nullable=False, default=False)
    address_id = Column(Integer, ForeignKey('addresses.id'), nullable=False)

    carts = relationship('Cart', backref='user')
    orders = relationship('Order', backref='user')
    reviews = relationship('Review', backref='user')


class Address(BaseModel, Base):
    '''Defines the class Address'''
    __tablename__ = 'addresses'

    country = Column(String(60), nullable=False)
    state = Column(String(50), nullable=False)
    city = Column(String(50), nullable=False)
    post_code = Column(Integer, nullable=False)
    street = Column(String(100), nullable=False)
    house = Column(Integer, nullable=False)
    phone = Column(Integer, nullable=False)

    users = relationship('User', backref='address')
