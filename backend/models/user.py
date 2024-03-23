#!/usr/bin/python3
'''contains User class and Address'''
import re
import secrets
from sqlalchemy.orm import relationship
from models.base_model import BaseModel, Base
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from flask_jwt_extended import create_access_token, create_refresh_token
from werkzeug.security import generate_password_hash, check_password_hash


class User(BaseModel, Base):
    '''Defines the class User'''
    __tablename__ = 'users'

    username = Column(String(60), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    first_name = Column(String(60), nullable=False)
    last_name = Column(String(60), nullable=False)
    password = Column(String(250), nullable=False)
    verified = Column(Boolean, nullable=False, default=False)
    admin = Column(Boolean, nullable=False, default=False)
    address_id = Column(Integer, ForeignKey('addresses.id'))

    carts = relationship('Cart', backref='user')
    orders = relationship('Order', backref='user')
    reviews = relationship('Review', backref='user')

    def generate_hash_password(self, password):
        '''Generates a hash password'''
        if password:
            salt = secrets.token_hex(16)
            self.password = generate_password_hash(password + salt)

    def verify_password(self, password):
        '''Verifies the password'''
        return check_password_hash(self.password, password)

    def generate_access_token(self):
        '''Generates an access token'''
        return create_access_token(identity=self.id)

    def generate_refresh_token(self):
        '''Generates a refresh token'''
        return create_refresh_token(identity=self.id)

    def validate_email(email):
        pattern = r"^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$"
        return re.match(pattern, email) is not None


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
