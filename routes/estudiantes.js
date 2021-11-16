const router = require('express').Router();
const { db } = require('../db');
const Estudiante = require('../db/Estudiantes.js');


router.get('/', async (req, res) => {


    const Estudiantes = await Estudiante.getEstudiantes();

    res.send(Estudiantes)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;


    const PeriodoInfo = await Estudiante.getEstudiante(id);

    res.send(PeriodoInfo).status(200);

    
})

router.post('/', async (req, res)  => {

    const {nombre, id_plan_de_estudio, id_periodo_ingreso } = req.body

    const resultado = await Estudiante.addEstudiante(nombre, id_plan_de_estudio, id_periodo_ingreso);

    res.send(resultado).status(200)
})

router.delete('/:id', async (req,res) => {
    const { id } = req.params;


    const resultado = await Estudiante.deleteEstudiante(id);

    res.send(resultado).status(200);
})

router.put('/:id/actualizar', async (req,res)=> {
    const { id } = req.params;
    const { nombre, id_plan_de_estudio, id_periodo_ingreso } = req.body

    const resultado = await Estudiante.updateEstudiante(id,nombre, id_plan_de_estudio, id_periodo_ingreso);

    res.send(resultado).status(200);

})

module.exports = router;