#!/usr/bin/env python3
"""
Task 7. Infer appropriate time zone
"""

from flask import Flask, render_template, request, g
from flask_babel import Babel, format_datetime
from pytz import timezone
import pytz.exceptions
from datetime import datetime

app = Flask(__name__)
babel = Babel(app)

users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


class Config:
    """Config

    This class will contain the languages that will be
    present in the website.
    """
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


def get_locale():
    """get_locale

    This method determines the best match with our supported languages
    that we offer in Config class.
    """
    local = request.args.get('locale', None)
    if local and local in app.config['LANGUAGES']:
        return local
    if g.user:
        local = g.user.get('locale')
        if local in app.config['LANGUAGES']:
            return local
    local = request.args.get('locale', None)
    if local and local in app.config['LANGUAGES']:
        return local
    return request.accept_languages.best_match(app.config['LANGUAGES'])


def get_user():
    """get_user

    This function returns the user logged in the website.
    """
    user_id = request.args.get('login_as', None)
    return users.get(int(user_id)) if user_id else None


@app.before_request
def before_request():
    """before_request

    Sets the user as a global before executing the other functions.
    """
    g.user = get_user()
    g.current_time = format_datetime(datetime.now())


def get_timezone():
    """get_timezone

    Gets the timezone
    """
    tzone = request.args.get('timezone', None)
    if tzone:
        try:
            return timezone(tzone).zone
        except pytz.exceptions.UnknownTimeZoneError:
            return 'UTC'
    if g.user:
        try:
            tzone = g.user.get('timezone')
            return timezone(tzone).zone
        except pytz.exceptions.UnknownTimeZoneError:
            return 'UTC'
    dflt = app.config['BABEL_DEFAULT_TIMEZONE']
    return request.accept_languages.best_match(dflt)


@app.route('/')
def index():
    """index

    This method returns a route to 0-index.html

    Return:
        (str): The route of the GET method.
    """
    return render_template('index.html')


if __name__ == '__main__':
    babel.init_app(app, locale_selector=get_locale, timezone_selector=get_timezone)
    app.config.from_object('app.Config')
    app.run(host='0.0.0.0', port='5000')