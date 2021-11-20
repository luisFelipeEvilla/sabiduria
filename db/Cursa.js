const { db } = require('../db');


const addAsignaturaSemestre = async (id_semestre, id_asignatura) => {


    return new Promise((resolve, reject)=> {


        let query = 'INSERT INTO Cursa (id_semestre, id_asignatura) VALUES(?, ?);'
        const params = [id_semestre,id_asignatura]

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

const deleteAsignaturaSemestre = async (id_semestre, id_asignatura) => {

    return new Promise((resolve, reject)=> {

        let query = 'DELETE FROM Contiene WHERE id_semestre = ? AND id_asignatura = ?;'
        const params = [id_semestre,id_asignatura]

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
    addAsignaturaSemestre,
    deleteAsignaturaSemestre
}