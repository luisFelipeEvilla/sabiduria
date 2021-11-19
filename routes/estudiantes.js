const router = require('express').Router();
const { db } = require('../db');
const Estudiante = require('../db/Estudiantes.js');
const PlanEstudio = require('../db/PlanEstudios.js');
const Periodo = require('../db/Periodos.js');


router.get('/', async (req, res) => {


    const estudiantes = await Estudiante.getEstudiantes();
    
    res.render('pages/estudiantes/index.ejs',{ estudiantes });
})

router.get('/agregar', async (req, res) => {


    const estudiantes = await Estudiante.getEstudiantes();
    const planestudios = await PlanEstudio.getPlanEstudios();
    const periodos = await Periodo.getPeriodos();

    res.render('pages/estudiantes/agregar.ejs',{ estudiantes, planestudios, periodos });
})

router.get('/:id/actualizar', async (req, res) => {

    const { id } = req.params;



    const estudiante = await Estudiante.getEstudiante(id);
    const planestudios = await PlanEstudio.getPlanEstudios();
    const periodos = await Periodo.getPeriodos();


    
    res.render('pages/estudiantes/actualizar.ejs',{ estudiante, planestudios, periodos });
})



router.get('/:id', async (req, res) => {
    const { id } = req.params;


    const PeriodoInfo = await Estudiante.getEstudiante(id);

    res.send(PeriodoInfo).status(200);

    
})

router.get('/:id/eliminar', async (req,res) => {
    const { id } = req.params;


    const resultado = await Estudiante.deleteEstudiante(id);

    res.redirect("/estudiantes")
})

router.post('/', async (req, res)  => {

    const {nombre, id_plan_de_estudio, id_periodo_ingreso } = req.body

    const resultado = await Estudiante.addEstudiante(nombre, id_plan_de_estudio, id_periodo_ingreso);

    res.redirect("/estudiantes")
})



router.post('/:id/actualizar', async (req,res)=> {
    const { id } = req.params;
    const { nombre, id_plan_de_estudio, id_periodo_ingreso } = req.body

    const resultado = await Estudiante.updateEstudiante(id,nombre, id_plan_de_estudio, id_periodo_ingreso);

    res.redirect("/estudiantes")

})

module.exports = router;