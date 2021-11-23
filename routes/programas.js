const router = require('express').Router();
const { db } = require('../db');
const Programa = require('../db/Programas.js');
const Departamento = require('../db/Departamentos.js');
const PlanEstudio = require('../db/PlanEstudios.js');
const Semestre = require('../db/Semestres.js');
const Cursa = require('../db/Cursa.js');


router.get('/', async (req, res) => {
    const programas = await Programa.getProgramas();


    res.render('pages/programas/index.ejs',{ programas });
})

router.get('/agregar', async (req, res) => {

    const departamentos = await Departamento.getDepartamentos();




    res.render('pages/programas/agregar.ejs',{ departamentos });
})


router.get('/:id/actualizar', async (req, res) => {

    const { id } = req.params;
    const programa = await Programa.getPrograma(id);
    const departamentos = await Departamento.getDepartamentos();

 



    res.render('pages/programas/actualizar.ejs',{ programa, departamentos });
})

router.post('/:id/actualizar', async (req,res)=> {
    const { id } = req.params;
    const { nombre, id_departamento} = req.body;

    const resultado = await Programa.updatePrograma(id, nombre, id_departamento);

    res.redirect('/programas')

})


router.get('/:id', async (req, res) => {
    const { id } = req.params;


    const programa = await Programa.getPrograma(id);

    res.render('pages/programas/detalle.ejs',{ programa });

    
})




router.post('/', async (req, res)  => {

    const { nombre, id_departamento } = req.body

    const resultado = await Programa.addPrograma(nombre, id_departamento);

    res.redirect('/programas')


})

router.get('/:id/agregarPlan', async (req, res)  => {
    const { id } = req.params;



  

    const programa = await Programa.getPrograma(id);

    res.render('pages/programas/agregarPlan.ejs',{ programa });


})

router.post('/:id/agregarPlan', async (req, res)  => {
    const { id } = req.params;

    let {ano} = req.body

    ano = ano.concat("-01-01")

    const resultado = await PlanEstudio.addPlanEstudio(ano, id);

    res.redirect('/programas/'+id)


})



router.get('/:id/planestudios/:id_planestudio/eliminar', async (req,res) => {
    const { id, id_planestudio } = req.params;


    const resultado = await PlanEstudio.deletePlanEstudio(id_planestudio);

    res.redirect('/programas/'+id)
})

router.get('/:id/planestudios/:id_planestudio/', async (req,res) => {
    const { id, id_planestudio } = req.params;


    const plan = await PlanEstudio.getPlanEstudio(id_planestudio);


    res.render('pages/programas/detallePlan.ejs',{ plan, id });
})


router.get('/:id/planestudios/:id_planestudio/agregarSemestre', async (req,res) => {
    const { id, id_planestudio } = req.params;

    // TODO: Agregar semestre, cambiar archivo agregarSemestre.ejs
    const programa = await Programa.getPrograma(id);

    const plan = await PlanEstudio.getPlanEstudio(id_planestudio);
    const departamento = await Departamento.getDepartamento(programa.programa[0].id_departamento)
    const asignaturas = await PlanEstudio.getAsignaturasDisponibles(id_planestudio)

    let semestresDisponibles = [1, 2, 3, 4]
    const semestres = plan.semestres.forEach(asignatura => {
        indice = semestresDisponibles.indexOf(asignatura.numero);
        if (indice != -1) {
            semestresDisponibles.splice(indice, 1);
        }
    })

   res.render('pages/programas/agregarSemestre.ejs',{ programa, id_planestudio,
    departamento, plan, asignaturas, semestresDisponibles});
})

router.post('/:id/planestudios/:id_planestudio/agregarSemestre', async (req,res) => {
    const { id, id_planestudio } = req.params;
    const {numero, id_asignatura_1, id_asignatura_2, id_asignatura_3} = req.body

    const semestre = await Semestre.addSemestre(numero, id_planestudio);

    await Cursa.addAsignaturaSemestre(semestre[0].id, id_asignatura_1);
    await Cursa.addAsignaturaSemestre(semestre[0].id, id_asignatura_2);
    await Cursa.addAsignaturaSemestre(semestre[0].id, id_asignatura_3);
    // TODO: ELIMINAR SEMESTRES, ELIMINAR PLANES DE ESTUDIO 

   res.redirect('/programas/'+id+'/planestudios/'+id_planestudio);
})

router.get('/:id/eliminar', async (req,res) => {
    const { id } = req.params;


    const resultado = await Programa.deletePrograma(id);

    res.redirect('/programas')
})



module.exports = router;