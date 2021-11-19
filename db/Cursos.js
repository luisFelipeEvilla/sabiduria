const { db } = require('../db');

const getCursos = async () => {
    const query = `SELECT Curso.id, Asignatura.nombre AS asignatura,
    Docente.nombre AS docente,
    Salon.nombre AS salon
    FROM Curso,
    Asignatura,
    Docente,
    Salon
    WHERE Curso.id_asignatura = Asignatura.id AND 
    Curso.id_docente = Docente.id AND 
    Curso.id_salon = Salon.id;`;

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


const getCurso = async (id) => {
    const query =`SELECT Estudiante.nombre
    FROM Curso,
         Estudiante,
         Matricula
   WHERE Curso.id = Matricula.id_curso AND 
         Matricula.id_estudiante = Estudiante.id AND 
         Curso.id = ${id};`;

    return new Promise((resolve, reject)=> {
        db.serialize(() => {
            db.all(query, (err, rows) => {
                if (err) {
                    console.log(err.message);
                }
                const estudiantes = rows
                let query = `SELECT Horario.dia,
                Horario.hora_inicio,
                Horario.hora_fin
                FROM Curso,
                Horario
                WHERE Horario.id_curso = Curso.id AND 
                Curso.id = ${id};`;
                db.all(query, (err, rows) => {
                    if (err) {
                        console.log(err.message);
                    }

                    const horarios = rows
                    let query = `SELECT * FROM Curso WHERE id = ${id};`;

                    db.all(query, (err, rows) => {
                        if (err) {
                            console.log(err.message);
                        }

                        const curso = rows
                        resolve({estudiantes, horarios, curso})
                    })

                    


                })
            })

        })


    })
}

const addCurso = async (id_asignatura, id_docente, id_salon) => {


    return new Promise((resolve, reject)=> {

        let query = 'INSERT INTO Curso (id_asignatura, id_docente, id_salon) values (?,?,?);'

        const params = [id_asignatura, id_docente, id_salon]
        

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

const deleteCurso = async (id) => {
    return new Promise ((resolve,reject) => {
        let query = 'DELETE FROM Curso WHERE id =?;'
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

const updateCurso = async (id, id_asignatura, id_docente, id_salon) => {
    const query = `UPDATE Curso set id_asignatura=?, id_docente=? , id_salon=? WHERE id=?;`;
    const params = [id_asignatura, id_docente, id_salon, id]
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

const updateDocente = async (id, id_docente) => {
    const query = `UPDATE Curso set id_docente=? WHERE id=?;`;
    const params = [id_docente, id]
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
    getCursos,
    getCurso,
    addCurso,
    deleteCurso,
    updateCurso,
    updateDocente
}