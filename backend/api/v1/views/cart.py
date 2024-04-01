#!/usr/bin/python3
'''contains Cart class'''
from models import db
from models.user import User
from models.cart import Cart
from models.product import Product
from flask import Blueprint, jsonify, request, redirect
from flask_jwt_extended import jwt_required, get_jwt_identity


cart = Blueprint('cart', __name__, url_prefix='/api/v1/views/cart')


@cart.route('/get', methods=['GET'])
@jwt_required()
def get_cart():
    '''Gets the cart items'''
    # get the user_id from the jwt token
    user_id = get_jwt_identity()

    try:
        # get the cart items with user and product information
        cart_items = (
            db.session.query(Cart)
            .join(User, Cart.user_id == User.id)
            .join(Product, Cart.product_id == Product.id)
            .filter(Cart.user_id == user_id)
            .all()
        )

        if not cart_items:
            return jsonify({'cart': []}), 200

        items = []
        for item in cart_items:
            items.append({
                'id': item.id,
                'user_id': item.user_id,
                'product_id': item.product_id,
                'quantity': item.quantity,
                'subtotal': item.subtotal,
                'product': {
                    'id': item.product.id,
                    'title': item.product.title,
                    'new_price': item.product.new_price,
                    'old_price': item.product.old_price,
                    'description': item.product.description,
                    'image': item.product.image,
                }
            })
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    return jsonify({'cart': items}), 200


@cart.route('/add', methods=['POST'])
@jwt_required()
def add_to_cart():
    '''Adds an item to the cart'''
    # get the json data
    data = request.get_json()

    # check if the data is empty
    if 'product_id' not in data:
        return jsonify({'error': 'product_id is required'}), 400
    if 'quantity' not in data:
        return jsonify({'error': 'quantity is required'}), 400

    # get the data if it is not empty
    product_id = data['product_id']
    quantity = data['quantity']

    # get the user_id from the jwt token
    user_id = get_jwt_identity()

    try:
        # check if the product already exists in the cart
        cart = db.session.query(Cart).filter_by(
            user_id=user_id, product_id=product_id).first()
        if cart:
            return redirect('/api/v1/views/cart/update?cart_id={}&quantity={}'.format(cart.id, quantity))

        if quantity < 1:
            return jsonify({'error': 'Quantity must be greater than 0'}), 400

        # check if the user_id exists
        user = db.session.query(User).filter_by(id=user_id).first()
        if not user:
            return jsonify({'error': 'User not found'}), 404

        # # check if the product_id exists
        product = db.session.query(Product).filter_by(id=product_id).first()
        if not product:
            return jsonify({'error': 'Product not found'}), 404

        # add new item to the cart
        new_cart = Cart(user_id=user_id, product_id=product_id,
                        quantity=quantity, subtotal=product.new_price * quantity)
        new_cart.add_new()
        return jsonify({'message': 'Item added to cart'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@cart.route('/update', methods=['GET', 'PUT'])
@jwt_required()
def update_cart():
    '''Updates the cart item quantity'''
    # get the json data
    if request.method == 'PUT':
        data = request.get_json()
        cart_id = data['cart_id']
        quantity = data['quantity']
    else:
        cart_id = request.args.get('cart_id')
        quantity = request.args.get('quantity')

    # check if the data is empty
    if not cart_id:
        return jsonify({'error': 'cart_id is required'}), 400
    if not quantity:
        return jsonify({'error': 'quantity is required'}), 400

    # get the user_id from the jwt token
    user_id = get_jwt_identity()

    try:
        # check if the cart_id exists
        cart = db.session.query(Cart).filter_by(id=cart_id).first()
        if not cart:
            return jsonify({'error': 'Cart item not found'}), 404

        # check if the user_id is the owner of the cart item
        if cart.user_id != user_id:
            return jsonify({'error': 'You do not have permessions to update this Item'}), 403

        # update the cart item
        quantity = int(quantity)
        cart.quantity += quantity
        cart.subtotal = cart.product.new_price * cart.quantity
        # if the quantity is less than 1, delete the cart item
        if cart.quantity < 1:
            cart.delete()
            return jsonify({'message': 'Cart item deleted'}), 200
        else:
            cart.update()
        return jsonify({'message': 'Cart item updated'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@cart.route('/delete', methods=['DELETE'])
@jwt_required()
def delete_cart():
    '''Deletes the cart item'''
    # get the json data
    data = request.get_json()

    # check if the data is empty
    if 'cart_id' not in data:
        return jsonify({'error': 'cart_id is required'}), 400

    # get the data if it is not empty
    cart_id = data['cart_id']

    # get the user_id from the jwt token
    user_id = get_jwt_identity()

    try:
        # check if the cart_id exists
        cart = db.session.query(Cart).filter_by(id=cart_id).first()
        if not cart:
            return jsonify({'error': 'Cart item not found'}), 404

        # check if the user_id is the owner of the cart item
        if cart.user_id != user_id:
            return jsonify({'error': 'You do not have permessions to delete this Item'}), 403

        # delete the cart item
        cart.delete()
        return jsonify({'message': 'Cart item deleted'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
