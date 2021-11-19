const router = require('express').Router();
const { db } = require('../db');
const Asignatura = require('../db/Asignaturas.js');

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
    console.log(asignatura)

    res.render('pages/asignaturas/detalle.ejs',{asignatura})

    
})





router.post('/', async (req, res)  => {

    const { nombre } = req.body

    const resultado = await Asignatura.addAsignatura(nombre);

    res.redirect('/asignaturas')


})

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