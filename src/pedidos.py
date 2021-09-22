from datetime import datetime

from flask import Blueprint, request, jsonify, Response
from flask_jwt_extended import jwt_required

from src.constants.http_status_codes import (HTTP_409_CONFLICT, HTTP_201_CREATED, HTTP_200_OK, HTTP_404_NOT_FOUND,
                                             HTTP_204_NO_CONTENT)
from src.database import Pedido, db

# Criação do Blueprint das rotas de gerenciamento de pedidos.
pedidos_bp = Blueprint('pedidos', __name__, url_prefix='/api/pedidos')


@pedidos_bp.post('')
@jwt_required()
def create() -> (Response, int):
    """
    Cria um novo pedido.
    Método da Requisição: POST.
    Variáveis Obrigatórias (JSON): 'numero', 'tipo', 'data_chegada', 'secretaria_solicitante', 'projeto' e 'descricao'.
    Variáveis Opcionais (JSON): 'data_envio_financeiro', 'data_retorno_financeiro', 'situacao_autorizacao' e
    'observacoes'.
    :return: (Response, int)
    """

    # Busca as variáveis obrigatórias e opcionais no corpo da requisição.
    numero = request.json.get('numero', None)
    tipo = request.json.get('tipo', None)
    data_chegada = request.json.get('data_chegada', None)
    secretaria_solicitante = request.json.get('secretaria_solicitante', None)
    projeto = request.json.get('projeto', None)
    descricao = request.json.get('descricao', None)
    data_envio_financeiro = request.json.get('data_envio_financeiro', None)
    data_retorno_financeiro = request.json.get('data_retorno_financeiro', None)
    situacao_autorizacao = request.json.get('situacao_autorizacao', None)
    observacoes = request.json.get('observacoes', None)

    # Busca um pedido no banco de dados com o numero e tipo informado e, caso ele já exista, retorna uma resposta JSON
    # com status 409 (Conflito) contendo a mensagem do erro.
    if Pedido.query.filter_by(numero=numero, tipo=tipo).first():
        return jsonify({
            'error': 'Pedido já cadastrado.',
        }), HTTP_409_CONFLICT

    # Cria a entidade do novo pedido.
    pedido = Pedido(
        numero=numero,
        tipo=tipo,
        data_chegada=datetime.strptime(data_chegada, '%d/%m/%Y').date(),
        secretaria_solicitante=secretaria_solicitante,
        projeto=projeto,
        descricao=descricao,
        data_envio_financeiro=datetime.strptime(
            data_envio_financeiro, '%d/%m/%Y').date() if data_envio_financeiro else None,
        data_retorno_financeiro=datetime.strptime(
            data_retorno_financeiro, '%d/%m/%Y').date() if data_retorno_financeiro else None,
        situacao_autorizacao=situacao_autorizacao,
        observacoes=observacoes,
    )

    # Adiciona o novo pedido à transação atual.
    db.session.add(pedido)

    # Efetua o commit da transação atual.
    db.session.commit()

    # Caso a criação seja bem sucedida, retorna uma resposta JSON com status 201 (Criado), contendo o novo pedido.
    return jsonify({
        'pedido': pedido.to_dict(),
    }), HTTP_201_CREATED


@pedidos_bp.get('')
@jwt_required()
def read_all() -> (Response, int):
    """
    Busca todos os pedidos contidos no banco de dados. É possível filtrar os pedidos informando os atributos e
    valores.
    Método da Requisição: GET.
    Variáveis Opcionais (Params): 'id', 'numero', 'tipo', 'data_chegada', 'secretaria_solicitante', 'projeto',
    'descricao', 'data_envio_financeiro', 'data_retorno_financeiro', 'situacao_autorizacao' e 'observacoes'.
    :return: (Response, int)
    """

    # Busca as variáveis opcionais nos parâmetros da requisição, e a transforma em um dicionário.
    query: dict = request.args.to_dict()

    # Caso tenha sido informado o parâmetro data_chegada, o altera no dicionário, convertendo para o formato de data.
    if query.get('data_chegada', None) is not None:
        query['data_chegada'] = datetime.strptime(query['data_chegada'], '%d/%m/%Y').date()

    # Caso tenha sido informado o parâmetro data_envio_financeiro, o altera no dicionário, convertendo para o formato de
    # data.
    if query.get('data_envio_financeiro', None) is not None:
        query['data_envio_financeiro'] = datetime.strptime(query['data_envio_financeiro'], '%d/%m/%Y').date()

    # Caso tenha sido informado o parâmetro data_retorno_financeiro, o altera no dicionário, convertendo para o formato
    # de data.
    if query.get('data_retorno_financeiro', None) is not None:
        query['data_retorno_financeiro'] = datetime.strptime(query['data_retorno_financeiro'], '%d/%m/%Y').date()

    # Busca todos os pedidos contidos no banco de dados, utilizando como filtro os parâmetros informados (dicionário
    # 'query').
    pedidos = Pedido.query.filter_by(**query).all()

    # Cria uma lista que conterá os pedidos encontrados, serializados.
    data = []

    # Faz um loop nos pedidos encontrados no banco de dados, e para cada um deles, os insere serializados na lista
    # criada anteriormente.
    for pedido in pedidos:
        data.append(pedido.to_dict())

    # Caso a busca seja bem sucedida, retorna uma resposta JSON com status 200 (OK), contendo os pedidos encontrados e
    # os filtros utilizados na busca.
    return jsonify({
        'query': query,
        'pedidos': data,
    }), HTTP_200_OK


