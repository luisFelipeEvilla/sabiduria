const router = require('express').Router();
const Docente = require('../db/Docentes');

router.get('/', async (req, res) => {
    const docente = await Docente.getDocente(2);

    console.log(res.id);
    
    res.render('pages/docentes/home.ejs', { docente });
})

module.exports = router;