#!/usr/bin/python3
''' Flask Application '''
import os
from models import db
from flask import Flask
from dotenv import load_dotenv
from api.v1.views.home import home
from api.v1.views.shop import shop
from api.v1.views.auth import auth
from api.v1.views.product import product
from flask_jwt_extended import JWTManager

# create the flask app
app = Flask(__name__)

# load the environment variables
load_dotenv()

# set the app configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')

# jwt manager for token creation
jwt = JWTManager(app)

# register the blueprints with the app
app.register_blueprint(home)
app.register_blueprint(shop)
app.register_blueprint(product)
app.register_blueprint(auth)


# after request, close the session
@app.teardown_request
def close_session(exception=None):
    db.close()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
