const router = require('express').Router();
const { db } = require('../db');
const Departamento = require('../db/Departamentos.js');

router.get('/', async (req, res) => {
    const Departamentos = await Departamento.getDepartamentos();

    res.send(Departamentos)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;


    const DepartamentoInfo = await Departamento.getDepartamento(id);

    res.send(DepartamentoInfo).status(200);

    
})

router.post('/', async (req, res)  => {

    const { nombre } = req.body

    const resultado = await Departamento.addDepartamento(nombre);

    res.send(resultado).status(200)


})



router.delete('/:id', async (req,res) => {
    const { id } = req.params;


    const resultado = await Departamento.deleteDepartamento(id);

    res.send(resultado).status(200);
})

router.put('/:id/actualizar', async (req,res)=> {
    const { id } = req.params;
    const { nombre } = req.body;

    const resultado = await Departamento.updateDepartamento(id, nombre);

    res.send(resultado).status(200);

})

module.exports = router;


