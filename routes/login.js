const router = require('express').Router();
const { comparePassword } = require('../utils/encriptacion');
const jwt = require('jsonwebtoken');
const url = require('url');    
const Docente = require('../db/Docentes');

const { jwt_secret_key } = require('../config');

router.get('/', (req, res) => {
    const { errorUsuario, errorContrasena} = req.query;

    if (errorUsuario != null) {
        res.render('pages/login', {errorUsuario: true, errorContrasena: false});
    }

    if (errorContrasena != null) {
        res.render('pages/login', {errorUsuario: false, errorContrasena: true});
    }

    res.render('pages/login', {errorUsuario: false, errorContrasena: false});
})

router.post('/', async (req, res) => {
    const { usuario, contrasena } = req.body;
    
    const resultado = await Docente.getCredenciales(usuario);

    if (resultado == null) {
        res.redirect(url.format({
            pathname: '/login',
            query: {
                "errorUsuario": true 
            }
        }))
    } else {
        if (!comparePassword(contrasena, resultado.contrasena)) {
            res.redirect(url.format({
                pathname: '/login',
                query: {
                    "errorContrasena": true 
                }
            }))
        } else {
            const token = jwt.sign(
                { usuario: resultado.usuario, rol: resultado.rol},
                jwt_secret_key,
                {
                    expiresIn: '3d'
                }
            )
            res.cookie('jwt', token, {secure: true, httpOnly: true})

            if (resultado.rol == 'a') {
                res.redirect('/admin');
            } else {
                res.redirect('/')
            }
        }
    }
})

module.exports = router;