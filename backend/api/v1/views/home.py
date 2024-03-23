#!/usr/bin/python3
import sqlalchemy
from models import db
from api.v1.utils import to_dict
from flask import Blueprint, jsonify
from models.product import Product


home = Blueprint('home', __name__, url_prefix='/api/v1/views')


@home.route('/home')
def home_route():
    try:
        products = (
            db.session.query(Product)
            .join(Product.categories)
            .group_by(Product.id)
            .order_by(Product.created_at)
            .limit(4)
            .all()
        )
        response = []
        for product in products:
            product_dict = to_dict(product)
            product_dict['categories'] = [
                category.name for category in product.categories]
            response.append(product_dict)
        return jsonify(response), 200
    except Exception as e:
        if isinstance(e, AttributeError):
            # Handle the case where the to_dict function is missing
            return jsonify({"error": "Internal server error (missing to_dict function)"}), 500
        elif isinstance(e, sqlalchemy.exc.SQLAlchemyError):
            # Handle database-related errors
            return jsonify({"error": "Database error"}), 500
        else:
            # Handle other unexpected exceptions
            return jsonify({"error": "Internal server error"}), 500
