from flask import Blueprint, request, jsonify, Response
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash

from src.constants.http_status_codes import (HTTP_409_CONFLICT, HTTP_201_CREATED, HTTP_200_OK, HTTP_404_NOT_FOUND,
                                             HTTP_204_NO_CONTENT, HTTP_403_FORBIDDEN)
from src.database import Usuario, db

# Criação do Blueprint das rotas de gerenciamento de usuários.
usuarios_bp = Blueprint('usuarios', __name__, url_prefix='/api/usuarios')


@usuarios_bp.post('')
@jwt_required()
def create() -> (Response, int):
    """
    Cria um novo usuário.
    Método da Requisição: POST.
    Variáveis Obrigatórias (JSON): 'nome', 'email' e 'senha'.
    Variáveis Opcionais (JSON): 'admin'.
    :return: (Response, int)
    """

    # Busca o requisitante e verifica se ele é um administrador. Caso não seja, retorna uma resposta JSON com status
    # 403 (Proibido) contendo a mensagem de erro.
    sender_id = get_jwt_identity()
    sender = Usuario.query.get(sender_id)
    if not sender or not sender.admin:
        return jsonify({
            'error': 'Você não possui permissão.',
        }), HTTP_403_FORBIDDEN

    # Busca as variáveis obrigatórias e opcionais no corpo da requisição.
    nome = request.json.get('nome', None)
    email = request.json.get('email', None)
    senha = request.json.get('senha', None)
    admin = request.json.get('admin', False)

    # Busca um usuário no banco de dados com o email informado e, caso ele já exista, retorna uma resposta JSON com
    # status 409 (Conflito) contendo a mensagem do erro.
    if Usuario.query.filter_by(email=email).first():
        return jsonify({
            'error': 'Usuario já cadastrado.',
        }), HTTP_409_CONFLICT

    # Cria a entidade do novo usuário.
    usuario = Usuario(
        nome=nome,
        email=email,
        senha=generate_password_hash(senha),
        admin=admin,
    )

    # Adiciona o novo usuário à transação atual.
    db.session.add(usuario)

    # Efetua o commit da transação atual.
    db.session.commit()

    # Caso a criação seja bem sucedida, retorna uma resposta JSON com status 201 (Criado), contendo o novo usuário.
    return jsonify({
        'usuario': usuario.to_dict(),
    }), HTTP_201_CREATED


@usuarios_bp.get('')
@jwt_required()
def read_all() -> (Response, int):
    """
    Busca todos os usuários contidos no banco de dados. É possível filtrar os usuários informando os atributos e
    valores.
    Método da Requisição: GET.
    Variáveis Opcionais (Params): 'id', 'nome', 'email', 'admin'.
    :return: (Response, int)
    """

    # Busca o requisitante e verifica se ele é um administrador. Caso não seja, retorna uma resposta JSON com status
    # 403 (Proibido) contendo a mensagem de erro.
    sender_id = get_jwt_identity()
    sender = Usuario.query.get(sender_id)
    if not sender or not sender.admin:
        return jsonify({
            'error': 'Você não possui permissão.',
        }), HTTP_403_FORBIDDEN

    # Busca as variáveis opcionais nos parâmetros da requisição, e a transforma em um dicionário.
    query = request.args.to_dict()

    # Remove o item do dicionário cuja chave seja 'senha', com o intuito de não permitir que os usuários sejam buscados
    # pela senha.
    query.pop('senha', None)

    # Busca todos os usuários contidos no banco de dados, utilizando como filtro os parâmetros informados (dicionário
    # 'query').
    usuarios = Usuario.query.filter_by(**query).all()

    # Cria uma lista que conterá os usuários encontrados, serializados.
    data = []

    # Faz um loop nos usuários encontrados no banco de dados, e para cada um deles, os insere serializados na lista
    # criada anteriormente.
    for usuario in usuarios:
        data.append(usuario.to_dict())

    # Caso a busca seja bem sucedida, retorna uma resposta JSON com status 200 (OK), contendo os usuários encontrados e
    # os filtros utilizados na busca.
    return jsonify({
        'query': query,
        'usuarios': data,
    }), HTTP_200_OK


