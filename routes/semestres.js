const router = require('express').Router();
const { db } = require('../db');
const Semestre = require('../db/Semestres.js');


router.get('/', async (req, res) => {


    const Semestres = await Semestre.getSemestres();

    res.send(Semestres)
})


router.get('/:id', async (req, res) => {
    const { id } = req.params;


    const SemestreInfo = await Semestre.getSemestre(id);

    res.send(SemestreInfo).status(200);

    
})

router.post('/', async (req, res)  => {

    const { numero, id_plan_de_estudio } = req.body

    const resultado = await Semestre.addSemestre(numero, id_plan_de_estudio);

    res.send(resultado).status(200)
})

router.delete('/:id', async (req,res) => {
    const { id } = req.params;


    const resultado = await Semestre.deleteSemestre(id);

    res.send(resultado).status(200);
})

router.put('/:id/actualizar', async (req,res)=> {
    const { id } = req.params;
    const { numero, id_plan_de_estudio } = req.body

    const resultado = await Semestre.updateSemestre(id, numero, id_plan_de_estudio );

    res.send(resultado).status(200);

})

module.exports = router;