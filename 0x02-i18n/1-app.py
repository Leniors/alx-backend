#!/usr/bin/env python3
"""
Task 1. Basic Babel setup
"""

from flask import Flask, render_template
from flask_babel import Babel

app = Flask(__name__)
babel = Babel(app)


@app.route('/')
def index():
    """index

    This method returns a route to 0-index.html

    Return:
        (str): The route of the GET method.
    """
    return render_template('1-index.html')


class Config:
    """Config

    This class will contain the languages that will be
    present in the website.
    """
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


if __name__ == '__main__':
    app.config.from_object('1-app.Config')
    app.run(host='0.0.0.0', port='5000')