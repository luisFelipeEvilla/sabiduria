const router = require('express').Router();
const { db } = require('../db');
const Docente = require('../db/Docentes.js');

router.get('/', async (req, res) => {
    const Docentes = await Docente.getDocentes();

    res.send(Docentes)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;


    const DocenteInfo = await Docente.getDocente(id);

    res.send(DocenteInfo).status(200);

    
})

router.post('/', async (req, res)  => {

    const { nombre, id_departamento } = req.body

    const resultado = await Docente.addDocente(nombre, id_departamento);

    res.send(resultado).status(200)


})


router.delete('/:id', async (req,res) => {
    const { id } = req.params;


    const resultado = await Docente.deleteDocente(id);

    res.send(resultado).status(200);
})

router.put('/:id/actualizar', async (req,res)=> {
    const { id } = req.params;
    const { nombre, id_departamento } = req.body;

    const resultado = await Docente.updateDocente(id, nombre, id_departamento);

    res.send(resultado).status(200);

})



module.exports = router;