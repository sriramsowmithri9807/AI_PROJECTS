from flask import Flask
from dotenv import load_dotenv

load_dotenv()

def create_app():
    app = flask.Flask(__name__)

    from app.config import Config
    app.config.from_object(Config)

    from app.routes import main_bp
    app.register_blueprint(main_bp)

    return app
