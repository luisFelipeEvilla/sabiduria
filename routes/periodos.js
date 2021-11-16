const router = require('express').Router();
const { db } = require('../db');
const Periodo = require('../db/Periodos.js');


router.get('/', async (req, res) => {


    const Periodos = await Periodo.getPeriodos();

    res.send(Periodos)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;


    const PeriodoInfo = await Periodo.getPeriodo(id);

    res.send(PeriodoInfo).status(200);

    
})

router.post('/', async (req, res)  => {

    const {descripcion } = req.body

    const resultado = await Periodo.addPeriodo(descripcion);

    res.send(resultado).status(200)
})

router.delete('/:id', async (req,res) => {
    const { id } = req.params;


    const resultado = await Periodo.deletePeriodo(id);

    res.send(resultado).status(200);
})

router.put('/:id/actualizar', async (req,res)=> {
    const { id } = req.params;
    const { descripcion } = req.body

    const resultado = await Periodo.updatePeriodo(id, descripcion);

    res.send(resultado).status(200);

})




module.exports = router;