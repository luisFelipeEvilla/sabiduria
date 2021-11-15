const router = require('express').Router();
const { db } = require('../db');
const Curso = require('../db/Cursos.js');


router.get('/', async (req, res) => {


    const Cursos = await Curso.getCursos();

    res.send(Cursos)
})


router.get('/:id', async (req, res) => {
    const { id } = req.params;


    const CursoInfo = await Curso.getCurso(id);

    res.send(CursoInfo).status(200);

    
})

router.post('/', async (req, res)  => {

    const { id_asignatura, id_docente, id_salon } = req.body

    const resultado = await Curso.addCurso(id_asignatura, id_docente, id_salon);

    res.send(resultado).status(200)
})


router.delete('/:id', async (req,res) => {
    const { id } = req.params;


    const resultado = await Curso.deleteCurso(id);

    res.send(resultado).status(200);
})

router.put('/:id/actualizar', async (req,res)=> {
    const { id } = req.params;
    const { id_asignatura, id_docente, id_salon } = req.body

    const resultado = await Curso.updateCurso(id, id_asignatura, id_docente, id_salon );

    res.send(resultado).status(200);

})

module.exports = router;