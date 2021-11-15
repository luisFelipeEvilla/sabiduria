const router = require('express').Router();
const { db } = require('../db');
const Salon = require('../db/Salones.js');


router.get('/', async (req, res) => {


    const Salones = await Salon.getSalones();

    res.send(Salones)
})


router.get('/:id', async (req, res) => {
    const { id } = req.params;


    const SalonInfo = await Salon.getSalon(id);

    res.send(SalonInfo).status(200);

    
})

router.post('/', async (req, res)  => {

    const { nombre } = req.body

    const resultado = await Salon.addSalon(nombre);

    res.send(resultado).status(200)
})


router.delete('/:id', async (req,res) => {
    const { id } = req.params;


    const resultado = await Salon.deleteSalon(id);

    res.send(resultado).status(200);
})

router.put('/:id/actualizar', async (req,res)=> {
    const { id } = req.params;
    const { nombre} = req.body

    const resultado = await Salon.updateSalon(id, nombre);

    res.send(resultado).status(200);

})

module.exports = router;