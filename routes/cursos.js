const router = require('express').Router();
const { db } = require('../db');
const Curso = require('../db/Cursos.js');
const Asignatura = require('../db/Asignaturas.js');
const Docente = require('../db/Docentes.js');
const Salon = require('../db/Salones.js');
const Horario = require('../db/Horarios.js');


router.get('/', async (req, res) => {


    const cursos = await Curso.getCursos();


    res.render('pages/cursos/index.ejs',{ cursos });
})

router.get('/agregar', async (req, res) => {


    const asignaturas = await Asignatura.getAsignaturas();
    const docentes = await Docente.getDocentes();
    const salones = await Salon.getSalones();



    res.render('pages/cursos/agregar.ejs',{ asignaturas, docentes, salones });
})



router.get('/:id', async (req, res) => {
    const { id } = req.params;


    const curso = await Curso.getCurso(id);
    console.log(curso);

    res.render('pages/cursos/detalle.ejs',{ curso });

    
})

router.get('/:id/agregarHorario', async (req, res) => {
    const { id } = req.params;


    const curso = await Curso.getCurso(id);


    res.render('pages/cursos/agregarHorario.ejs',{ curso });

    
})

router.post('/:id/agregarHorario', async (req, res) => {
    const { id } = req.params;
    const {dia, hora_inicio, hora_fin} = req.body



    const resultado = await Horario.addHorario(dia, hora_inicio, hora_fin, id)


    res.redirect('/cursos/'+id);

    
})

router.get('/:id/eliminarHorario/:id_horario', async (req, res) => {
    const { id, id_horario } = req.params;
   



    const resultado = await Horario.deleteHorario(id_horario)


    res.redirect('/cursos/'+id);

    
})

router.post('/', async (req, res)  => {

    const { id_asignatura, id_docente, id_salon } = req.body

    const resultado = await Curso.addCurso(id_asignatura, id_docente, id_salon);

    res.redirect("/cursos")
})


router.get('/:id/eliminar', async (req,res) => {
    const { id } = req.params;


    const resultado = await Curso.deleteCurso(id);

    res.redirect("/cursos")
})


router.get('/:id/actualizar', async (req,res) => {
    const { id } = req.params;

    const curso = await Curso.getCurso(id)


    const asignaturas = await Asignatura.getAsignaturas();
    const docentes = await Docente.getDocentes();
    const salones = await Salon.getSalones();

    res.render('pages/cursos/actualizar.ejs',{ asignaturas, docentes, salones, curso });
})

router.post('/:id/actualizar', async (req,res)=> {
    const { id } = req.params;
    const { id_asignatura, id_docente, id_salon } = req.body

    const resultado = await Curso.updateCurso(id, id_asignatura, id_docente, id_salon );

    res.redirect('/cursos')

})

module.exports = router;