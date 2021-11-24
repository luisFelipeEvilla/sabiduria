const jwt = require("jsonwebtoken");
const {jwt_secret_key} = require('../config');

const auth = (req, res, next) => {

    const accessToken = req.cookies.jwt;
    
    if (!accessToken) {
        return res.redirect('/login');
    }

    let payload
    try {
        payload = jwt.verify(accessToken, jwt_secret_key);
        res.rol = payload.rol;
        res.usuario = payload.usuario;
        res.id = payload.id;
        next();
    } catch(e) {
        return res.status(401).send();
    }
}

const isAdmin = (req, res, next) => {
    if (res.rol === 'a') { 
        next();
    } else {
        res.redirect('/')
    }
}

module.exports = {
    auth,
    isAdmin
};