@pedidos_bp.get('/<string:tipo>/<int:numero>')
@jwt_required()
def read_one(tipo: str, numero: int) -> (Response, int):
    """
    Busca um pedido existente no banco de dados, com o respectivo 'tipo' e 'numero' informado.
    Método da Requisição: GET.
    Variáveis Obrigatórias (URI): 'tipo', 'numero'.
    :param tipo: str
    :param numero: int
    :return: (Response, int)
    """

    # Busca um pedido no banco de dados com o tipo e numero informado na URI.
    pedido = Pedido.query.filter_by(numero=numero, tipo=tipo).first()

    # Caso o pedido não exista, retorna uma resposta JSON com status 404 (Não Encontrado), contendo a mensagem de erro.
    if not pedido:
        return jsonify({
            'error': 'Pedido não cadastrado.',
        }), HTTP_404_NOT_FOUND

    # Caso o pedido exista, retorna uma resposta JSON com status 200 (OK), contendo o pedido encontrado.
    return jsonify({
        'pedido': pedido.to_dict(),
    }), HTTP_200_OK


@pedidos_bp.put('/<string:tipo>/<int:numero>')
@pedidos_bp.patch('/<string:tipo>/<int:numero>')
@jwt_required()
def update(tipo: str, numero: int) -> (Response, int):
    """
    Atualiza um pedido existente no banco de dados, cujo 'tipo' e 'numero' é o informado na URI.
    Método da Requisição: PUT, PATCH.
    Variáveis Obrigatórias (URI): 'tipo', 'numero'.
    Variáveis Opcionais (Params): 'data_chegada', 'secretaria_solicitante', 'projeto', 'descricao',
    'data_envio_financeiro', 'data_retorno_financeiro', 'situacao_autorizacao' e 'observacoes'.
    :param tipo: str
    :param numero: int
    :return: (Response, int)
    """

    # Busca um pedido no banco de dados com o tipo e numero informado na URI.
    pedido = Pedido.query.filter_by(numero=numero, tipo=tipo).first()

    # Caso o pedido não exista, retorna uma resposta JSON com status 404 (Não Encontrado), contendo a mensagem de erro.
    if not pedido:
        return jsonify({
            'error': 'Pedido não cadastrado.',
        }), HTTP_404_NOT_FOUND

    # Atualiza os atributos da entidade na transação atual.
    pedido.secretaria_solicitante = request.json.get('secretaria_solicitante', pedido.secretaria_solicitante)
    pedido.projeto = request.json.get('projeto', pedido.projeto)
    pedido.descricao = request.json.get('descricao', pedido.descricao)
    pedido.situacao_autorizacao = request.json.get('situacao_autorizacao', pedido.situacao_autorizacao)
    pedido.observacoes = request.json.get('observacoes', pedido.observacoes)

    data_chegada = request.json.get('data_chegada', None)
    pedido.data_chegada = datetime.strptime(
        data_chegada, '%d/%m/%Y').date() if data_chegada else pedido.data_chegada

    data_envio_financeiro = request.json.get('data_envio_financeiro', None)
    pedido.data_envio_financeiro = datetime.strptime(
        data_envio_financeiro, '%d/%m/%Y').date() if data_envio_financeiro else pedido.data_envio_financeiro

    data_retorno_financeiro = request.json.get('data_retorno_financeiro', None)
    pedido.data_retorno_financeiro = datetime.strptime(
        data_retorno_financeiro, '%d/%m/%Y').date() if data_retorno_financeiro else pedido.data_retorno_financeiro

    # Efetua o commit da transação atual.
    db.session.commit()

    # Caso a atualização seja bem sucedida, retorna uma resposta JSON com status 200 (OK), contendo o pedido encontrado.
    return jsonify({
        'pedido': pedido.to_dict(),
    }), HTTP_200_OK


@pedidos_bp.delete('/<string:tipo>/<int:numero>')
@jwt_required()
def delete(tipo: str, numero: int) -> (Response, int):
    """
    Exclui um pedido existente no banco de dados, cujo 'tipo' e 'numero' é o informado na URI.
    Método da Requisição: DELETE.
    Variáveis Obrigatórias (URI): 'tipo', 'numero'.
    :param tipo: str
    :param numero: int
    :return: (Response, int)
    """

    # Busca um pedido no banco de dados com o tipo e numero informado na URI.
    pedido = Pedido.query.filter_by(numero=numero, tipo=tipo).first()

    # Caso o pedido não exista, retorna uma resposta JSON com status 404 (Não Encontrado), contendo a mensagem de erro.
    if not pedido:
        return jsonify({
            'error': 'Pedido não cadastrado.',
        }), HTTP_404_NOT_FOUND

    # Exclui o pedido na transação atual.
    db.session.delete(pedido)

    # Efetua o commit da transação atual.
    db.session.commit()

    # Caso a exclusão seja bem sucedida, retorna uma resposta JSON com status 204 (Sem Conteúdo).
    return jsonify({}), HTTP_204_NO_CONTENT
