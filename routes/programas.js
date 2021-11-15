const router = require('express').Router();
const { db } = require('../db');
const Programa = require('../db/Programas.js');


router.get('/', async (req, res) => {
    const Programas = await Programa.getProgramas();

    res.send(Programas)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;


    const ProgramaInfo = await Programa.getPrograma(id);

    res.send(ProgramaInfo).status(200);

    
})

router.post('/', async (req, res)  => {

    const { nombre, id_departamento } = req.body

    const resultado = await Programa.addPrograma(nombre, id_departamento);

    res.send(resultado).status(200)


})


router.delete('/:id', async (req,res) => {
    const { id } = req.params;


    const resultado = await Programa.deletePrograma(id);

    res.send(resultado).status(200);
})

router.put('/:id/actualizar', async (req,res)=> {
    const { id } = req.params;
    const { nombre, id_departamento} = req.body;

    const resultado = await Programa.updatePrograma(id, nombre, id_departamento);

    res.send(resultado).status(200);

})


module.exports = router;