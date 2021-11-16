const router = require('express').Router();
const { db } = require('../db');
const Horario = require('../db/Horarios.js');



router.get('/', async (req, res) => {


    const Horarios = await Horario.getHorarios();

    res.send(Horarios)
})


router.post('/', async (req, res)  => {

    const {dia, hora_inicio, hora_fin, id_curso } = req.body

    const resultado = await Horario.addHorario(dia, hora_inicio, hora_fin, id_curso);

    res.send(resultado).status(200)
})

router.delete('/:id', async (req,res) => {
    const { id } = req.params;


    const resultado = await Horario.deleteHorario(id);

    res.send(resultado).status(200);
})

router.put('/:id/actualizar', async (req,res)=> {
    const { id } = req.params;
    const { dia, hora_inicio, hora_fin, id_curso } = req.body

    const resultado = await Horario.updateHorario(id, dia, hora_inicio, hora_fin, id_curso);

    res.send(resultado).status(200);

})
module.exports = router;