const express = require('express');
const chalk = require('chalk');
const cookieParser = require('cookie-parser');

const departamentos = require('./routes/departamentos');
const docentes = require('./routes/docentes');
const asignaturas = require('./routes/asignaturas');
const programas = require('./routes/programas');
const planestudios = require('./routes/planEstudios');
const semestres = require('./routes/semestres');
const estudiantes = require('./routes/estudiantes');
const salones = require('./routes/salones');
const cursos = require('./routes/cursos');
const horarios = require('./routes/horarios');
const periodos = require('./routes/periodos');
const admin = require('./routes/admin');
const homeDocente = require('./routes/home');
const login = require('./routes/login');
const { auth, isAdmin } = require('./middlewares/auth');

const app = express();

app.set('view engine','ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cookieParser());

app.use('/departamentos', auth, departamentos);
app.use('/docentes', auth, docentes);
app.use('/asignaturas', auth, asignaturas);
app.use('/programas', auth, programas);
app.use('/planestudios', auth, planestudios);
app.use('/semestres', auth, semestres);
app.use('/estudiantes', auth, estudiantes);
app.use('/salones', auth, salones);
app.use('/cursos', auth, cursos);
app.use('/horarios', auth, horarios);
app.use('/periodos', auth, periodos);
app.use('/admin', auth, isAdmin, admin);
app.use('/login', login);
app.use('/', auth, homeDocente );

const PORT = 3000;

app.listen(PORT, (err) => {
    if (err) {
        console.log(`Ocurrio un error inicializando el servidor \n ${err}`);
        process.exit(-1)
    } else {
        console.log(`Servidor inicializado correctamente en el puerto ${PORT}`);
    }
})