const express = require('express');
const chalk = require('chalk');
const departamentos = require('./routes/departamentos');
const docentes = require('./routes/docentes');
const asignaturas = require('./routes/asignaturas');
const programas = require('./routes/programas');





const app = express();



app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use('/departamentos', departamentos);
app.use('/docentes', docentes);
app.use('/asignaturas', asignaturas);
app.use('/programas', programas);

const PORT = 3000;

app.listen(PORT, (err) => {
    if (err) {
        console.log(`Ocurrio un error inicializando el servidor \n ${err}`);
        process.exit(-1)
    } else {
        console.log(`Servidor inicializado correctamente en el puerto ${PORT}`);
    }
})