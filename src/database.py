from datetime import datetime

from flask_sqlalchemy import SQLAlchemy

# Cria uma instância do gerenciador do banco de dados.
db = SQLAlchemy()


class Usuario(db.Model):
    """ Entidade Usuário """

    # Nome da tabela no banco de dados.
    __tablename__ = 'usuarios'

    # Colunas do banco de dados / Atributos da entidade.
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    senha = db.Column(db.String(255), nullable=False)
    admin = db.Column(db.Boolean, default=False)
    criado_em = db.Column(db.DateTime, default=datetime.now())
    atualizado_em = db.Column(db.DateTime, onupdate=datetime.now())

    def to_dict(self) -> dict:
        """
        Retorna um dicionário contendo a entidade serializada.
        :return: dict
        """
        return dict(
            id=self.id,
            nome=self.nome,
            email=self.email,
            admin=self.admin,
        )


class Pedido(db.Model):
    """ Entidade Pedido """

    # Nome da tabela no banco de dados.
    __tablename__ = 'pedidos'

    # Colunas do banco de dados / Atributos da entidade.
    id = db.Column(db.Integer, primary_key=True)
    numero = db.Column(db.Integer, nullable=False)
    tipo = db.Column(db.Enum('SE', 'RM'), nullable=False)
    data_chegada = db.Column(db.Date, nullable=False)
    secretaria_solicitante = db.Column(db.String(255), nullable=False)
    projeto = db.Column(db.String(255), nullable=False)
    descricao = db.Column(db.Text, nullable=False)
    data_envio_financeiro = db.Column(db.Date, nullable=True)
    data_retorno_financeiro = db.Column(db.Date, nullable=True)
    situacao_autorizacao = db.Column(db.String(255), nullable=True)
    observacoes = db.Column(db.Text, nullable=True)
    criado_em = db.Column(db.DateTime, default=datetime.now())
    atualizado_em = db.Column(db.DateTime, onupdate=datetime.now())

    def to_dict(self) -> dict:
        """
        Retorna um dicionário contendo a entidade serializada.
        :return: dict
        """
        return dict(
            id=self.id,
            numero=self.numero,
            tipo=self.tipo,
            data_chegada=self.data_chegada,
            secretaria_solicitante=self.secretaria_solicitante,
            projeto=self.projeto,
            descricao=self.descricao,
            data_envio_financeiro=self.data_envio_financeiro,
            data_retorno_financeiro=self.data_retorno_financeiro,
            situacao_autorizacao=self.situacao_autorizacao,
            observacoes=self.observacoes,
        )