@usuarios_bp.get('/<int:id>')
@jwt_required()
def read_one(id: int) -> (Response, int):
    """
    Busca um usuário existente no banco de dados, com o respectivo 'id' informado.
    Método da Requisição: GET.
    Variáveis Obrigatórias (URI): 'id'.
    :param id: int
    :return: (Response, int)
    """

    # Busca o requisitante e verifica se ele é um administrador ou se ele está requisitando seu próprio id. Caso não
    # seja, retorna uma resposta JSON com status 403 (Proibido) contendo a mensagem de erro.
    sender_id = get_jwt_identity()
    sender = Usuario.query.get(sender_id)
    if (not sender or not sender.admin) and (sender_id != id):
        return jsonify({
            'error': 'Você não possui permissão.',
        }), HTTP_403_FORBIDDEN

    # Busca um usuário no banco de dados com o id informado na URI.
    usuario = Usuario.query.get(id)

    # Caso o usuário não exista, retorna uma resposta JSON com status 404 (Não Encontrado), contendo a mensagem de erro.
    if not usuario:
        return jsonify({
            'error': 'Usuario não cadastrado.',
        }), HTTP_404_NOT_FOUND

    # Caso o usuário exista, retorna uma resposta JSON com status 200 (OK), contendo o usuário encontrado.
    return jsonify({
        'usuario': usuario.to_dict(),
    }), HTTP_200_OK


@usuarios_bp.put('/<int:id>')
@usuarios_bp.patch('/<int:id>')
@jwt_required()
def update(id: int) -> (Response, int):
    """
    Atualiza um usuário existente no banco de dados, cujo 'id' é o informado na URI.
    Método da Requisição: PUT, PATCH.
    Variáveis Obrigatórias (URI): 'id'.
    Variáveis Opcionais (Params): 'nome', 'email', 'senha', 'admin'.
    :param id: int
    :return: (Response, int)
    """

    # Busca o requisitante e verifica se ele é um administrador ou se ele está requisitando seu próprio id. Caso não
    # seja, retorna uma resposta JSON com status 403 (Proibido) contendo a mensagem de erro.
    sender_id = get_jwt_identity()
    sender = Usuario.query.get(sender_id)
    if (not sender or not sender.admin) and (sender_id != id):
        return jsonify({
            'error': 'Você não possui permissão.',
        }), HTTP_403_FORBIDDEN

    # Busca um usuário no banco de dados com o id informado na URI.
    usuario = Usuario.query.get(id)

    # Caso o usuário não exista, retorna uma resposta JSON com status 404 (Não Encontrado), contendo a mensagem de erro.
    if not usuario:
        return jsonify({
            'error': 'Usuario não cadastrado.',
        }), HTTP_404_NOT_FOUND

    # Atualiza os atributos da entidade na transação atual.
    usuario.nome = request.json.get('nome', usuario.nome)
    usuario.email = request.json.get('email', usuario.email)
    usuario.senha = generate_password_hash(request.json.get('senha', usuario.senha))
    usuario.admin = request.json.get('admin', usuario.admin)

    # Efetua o commit da transação atual.
    db.session.commit()

    # Caso a atualização seja bem sucedida, retorna uma resposta JSON com status 200 (OK), contendo o usuário
    # encontrado.
    return jsonify({
        'usuario': usuario.to_dict(),
    }), HTTP_200_OK


@usuarios_bp.delete('/<int:id>')
@jwt_required()
def delete(id: int) -> (Response, int):
    """
    Exclui um usuário existente no banco de dados, cujo 'id' é o informado na URI.
    Método da Requisição: DELETE.
    Variáveis Obrigatórias (URI): 'id'.
    :param id: int
    :return: (Response, int)
    """

    # Busca o requisitante e verifica se ele é um administrador ou se ele está requisitando seu próprio id. Caso não
    # seja, retorna uma resposta JSON com status 403 (Proibido) contendo a mensagem de erro.
    sender_id = get_jwt_identity()
    sender = Usuario.query.get(sender_id)
    if (not sender or not sender.admin) and (sender_id != id):
        return jsonify({
            'error': 'Você não possui permissão.',
        }), HTTP_403_FORBIDDEN

    # Busca um usuário no banco de dados com o id informado na URI.
    usuario = Usuario.query.get(id)

    # Caso o usuário não exista, retorna uma resposta JSON com status 404 (Não Encontrado), contendo a mensagem de erro.
    if not usuario:
        return jsonify({
            'error': 'Usuario não cadastrado.',
        }), HTTP_404_NOT_FOUND

    # Exclui o usuário na transação atual.
    db.session.delete(usuario)

    # Efetua o commit da transação atual.
    db.session.commit()

    # Caso a exclusão seja bem sucedida, retorna uma resposta JSON com status 204 (Sem Conteúdo).
    return jsonify({}), HTTP_204_NO_CONTENT
