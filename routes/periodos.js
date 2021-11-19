const router = require('express').Router();
const { db } = require('../db');
const Periodo = require('../db/Periodos.js');


router.get('/', async (req, res) => {


    const periodos = await Periodo.getPeriodos();


    res.render('pages/periodos/index.ejs',{ periodos });
})

router.get('/agregar', async (req, res) => {




    res.render('pages/periodos/agregar.ejs');
})

router.get('/:id/actualizar', async (req, res) => {
    const { id } = req.params;


    const periodo = await Periodo.getPeriodo(id);

    res.render('pages/periodos/actualizar.ejs', {periodo});

    
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;


    const PeriodoInfo = await Periodo.getPeriodo(id);

    res.send(PeriodoInfo).status(200);

    
})

router.post('/', async (req, res)  => {

    const {descripcion } = req.body

    const resultado = await Periodo.addPeriodo(descripcion);

    res.redirect("/periodos")
})

router.get('/:id/eliminar', async (req,res) => {
    const { id } = req.params;


    const resultado = await Periodo.deletePeriodo(id);

    res.redirect("/periodos")
})

router.post('/:id/actualizar', async (req,res)=> {
    const { id } = req.params;
    const { descripcion } = req.body

    const resultado = await Periodo.updatePeriodo(id, descripcion);

    res.redirect("/periodos")

})




module.exports = router;