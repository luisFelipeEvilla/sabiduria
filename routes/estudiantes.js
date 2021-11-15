const router = require('express').Router();
const { db } = require('../db');
const Estudiante = require('../db/Estudiantes.js');


router.get('/', async (req, res) => {


    const Estudiantes = await Estudiante.getEstudiantes();

    res.send(Estudiantes)
})

module.exports = router;