#!/usr/bin/python3
from models import db
from models.user import User
from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    jwt_required, get_jwt_identity,
    create_access_token
)

auth = Blueprint('auth', __name__, url_prefix='/api/v1/views/auth')


@auth.route('/register', methods=['POST'])
def register():
    ''' Register a new user '''
    # get the user data
    username, email, first_name, last_name, password = request.json.get('username'), request.json.get(
        'email'), request.json.get('first_name'), request.json.get('last_name'), request.json.get('password')

    # check if all fields are provided
    if not username or not email or not first_name or not last_name or not password:
        return jsonify({'error': 'All fields are required'}), 400

    # validate the email
    if not User.validate_email(email):
        return jsonify({'error': 'Invalid email'}), 400

    try:
        # check if the user already exists
        if db.session.query(User).filter_by(username=username).first():
            return jsonify({'error': 'Username already exists'}), 400
        if db.session.query(User).filter_by(email=email).first():
            return jsonify({'error': 'Email already exists'}), 400

        # create the user
        user = User(username=username, email=email,
                    first_name=first_name, last_name=last_name)
        user.generate_hash_password(password)
        user.add_new()

        # generate the access tokens
        access_token = user.generate_access_token()
        # create the response
        response = jsonify(
            {
                'message': 'User created successfully',
                'access_token': access_token,
                'data': {
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'verified': user.verified,
                }
            }
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    return response, 201


@auth.route('/login', methods=['POST'])
def login():
    ''' Login a user '''
    # get the user data
    login_identifier, password, remember_me = request.json.get(
        'login_identifier'), request.json.get('password'), request.json.get('remember_me')
    # check if all fields are provided
    if not login_identifier or not password:
        return jsonify({'error': 'All the fields are required'}), 400

    try:
        # check if it is a username or email
        if User.validate_email(login_identifier):
            user = db.session.query(User).filter_by(
                email=login_identifier).first()
        else:
            user = db.session.query(User).filter_by(
                username=login_identifier).first()
        # check if the user exists
        if not user:
            return jsonify({'error': 'Authentication Failed'}), 401
        # check if the password is correct
        if not user.verify_password(password):
            return jsonify({'error': 'Authentication Failed'}), 401
        # generate the access and refresh tokens
        access_token = user.generate_access_token()
        if remember_me:
            refresh_token = user.generate_refresh_token()
        # create the response
        response = jsonify(
            {
                'message': 'Login successful',
                'access_token': access_token,
                'refresh_token': refresh_token if remember_me else None,
                'data': {
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'verified': user.verified,
                }
            }
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    return response, 200


@auth.route('/token_refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    # Create the new access token
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user)

    # Set the access JWT and CSRF double submit protection cookies
    resp = jsonify({
        'refresh': True,
        'access_token': access_token
    })
    return resp, 200


# @auth.route('/reset_password', methods=['POST'])
# def reset_password():
#     ''' Reset a user password '''
#     return jsonify({'message': 'Reset Password'})

# @auth.route('/update_password', methods=['PUT'])
# def update_password():
#     ''' Update a user password '''
#     return jsonify({'message': 'Update Password'})

# @auth.route('/delete_account', methods=['DELETE'])
# def delete_account():
#     ''' Delete a user account '''
#     return jsonify({'message': 'Delete Account'})
