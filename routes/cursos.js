const router = require('express').Router();
const { db } = require('../db');
const Curso = require('../db/Cursos.js');
const Asignatura = require('../db/Asignaturas.js');
const Docente = require('../db/Docentes.js');
const Salon = require('../db/Salones.js');


router.get('/', async (req, res) => {


    const cursos = await Curso.getCursos();


    res.render('pages/cursos/index.ejs',{ cursos });
})

router.get('/agregar', async (req, res) => {


    const asignaturas = await Asignatura.getAsignaturas();
    const docentes = await Docente.getDocentes();
    const salones = await Salon.getSalones();


    console.log(asignaturas);
    res.render('pages/cursos/agregar.ejs',{ asignaturas, docentes, salones });
})



router.get('/:id', async (req, res) => {
    const { id } = req.params;


    const CursoInfo = await Curso.getCurso(id);

    res.send(CursoInfo).status(200);

    
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

router.put('/:id/actualizar', async (req,res)=> {
    const { id } = req.params;
    const { id_asignatura, id_docente, id_salon } = req.body

    const resultado = await Curso.updateCurso(id, id_asignatura, id_docente, id_salon );

    res.send(resultado).status(200);

})

module.exports = router;