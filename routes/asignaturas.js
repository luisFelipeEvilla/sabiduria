const router = require('express').Router();
const { db } = require('../db');
const Asignatura = require('../db/Asignaturas.js');
const Curso = require('../db/Cursos.js')
const Departamento = require('../db/Departamentos.js')
const Contiene = require('../db/Contiene.js')

router.get('/', async (req, res) => {
    const asignaturas = await Asignatura.getAsignaturas();

    res.render('pages/asignaturas/index.ejs', {asignaturas})
})

router.get('/agregar', async (req, res)  => {


    res.render('pages/asignaturas/agregar.ejs')


})

router.get('/:id/actualizar', async (req, res) => {
    const { id } = req.params;


    const asignatura = await Asignatura.getAsignatura(id);

    res.render('pages/asignaturas/actualizar.ejs',{asignatura})

    
})


router.get('/:id', async (req, res) => {
    const { id } = req.params;

    
    const asignatura = await Asignatura.getAsignatura(id);


    res.render('pages/asignaturas/detalle.ejs',{asignatura})

    
})





router.post('/', async (req, res)  => {

    const { nombre } = req.body

    const resultado = await Asignatura.addAsignatura(nombre);

    res.redirect('/asignaturas')


})
router.get('/:id/agregarCurso', async (req, res) => {

    const { id } = req.params;

    const asignatura = await Asignatura.getAsignatura(id);
    const cursos = await Curso.getCursos();

    res.render('pages/asignaturas/agregarCurso.ejs', {
        asignatura,
        cursos
    })
});


router.get('/:id/agregarDepartamento', async (req, res) => {

    const { id } = req.params;

    const asignatura = await Asignatura.getAsignatura(id);
    const departamentos = await Departamento.getDepartamentos();

    res.render('pages/asignaturas/agregarDepartamento.ejs', {
        asignatura,
        departamentos
    })
});

router.get('/:id/moverCurso/:id_curso', async (req,res) => {
    const { id, id_curso} = req.params;


    const asignatura = await Asignatura.getAsignatura(id);
    const asignaturas = await Asignatura.getAsignaturas();

    res.render('pages/asignaturas/moverCurso.ejs', {asignaturas, asignatura, id_curso})
})

router.post('/:id/moverCurso/:id_curso', async (req,res) => {
    const { id, id_curso} = req.params;
    const {id_asignatura} = req.body;

    




    const resultado = await Curso.updateAsignatura(id_curso, id_asignatura);

    res.redirect('/asignaturas/'+id)
})


router.post('/:id/agregarCurso', async (req, res) => {

    const { id } = req.params;

    const { id_curso } = req.body;

    const resultado = await Curso.updateAsignatura(id_curso, id);

    res.redirect("/asignaturas/"+id)
});

router.post('/:id/agregarDepartamento', async (req, res) => {

    const { id } = req.params;

    const { id_departamento } = req.body;

    console.log(id_departamento);

    const resultado = await Contiene.addAsignaturaDepartamento(id_departamento, id);

    res.redirect("/asignaturas/"+id)
});

router.get("/:id/eliminarDepartamento/:id_departamento", async (req, res) => {

    const { id, id_departamento } = req.params;

    const resultado = await Contiene.deleteAsignaturaDepartamento(id_departamento, id);

    res.redirect("/asignaturas/"+id)

});


router.get('/:id/eliminar', async (req,res) => {
    const { id } = req.params;


    const resultado = await Asignatura.deleteAsignatura(id);

    res.redirect("/asignaturas")
})

router.post('/:id/actualizar', async (req,res)=> {
    const { id } = req.params;
    const { nombre } = req.body;

    const resultado = await Asignatura.updateAsignatura(id, nombre);

    res.redirect("/asignaturas")

})


module.exports = router;