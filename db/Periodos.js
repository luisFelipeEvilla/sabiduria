const { db } = require('../db');



const getPeriodos = async () => {
    const query = `SELECT * FROM Periodo`;

    return new Promise ((resolve, reject)=>{

        db.serialize(() => {
            db.all(query, (err, rows) => {
                if (err) {
                    console.log(err.message);
                }
                resolve(rows)
            });
        })

    })
}


const getPeriodo = async (id) => {
    const query =`SELECT Estudiante.nombre
    FROM Periodo,
         Estudiante
   WHERE Periodo.id = Estudiante.id_periodo_ingreso AND 
         Periodo.id = ${id};`;

    return new Promise((resolve, reject)=> {
        db.serialize(() => {
            db.all(query, (err, rows) => {
                if (err) {
                    console.log(err.message);
                }
                const nuevos_ingresos = rows
                let query = `SELECT Estudiante.nombre AS estudiante,
                Asignatura.nombre AS asignatura,
                Docente.nombre AS docente
                FROM Periodo,
                Curso,
                Matricula,
                Asignatura,
                Docente,
                Estudiante
                WHERE Periodo.id = Matricula.id_periodo AND 
                Curso.id = Matricula.id_curso AND 
                Curso.id_asignatura = Asignatura.id AND 
                Curso.id_docente = Docente.id AND 
                Matricula.id_estudiante = Estudiante.id AND 
                Periodo.id = ${id};`;
                db.all(query, (err, rows) => {
                    if (err) {
                        console.log(err.message);
                    }
                
                    const cursos = rows

                    resolve({nuevos_ingresos, cursos})


                })
            })

        })


    })
}

const addPeriodo = async (descripcion) => {


    return new Promise((resolve, reject)=> {

        let query = 'INSERT INTO Periodo (descripcion) values (?);'

        const params = [descripcion]
        

        db.serialize(() =>{
            db.run(query, params, (err, rows)  =>{
                if (err) {
                    console.log(err.message)
                    reject(console.log('Error creando el recurso.'))
                }
                resolve(rows)
                
            })
        })

    })
}

const deletePeriodo = async (id) => {
    return new Promise ((resolve,reject) => {
        let query = 'DELETE FROM Periodo WHERE id =?;'
        const params = id

        db.serialize(() =>{
            db.run(query, params, (err, rows)  =>{
                if (err) {
                    console.log(err.message)
                    reject(console.log('Error eliminando el recurso.'))
                }
                resolve(rows)
                
            })
        })
    })
}

const updatePeriodo = async (id, descripcion) => {
    const query = `UPDATE Periodo set descripcion=? WHERE id=?;`;
    const params = [descripcion, id]
    return new Promise ((resolve,reject) => {
        db.serialize(() =>{
            db.run(query, params, (err, rows)  =>{
                if (err) {
                    console.log(err.message)
                    reject(console.log('Error actualizando el recurso.'))
                }
                resolve(rows)
                
            })
        })

    })


}


module.exports = {
    getPeriodos,
    getPeriodo,
    addPeriodo,
    deletePeriodo,
    updatePeriodo
}