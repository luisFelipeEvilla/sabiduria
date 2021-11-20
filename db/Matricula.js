const { db } = require('../db');


const addCursoEstudiante = async (id_curso, id_estudiante, id_periodo) => {


    return new Promise((resolve, reject)=> {


        let query = 'INSERT INTO Matricula (id_curso, id_estudiante, id_periodo) VALUES(?, ?, ?);'
        const params = [id_curso,id_estudiante,id_periodo]

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

const deleteCursoEstudiante = async (id_curso, id_estudiante, id_periodo) => {

    return new Promise((resolve, reject)=> {

        let query = 'DELETE FROM Matricula WHERE id_curso = ? AND id_estudiante = ? AND id_periodo =?;'
        const params = [id_curso, id_estudiante, id_periodo]

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
    addCursoEstudiante,
    deleteCursoEstudiante
}