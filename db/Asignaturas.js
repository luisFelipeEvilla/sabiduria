const { db } = require('../db');


const getAsignaturas = async () => {
    const query = `SELECT * FROM Asignatura;`;

    return new Promise((resolve, reject) => {

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

const getAsignatura = async (id) => {
    let query = `SELECT Curso.id,
    Docente.nombre
    FROM Asignatura,
    Curso,
    Docente
    WHERE Asignatura.id = Curso.id_asignatura AND 
    Curso.id_docente = Docente.id AND 
    Asignatura.id = ${id};`;

    return new Promise((resolve, reject)=> {
        db.serialize(() => {
            db.all(query, (err, rows) => {
                if (err) {
                    console.log(err.message);
                }
                const cursos = rows
                let query = `SELECT Departamento.nombre
                     FROM Asignatura,
                     Contiene,
                     Departamento
                     WHERE Departamento.id = Contiene.id_departamento AND 
                     Asignatura.id = Contiene.id_asignatura AND 
                     Asignatura.id = ${id};`;
                db.all(query, (err, rows) => {
                    if (err) {
                        console.log(err.message);
                    }

                    const departamentos = rows

                    resolve({cursos, departamentos})


                })
            })

        })


    })
}


const addAsignatura = async (nombre) => {


    return new Promise((resolve, reject)=> {

        let query = 'INSERT INTO Asignatura (nombre) VALUES(?);'
        const params = nombre

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

const deleteAsignatura = async (id) => {
    return new Promise ((resolve,reject) => {
        let query = 'DELETE FROM Asignatura WHERE id =?;'
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


const updateAsignatura = async (id, nombre) => {
    const query = `UPDATE Asignatura set nombre=? WHERE id=?;`;
    const params = [nombre, id]
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
    getAsignaturas,
    getAsignatura,
    addAsignatura,
    deleteAsignatura,
    updateAsignatura

}