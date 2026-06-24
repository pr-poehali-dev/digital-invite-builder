import json
import os
import hmac
import hashlib
import base64
import time

def _b64url(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).decode().rstrip('=')

def _sign(payload: dict, secret: str) -> str:
    header = {'alg': 'HS256', 'typ': 'JWT'}
    h = _b64url(json.dumps(header, separators=(',', ':')).encode())
    p = _b64url(json.dumps(payload, separators=(',', ':')).encode())
    signing_input = f'{h}.{p}'.encode()
    sig = hmac.new(secret.encode(), signing_input, hashlib.sha256).digest()
    return f'{h}.{p}.{_b64url(sig)}'

def _verify(token: str, secret: str) -> dict:
    try:
        h, p, s = token.split('.')
        signing_input = f'{h}.{p}'.encode()
        expected = _b64url(hmac.new(secret.encode(), signing_input, hashlib.sha256).digest())
        if not hmac.compare_digest(expected, s):
            return None
        pad = '=' * (-len(p) % 4)
        payload = json.loads(base64.urlsafe_b64decode(p + pad))
        if payload.get('exp', 0) < int(time.time()):
            return None
        return payload
    except Exception:
        return None

def handler(event: dict, context) -> dict:
    '''
    Авторизация администратора Qonaq Invite.
    POST { action: "login", login, password } -> { token }
    GET с заголовком X-Auth-Token -> { valid: true }
    '''
    method = event.get('httpMethod', 'GET')
    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
        'Access-Control-Max-Age': '86400',
    }
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    jwt_secret = os.environ.get('JWT_SECRET', '')
    admin_login = os.environ.get('ADMIN_LOGIN', '')
    admin_password = os.environ.get('ADMIN_PASSWORD', '')
    headers = {**cors, 'Content-Type': 'application/json'}

    if method == 'POST':
        body = json.loads(event.get('body') or '{}')
        login = str(body.get('login', '')).strip()
        password = str(body.get('password', ''))

        ok = (hmac.compare_digest(login, admin_login)
              and hmac.compare_digest(password, admin_password)
              and admin_login != '' and admin_password != '')
        if not ok:
            return {'statusCode': 401, 'headers': headers,
                    'body': json.dumps({'error': 'Неверный логин или пароль'})}

        token = _sign({'sub': 'admin', 'exp': int(time.time()) + 7 * 24 * 3600}, jwt_secret)
        return {'statusCode': 200, 'headers': headers,
                'body': json.dumps({'token': token})}

    token = event.get('headers', {}).get('X-Auth-Token') or event.get('headers', {}).get('x-auth-token', '')
    payload = _verify(token, jwt_secret) if token else None
    if payload:
        return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'valid': True})}
    return {'statusCode': 401, 'headers': headers, 'body': json.dumps({'valid': False})}
