const router = require('express').Router();
const { db } = require('../db');
const Asignatura = require('../db/Asignaturas.js');

router.get('/', async (req, res) => {
    const Asignaturas = await Asignatura.getAsignaturas();

    res.send(Asignaturas)
})


router.get('/:id', async (req, res) => {
    const { id } = req.params;


    const AsignaturaInfo = await Asignatura.getAsignatura(id);

    res.send(AsignaturaInfo).status(200);

    
})

router.post('/', async (req, res)  => {

    const { nombre } = req.body

    const resultado = await Asignatura.addAsignatura(nombre);

    res.send(resultado).status(200)


})

router.delete('/:id', async (req,res) => {
    const { id } = req.params;


    const resultado = await Asignatura.deleteAsignatura(id);

    res.send(resultado).status(200);
})

router.put('/:id/actualizar', async (req,res)=> {
    const { id } = req.params;
    const { nombre } = req.body;

    const resultado = await Asignatura.updateAsignatura(id, nombre);

    res.send(resultado).status(200);

})


module.exports = router;