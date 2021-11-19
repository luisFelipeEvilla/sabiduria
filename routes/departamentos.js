const router = require('express').Router();
const { db } = require('../db');
const Departamento = require('../db/Departamentos.js');
const Docente = require('../db/Docentes.js');
const Programa =require('../db/Programas.js');

router.get('/', async (req, res) => {
    const Departamentos = await Departamento.getDepartamentos();


    res.render('pages/departamentos/index.ejs',{ Departamentos });
})


router.get('/agregar', async (req, res) => {
    const Departamentos = await Departamento.getDepartamentos();

    res.render('pages/departamentos/agregar.ejs',{ Departamentos });
})

router.get('/:id/agregarDocente', async (req, res) => {

    const { id } = req.params;

    const departamento = await Departamento.getDepartamento(id);
    const docentes = await Docente.getDocentes();

    res.render('pages/departamentos/agregarDocente.ejs', {
        departamento,
        docentes
    })
});

router.get('/:id/agregarPrograma', async (req, res) => {

    const { id } = req.params;

    const departamento = await Departamento.getDepartamento(id);
    const programas = await Programa.getProgramas();

    res.render('pages/departamentos/agregarPrograma.ejs', {
        departamento,
        programas
    })
});




router.post('/:id/agregarDocente', async (req, res) => {
    const { id } = req.params;
    const { id_docente } = req.body;



    const resultado = await Docente.updateDepartamento(id_docente, id);

    res.redirect('/departamentos/'+id)


});

router.post('/:id/agregarPrograma', async (req, res) => {
    const { id } = req.params;
    const { id_programa } = req.body;



    const resultado = await Programa.updateDepartamento(id_programa, id);

    res.redirect('/departamentos/'+id)


});



router.get('/:id', async (req, res) => {
    const { id } = req.params;


    const departamento = await Departamento.getDepartamento(id);




    res.render('pages/departamentos/detalle.ejs',{ departamento });

})



router.post('/', async (req, res)  => {

    const { nombre } = req.body

    const resultado = await Departamento.addDepartamento(nombre);

    res.redirect('/departamentos')


})

router.post('/:id/moverDocente/:id_docente', async (req,res) => {
    const { id, id_docente} = req.params;
    const {id_departamento} = req.body;






    const resultado = await Docente.updateDepartamento(id_docente, id_departamento);

    res.redirect('/departamentos/'+id)
})
router.post('/:id/moverPrograma/:id_programa', async (req,res) => {
    const { id, id_programa} = req.params;
    const {id_departamento} = req.body;

    




    const resultado = await Programa.updateDepartamento(id_programa, id_departamento);

    res.redirect('/departamentos/'+id)
})


router.get('/:id/moverDocente/:docente_id', async (req,res) => {
    const { id, docente_id} = req.params;


    const departamento = await Departamento.getDepartamento(id);
    const departamentos = await Departamento.getDepartamentos();

    res.render('pages/departamentos/moverDocente.ejs', {departamentos, departamento, docente_id})
})

router.get('/:id/moverPrograma/:programa_id', async (req,res) => {
    const { id, programa_id} = req.params;


    const departamento = await Departamento.getDepartamento(id);
    const departamentos = await Departamento.getDepartamentos();

    res.render('pages/departamentos/moverPrograma.ejs', {departamentos, departamento, programa_id})
})




router.get('/:id/eliminar', async (req,res) => {
    const { id } = req.params;


    const resultado = await Departamento.deleteDepartamento(id);

    res.redirect('/departamentos')
})



router.post('/:id/actualizar', async (req,res)=> {
    const { id } = req.params;
    const { nombre } = req.body;

    const resultado = await Departamento.updateDepartamento(id, nombre);

    res.redirect('/departamentos')

})

router.get('/:id/actualizar', async (req,res)=> {

    const { id } = req.params;
    const departamento = await Departamento.getDepartamento(id);



    res.render('pages/departamentos/actualizar.ejs',{ departamento });

})


module.exports = router;


