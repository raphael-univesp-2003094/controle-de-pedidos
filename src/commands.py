from click import command
from flask.cli import with_appcontext
from werkzeug.security import generate_password_hash

from src.database import db, Usuario


@command(name='init_database')
@with_appcontext
def init_database():
    """
    Inicializa o banco de dados.
    """
    db.create_all()

    # Cria a entidade do usuário administrador.
    usuario = Usuario(
        nome='Administrador',
        email='admin@admin.dev',
        senha=generate_password_hash('admin'),
        admin=True,
    )

    # Adiciona o usuário administrador à transação atual.
    db.session.add(usuario)

    # Efetua o commit da transação atual.
    db.session.commit()


