const router = require('express').Router();
const { db } = require('../db');
const Semestre = require('../db/Semestres.js');


router.get('/', async (req, res) => {




    res.render('pages/admin.ejs')
})



module.exports = router;