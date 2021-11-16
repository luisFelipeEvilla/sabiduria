const express = require('express');
const chalk = require('chalk');
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





const app = express();



app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use('/departamentos', departamentos);
app.use('/docentes', docentes);
app.use('/asignaturas', asignaturas);
app.use('/programas', programas);
app.use('/planestudios', planestudios);
app.use('/semestres', semestres);
app.use('/estudiantes', estudiantes);
app.use('/salones', salones);
app.use('/cursos', cursos);
app.use('/horarios', horarios);
app.use('/periodos', periodos);

const PORT = 3000;

app.listen(PORT, (err) => {
    if (err) {
        console.log(`Ocurrio un error inicializando el servidor \n ${err}`);
        process.exit(-1)
    } else {
        console.log(`Servidor inicializado correctamente en el puerto ${PORT}`);
    }
})