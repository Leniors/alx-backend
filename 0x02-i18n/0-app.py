#!/usr/bin/env python3
"""
Task 0. Basic Flask app
"""

from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    """index

    This method returns a route to 0-index.html

    Return:
        (str): The route of the GET method.
    """
    return render_template('0-index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5000')