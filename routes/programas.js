const router = require('express').Router();
const { db } = require('../db');
const Programa = require('../db/Programas.js');
const Departamento = require('../db/Departamentos.js');


router.get('/', async (req, res) => {
    const programas = await Programa.getProgramas();


    res.render('pages/programas/index.ejs',{ programas });
})

router.get('/agregar', async (req, res) => {

    const departamentos = await Departamento.getDepartamentos();




    res.render('pages/programas/agregar.ejs',{ departamentos });
})


router.get('/:id/actualizar', async (req, res) => {

    const { id } = req.params;
    const programa = await Programa.getPrograma(id);
    const departamentos = await Departamento.getDepartamentos();

 



    res.render('pages/programas/actualizar.ejs',{ programa, departamentos });
})

router.post('/:id/actualizar', async (req,res)=> {
    const { id } = req.params;
    const { nombre, id_departamento} = req.body;

    const resultado = await Programa.updatePrograma(id, nombre, id_departamento);

    res.redirect('/programas')

})


router.get('/:id', async (req, res) => {
    const { id } = req.params;


    const ProgramaInfo = await Programa.getPrograma(id);

    res.send(ProgramaInfo).status(200);

    
})




router.post('/', async (req, res)  => {

    const { nombre, id_departamento } = req.body

    const resultado = await Programa.addPrograma(nombre, id_departamento);

    res.redirect('/programas')


})


router.get('/:id/eliminar', async (req,res) => {
    const { id } = req.params;


    const resultado = await Programa.deletePrograma(id);

    res.redirect('/programas')
})



module.exports = router;