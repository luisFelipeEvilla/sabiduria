const router = require('express').Router();
const { db } = require('../db');
const PlanEstudio = require('../db/PlanEstudios.js');
const Programa = require('../db/Programas.js');


router.get('/', async (req, res) => {


    const planEstudios = await PlanEstudio.getPlanEstudios();



    res.render('pages/planestudios/index.ejs',{ planEstudios });
})

router.get('/agregar', async (req, res) => {

    const programas = await Programa.getProgramas();




    res.render('pages/planestudios/agregar.ejs',{ programas });
})


router.get('/:id/eliminar', async (req,res) => {
    const { id } = req.params;


    const resultado = await PlanEstudio.deletePlanEstudio(id);

    res.redirect("/planestudios")
})

router.get('/:id/actualizar', async (req, res) => {
    const { id } = req.params;


    const planestudio = await PlanEstudio.getPlanEstudio(id);
    const programas = await Programa.getProgramas();

    




    res.render('pages/planestudios/actualizar.ejs',{ planestudio, programas });
})


router.get('/:id', async (req, res) => {
    const { id } = req.params;


    const PlanEstudioInfo = await PlanEstudio.getPlanEstudio(id);

    res.send(PlanEstudioInfo).status(200);

    
})


router.post('/', async (req, res)  => {

    let { ano, id_programa_academico } = req.body


    ano = ano.concat("-01-01")

    const resultado = await PlanEstudio.addPlanEstudio(ano, id_programa_academico);

    res.redirect("/planestudios")


})



router.post('/:id/actualizar', async (req,res)=> {
    const { id } = req.params;
    let { ano, id_programa_academico } = req.body

    ano = ano.concat("-01-01")

    const resultado = await PlanEstudio.updatePlanEstudio(id, ano, id_programa_academico );

    res.redirect("/planestudios")

})

module.exports = router;