#!/usr/bin/python3
import sqlalchemy
from models import db
from api.v1.utils import to_dict
from flask import Blueprint, jsonify, abort
from models.product import Product, Category


shop = Blueprint('shop', __name__, url_prefix='/api/v1/views')


@shop.route('/shop/<category_name>')
def shop_route(category_name):
    try:
        # checking if the category name exist if it's not abort 400
        category_name = category_name.replace('_', ' ')
        category = (
            db.session.query(Category)
            .filter_by(name=category_name)
            .first()
        )
        if not category:
            flag = True
            abort(404)

        # retrieve all the products with their categories
        products = (
            db.session.query(Product)
            .join(Product.categories)
            .group_by(Product.id)
            .all()
        )
        response = []
        # checkng for the products with category name passed in URL
        for product in products:
            product_dict = to_dict(product)
            product_dict['categories'] = [
                category.name for category in product.categories]
            if category_name in product_dict['categories']:
                response.append(product_dict)
        return jsonify(response), 200
    except Exception as e:
        if isinstance(e, AttributeError):
            # Handle the case where the to_dict function is missing
            return jsonify({"error": "Internal server error (missing to_dict function)"}), 500
        elif isinstance(e, sqlalchemy.exc.SQLAlchemyError):
            # Handle database-related errors
            return jsonify({"error": "Database error"}), 500
        elif flag:
            # handle the case where the category name doesn't exist
            return jsonify({"error": "Category Not Found"}), 404
        else:
            # Handle other unexpected exceptions
            return jsonify({"error": "Internal server error"}), 500
