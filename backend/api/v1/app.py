#!/usr/bin/python3
''' Flask Application '''
import os
from dotenv import load_dotenv
from models import db
from flask import Flask
from api.v1.views.home import home
from api.v1.views.shop import shop


app = Flask(__name__)

load_dotenv()
SECRET_KEY = os.environ.get('SECRET_KEY')

app.register_blueprint(home)
app.register_blueprint(shop)


@app.teardown_request
def close_session(exception=None):
    db.close()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
