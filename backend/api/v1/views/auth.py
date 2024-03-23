#!/usr/bin/python3
from models import db
from models.user import User
from flask import Blueprint, request, jsonify

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

        # generate the access and refresh tokens
        access_token = user.generate_access_token()
        refresh_token = user.generate_refresh_token()
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    return jsonify(
        {
            'message': 'User created successfully',
            'data': {
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'verified': user.verified,
                'tokens': {
                    'access_token': access_token,
                    'refresh_token': refresh_token
                }
            }
        }
    ), 201


@auth.route('/login', methods=['POST'])
def login():
    ''' Login a user '''
    return jsonify({'message': 'Login'})


@auth.route('/logout', methods=['DELETE'])
def logout():
    ''' Logout a user '''
    return jsonify({'message': 'Logout'})


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
