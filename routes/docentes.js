const router = require('express').Router();
const { db } = require('../db');
const Docente = require('../db/Docentes.js');
const Departamento = require('../db/Departamentos.js');
const Curso = require('../db/Cursos.js');
const { cryptPassword } = require('../utils/encriptacion');

router.get('/', async (req, res) => {
    const Docentes = await Docente.getDocentes();

    res.render('pages/docentes/index.ejs',{ Docentes });
})

router.get('/agregar', async (req, res) => {
    const departamentos = await Departamento.getDepartamentos();
  
    res.render('pages/docentes/agregar.ejs',{ departamentos });
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const docente = await Docente.getDocente(id);

    res.render('pages/docentes/detalle.ejs',{ docente});
})

router.get('/:id/agregarCurso', async (req, res) => {
    const { id } = req.params;

    const docente = await Docente.getDocente(id);
    const cursos = await Curso.getCursos();

    res.render('pages/docentes/agregarCurso.ejs', {
        docente,
        cursos
    })
});

router.get('/:id/moverCurso/:id_curso', async (req,res) => {
    const { id, id_curso} = req.params;


    const docente = await Docente.getDocente(id);
    const docentes = await Docente.getDocentes();



    res.render('pages/docentes/moverCurso.ejs', {docente, docentes, id_curso})
})

router.get('/:id/eliminar', async (req,res) => {
    const { id } = req.params;

    const resultado = await Docente.deleteDocente(id);

    res.redirect("/docentes")
})

router.get('/:id/actualizar', async (req,res)=> {
    const { id } = req.params;
    
 
    const docente = await Docente.getDocente(id);
    const departamentos = await Departamento.getDepartamentos();

    res.render('pages/docentes/actualizar.ejs',{ docente , departamentos, id });
})

router.post('/:id/moverCurso/:id_curso', async (req,res) => {
    const { id, id_curso} = req.params;
    const {id_docente} = req.body;

    const resultado = await Curso.updateDocente(id_curso, id_docente);

    res.redirect('/docentes/'+id)
})

router.post('/:id/actualizar', async (req,res)=> {
    const { id } = req.params;
    const { nombre, id_departamento } = req.body;

    const resultado = await Docente.updateDocente(id, nombre, id_departamento);

    res.redirect('/docentes')

})

router.post('/:id/agregarCurso', async (req, res) => {
    const { id } = req.params;
    const { id_curso } = req.body;

    const resultado = await Curso.updateDocente(id_curso, id);

    res.redirect('/docentes/'+id)
});

router.post('/codigo/:id/:curso/:id_horario', async (req, res) => {
    const { id, curso, id_horario } = req.params;
    
    const resultado = await Docente.createCodes(id, curso, id_horario);

    res.redirect(`/cursos/${curso}/${id_horario}/asistencia`);
});

router.post('/', async (req, res)  => {
    const { nombre, id_departamento, usuario, contrasena } = req.body
    
    const contrasenaEncriptada = cryptPassword(contrasena);

    const resultado = await Docente.addDocente(nombre, id_departamento, usuario, contrasenaEncriptada);

    res.redirect("/docentes")
})



module.exports = router;