#!/usr/bin/python3
import sqlalchemy
from models import db
from models.user import User
from models.review import Review
from models.product import Product, Category
from api.v1.utils import to_dict
from flask import Blueprint, jsonify, abort


product = Blueprint('product', __name__, url_prefix='/api/v1/views')


@product.route('/product/<int:id>')
def get_product(id):
    try:
        # retrieving the product with the passed id
        product = (
            db.session.query(Product)
            .outerjoin(Product.categories)
            .outerjoin(Review, Product.id == Review.product_id)
            .outerjoin(User, Review.user_id == User.id)
            .filter(Product.id == id)
            .first()
        )
        # checks if the product exist, otherwise abort 404
        if not product:
            flag = True
            abort(404)

        # retrieve related products
        related_products = (
            db.session.query(Product)
            .join(Product.categories)
            .filter(Category.id.in_([category.id for category in product.categories]))
            .filter(Product.id != product.id)
            .limit(3)
            .all()
        )

        product_dict = to_dict(product)  # Convert to dictionary
        product_dict['reviews'] = []
        for review in product.reviews:  # Access reviews through relationship
            review_dict = {
                'firstName': review.user.first_name,
                'lastName': review.user.last_name,
                'rating': review.rating,
                'comment': review.comment
            }
            product_dict['reviews'].append(review_dict)
        # Access categories through relationship
        product_dict['categories'] = [
            category.name for category in product.categories]
        # Access related products through relationship
        product_dict['related_products'] = []
        if related_products:
            product_dict['related_products'] = [
                to_dict(related_product) for related_product in related_products
            ]
        return jsonify(product_dict), 200
    except Exception as e:
        if isinstance(e, AttributeError):
            # Handle the case where the to_dict function is missing
            return jsonify({"error": "Internal server error (missing to_dict function)"}), 500
        elif isinstance(e, sqlalchemy.exc.SQLAlchemyError):
            # Handle database-related errors
            return jsonify({"error": "Database error"}), 500
        elif flag:
            # handle the case where the category name doesn't exist
            return jsonify({"error": "Product doesn't exist"}), 404
        else:
            # Handle other unexpected exceptions
            return jsonify({"error": "Internal server error"}), 500
