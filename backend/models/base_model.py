#!/usr/bin/python3
'''contains BaseModal class'''
import models
from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, DateTime
from sqlalchemy.exc import InvalidRequestError


Base = declarative_base()


class BaseModel:
    '''Defines the BaseModel class'''

    __abstract__ = True

    id = Column(Integer, primary_key=True, autoincrement=True)
    created_at = Column(DateTime, nullable=False, default=datetime.now())
    updated_at = Column(DateTime, nullable=False, default=datetime.now(),
                        onupdate=datetime.now())

    def add_new(self) -> None:
        '''Adds new record to a table'''
        try:
            models.db.new(self)
            models.db.save()
        except Exception as e:
            raise InvalidRequestError(f'Failed to save to database: {e}')

    def update(self) -> None:
        '''Updates existing record'''
        try:
            models.db.save()
        except Exception as e:
            raise InvalidRequestError(f'Failed to update in database: {e}')

    def delete(self) -> None:
        '''Deletes a record if it exists'''
        try:
            models.db.delete(self)
            models.db.save()
        except Exception as e:
            raise InvalidRequestError(f'Failed to delete from database: {e}')
