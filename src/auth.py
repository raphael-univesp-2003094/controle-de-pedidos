from flask import Blueprint, request, jsonify, Response
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import check_password_hash

from src.constants.http_status_codes import HTTP_401_UNAUTHORIZED, HTTP_200_OK
from src.database import Usuario

# Criação do Blueprint das rotas de autenticação.
auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@auth_bp.post('/login')
def login() -> (Response, int):
    """
    Efetua a autenticação do usuário, utilizando 'email' e 'senha'.
    Método da Requisição: POST.
    Variáveis Obrigatórias (JSON): 'email' e 'senha'.
    :return: (Response, int)
    """

    # Busca as variáveis obrigatórias no corpo da requisição.
    email = request.json.get('email', '')
    senha = request.json.get('senha', '')

    # Busca um usuário no banco de dados com o email informado.
    usuario = Usuario.query.filter_by(email=email).first()

    # Caso o usuário exista, inicia o processo de autenticação.
    if usuario:
        # Verifica se a senha informada corresponde à senha do usuário encontrado.
        is_pass_correct = check_password_hash(usuario.senha, senha)

        # Caso a senha corresponda, continua o processo de autenticação.
        if is_pass_correct:
            # Gera o token de acesso, contendo como identidade o id do usuário.
            access_token = create_access_token(identity=usuario.id)

            # Retorna uma resposta JSON com status 200 (OK), contendo o token de acesso e o usuário.
            return jsonify({
                'usuario': usuario.to_dict(),
                'access_token': access_token,
            }), HTTP_200_OK

    # Caso alguma etapa de autenticação não seja bem sucedida, retorna uma resposta JSON com status 401 (Não
    # Autorizado), contendo a mensagem de erro.
    return jsonify({
        'error': 'Credenciais inválidas.'
    }), HTTP_401_UNAUTHORIZED


@auth_bp.post('/me')
@jwt_required()
def me() -> (Response, int):
    """
    Retorna o usuário que está autenticado na requisição.
    Cabeçalhos (headers) Obrigatórios: Authorization (token de acesso)
    Método da Requisição: POST.
    :return: (Response, int)
    """

    # Busca a identidade contida no token de acesso (id do usuário).
    usuario_id = get_jwt_identity()

    # Busca um usuário no banco de dados com o id encontrado.
    usuario = Usuario.query.filter_by(id=usuario_id).first()

    # Retorna uma resposta JSON com status 200 (OK), contendo o usuario autenticado.
    return jsonify({
        'usuario': usuario.to_dict(),
    }), HTTP_200_OK
