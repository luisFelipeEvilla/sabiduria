const { db } = require('../db');


const addAsignaturaDepartamento = async (id_departamento, id_asignatura) => {


    return new Promise((resolve, reject)=> {


        let query = 'INSERT INTO Contiene (id_departamento, id_asignatura) VALUES(?, ?);'
        const params = [id_departamento,id_asignatura]

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

const deleteAsignaturaDepartamento = async (id_departamento, id_asignatura) => {

    return new Promise((resolve, reject)=> {

        let query = 'DELETE FROM Contiene WHERE id_departamento = ? AND id_asignatura = ?;'
        const params = [id_departamento,id_asignatura]

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

module.exports = {
    addAsignaturaDepartamento,
    deleteAsignaturaDepartamento
}