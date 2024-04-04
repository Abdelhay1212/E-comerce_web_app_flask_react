#!/usr/bin/python3
'''Class DBStorage'''

import os
from dotenv import load_dotenv
from models.base_model import Base
from models.cart import Cart
from models.order import Order
from models.product import Product
from models.review import Review
from models.user import User
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from typing import Union, List


TYPE = Union[User, Product, Review, Order, Cart]


class DB:
    '''Interacts with the database'''

    def __init__(self) -> None:
        if os.environ.get('MODE') is None:
            db_uri = 'sqlite:///mydb.db'
        else:
            load_dotenv()
            user = os.environ.get('DB_USER')
            passwd = os.environ.get('DB_PASSWORD')
            host = os.environ.get('DB_HOST')
            name = os.environ.get('DB_NAME')
            db_uri = 'mysql+pymysql://{}:{}@{}/{}'.format(
                user, passwd, host, name)

        self.__engine = create_engine(db_uri)

    def reload(self) -> None:
        '''Creates and binds a new session to the engine after creating all tables'''
        Base.metadata.create_all(self.__engine)
        session_factory = sessionmaker(
            bind=self.__engine, expire_on_commit=False)
        self.__session = scoped_session(session_factory)

    @property
    def session(self):
        '''returns the session'''
        if self.__session is None:
            raise ConnectionError('The session is not connected')
        return self.__session

    def new(self, obj: TYPE) -> None:
        '''Adds a new entity'''
        self.session.add(obj)

    def update(self, obj: TYPE, **kwargs) -> None:
        '''Updates an entity'''
        for key, value in kwargs.items():
            setattr(obj, key, value)

    def delete(self, obj: TYPE) -> None:
        '''Deletes an entity'''
        self.session.delete(obj)

    def save(self) -> None:
        '''Commits changes to the database'''
        self.session.commit()

    def close(self) -> None:
        '''Closes the session'''
        self.session.remove()
