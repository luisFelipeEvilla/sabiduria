const router = require('express').Router();
const { db } = require('../db');
const Programa = require('../db/Programas.js');


router.get('/', async (req, res) => {
    const Programas = await Programa.getProgramas();

    res.send(Programas)
})
// TODO - Hacer getPrograma en Programas.js
router.get('/:id', async (req, res) => {
    const { id } = req.params;


    const ProgramaInfo = await Programa.getProrgama(id);

    res.send(ProgramaInfo).status(200);

    
})


module.exports = router;