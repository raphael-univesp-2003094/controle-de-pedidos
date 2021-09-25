import os
from datetime import timedelta

from flask import Flask
from flask_jwt_extended import JWTManager

from src.auth import auth_bp
from src.database import db
from src.pedidos import pedidos_bp
from src.spa import spa_bp
from src.usuarios import usuarios_bp


def create_app() -> Flask:
    """
    Cria e inicializa a aplicação Flask.
    :return: Flask
    """

    # Cria a instância da aplicação Flask.
    app = Flask(__name__, instance_relative_config=True)

    # Configura a aplicação Flask.
    app.config.from_mapping(
        SECRET_KEY=os.environ.get('SECRET_KEY'),
        SQLALCHEMY_DATABASE_URI=os.environ.get('DATABASE_URL'),
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
        JWT_SECRET_KEY=os.environ.get('JWT_SECRET_KEY'),
        JWT_ERROR_MESSAGE_KEY='error',
        JWT_ACCESS_TOKEN_EXPIRES=timedelta(hours=24),
    )

    # Inicializa o gerenciador de banco de dados (SQLAlchemy).
    db.app = app
    db.init_app(app)

    # Inicializa o gerenciador de autenticação de usuários (Flask-JWT-Extended).
    JWTManager(app)

    # Registra os Blueprints das rotas da aplicação.
    app.register_blueprint(auth_bp)
    app.register_blueprint(pedidos_bp)
    app.register_blueprint(usuarios_bp)
    app.register_blueprint(spa_bp)

    # Retorna a aplicação Flask.
    return app
