const router = require('express').Router();
const { db } = require('../db');
const Estudiante = require('../db/Estudiantes.js');
const PlanEstudio = require('../db/PlanEstudios.js');
const Periodo = require('../db/Periodos.js');
const Curso = require('../db/Cursos.js');
const Matricula = require('../db/Matricula.js');


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


    const estudiante = await Estudiante.getEstudiante(id);

    res.render('pages/estudiantes/detalle.ejs',{estudiante});

    
})

router.get('/:id/eliminar', async (req,res) => {
    const { id } = req.params;


    const resultado = await Estudiante.deleteEstudiante(id);

    res.redirect("/estudiantes")
})

router.get('/:id/agregarCurso', async (req, res) => {

    const { id } = req.params;

    const estudiante = await Estudiante.getEstudiante(id);
    const cursos = await Curso.getCursos();
    const periodos = await Periodo.getPeriodos();

    console.log(estudiante)



    res.render('pages/estudiantes/agregarCurso.ejs', {
        estudiante,
        cursos, 
        periodos
    })
});

router.post('/:id/agregarCurso/', async (req, res) => {
    const { id} = req.params;
    const { id_curso, id_periodo } = req.body;


    const resultado = await Matricula.addCursoEstudiante(id_curso, id, id_periodo);


    res.redirect('/estudiantes/'+id)


});

router.get('/:id/eliminarCurso/:id_curso/:id_periodo', async (req, res) => {
    const { id, id_curso, id_periodo} = req.params;



    const resultado = await Matricula.deleteCursoEstudiante(id_curso, id, id_periodo);


    res.redirect('/estudiantes/'+id)


});

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