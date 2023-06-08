import * as tokenService from '../services/token.services.js';

async function validateToken(req, res, next) {
    console.log('Validate Token Request:', req.headers); // Agrega este console.log
    const token = req.headers['auth-token'];

    if (!token) {
        return res.status(401).json({ error: { message: 'no se ha enviado el token' } });
    }
    const payload = await tokenService.verifiedToken(token);

    if (!payload) {
        return res.status(401).json({ error: { message: 'token inválido' } });
    }
    req.payload = payload;
    next();
}

export  { validateToken }
