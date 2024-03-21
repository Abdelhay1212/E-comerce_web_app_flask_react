#!/usr/bin/python3
'''utils'''
from decimal import Decimal
from datetime import datetime


def to_dict(model_instance):
    output = {}
    for key, value in model_instance.__dict__.items():
        if not key.startswith('_sa_'):  # Exclude SQLAlchemy internal state
            if isinstance(value, Decimal):
                # Convert Decimal to a string to maintain precision
                output[key] = str(value)
            elif isinstance(value, datetime):
                # Format datetime as a string, or use isoformat()
                output[key] = value.isoformat()
            else:
                output[key] = value
    return output
