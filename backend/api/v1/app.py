#!/usr/bin/python3
''' Flask Application '''
import os
from models import db
from flask import Flask, send_from_directory
from dotenv import load_dotenv
from api.v1.views.home import home
from api.v1.views.shop import shop
from api.v1.views.auth import auth
from api.v1.views.cart import cart
from api.v1.views.product import product
from flask_jwt_extended import JWTManager
from flask_cors import CORS

# create the flask app
app = Flask(__name__)

# load the environment variables
load_dotenv()

# set the app configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
# this will be changed to True in production
app.config['JWT_COOKIE_SECURE'] = False
app.config['JWT_COOKIE_CSRF_PROTECT'] = False
app.config['JWT_CSRF_IN_COOKIES'] = False


# jwt manager for token creation
jwt = JWTManager(app)

# enable CORS
CORS(app, resources={r"/*": {"origins": "*"}})

# register the blueprints with the app
app.register_blueprint(home)
app.register_blueprint(shop)
app.register_blueprint(product)
app.register_blueprint(cart)
app.register_blueprint(auth)


# after each request, close the session
@app.teardown_request
def close_session(exception=None):
    db.close()


@app.route('/images/<filename>')
def serve_image(filename):
    return send_from_directory('../../static/images', filename)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
