const router = require('express').Router();
const { db } = require('../db');
const Salon = require('../db/Salones.js');


router.get('/', async (req, res) => {


    const salones = await Salon.getSalones();

    res.render('pages/salones/index.ejs',{ salones });
})

router.get('/:id/actualizar', async (req, res) => {
    const { id } = req.params;

    const salon = await Salon.getSalon(id);

    res.render('pages/salones/actualizar.ejs',{ salon });
})

router.get('/agregar', async (req, res) => {


   

    res.render('pages/salones/agregar.ejs');
})


router.get('/:id', async (req, res) => {
    const { id } = req.params;


    const salon = await Salon.getSalon(id);
    console.log(salon)
    res.render('pages/salones/detalle.ejs',{ salon });

    
})

router.post('/', async (req, res)  => {

    const { nombre } = req.body

    const resultado = await Salon.addSalon(nombre);

    res.redirect("/salones")
})


router.get('/:id/eliminar', async (req,res) => {
    const { id } = req.params;


    const resultado = await Salon.deleteSalon(id);

    res.redirect("/salones")
})

router.post('/:id/actualizar', async (req,res)=> {
    const { id } = req.params;
    const { nombre} = req.body

    const resultado = await Salon.updateSalon(id, nombre);

    res.redirect("/salones")

})

module.exports = router;