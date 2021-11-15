const router = require('express').Router();
const { db } = require('../db');
const PlanEstudio = require('../db/PlanEstudios.js');


router.get('/', async (req, res) => {


    const PlanEstudios = await PlanEstudio.getPlanEstudios();

    res.send(PlanEstudios)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;


    const PlanEstudioInfo = await PlanEstudio.getPlanEstudio(id);

    res.send(PlanEstudioInfo).status(200);

    
})


router.post('/', async (req, res)  => {

    const { ano, id_programa_academico } = req.body



    const resultado = await PlanEstudio.addPlanEstudio(ano, id_programa_academico);

    res.send(resultado).status(200)


})


router.delete('/:id', async (req,res) => {
    const { id } = req.params;


    const resultado = await PlanEstudio.deletePlanEstudio(id);

    res.send(resultado).status(200);
})

router.put('/:id/actualizar', async (req,res)=> {
    const { id } = req.params;
    const { ano, id_programa_academico } = req.body

    const resultado = await PlanEstudio.updatePlanEstudio(id, ano, id_programa_academico );

    res.send(resultado).status(200);

})

module.exports = router;