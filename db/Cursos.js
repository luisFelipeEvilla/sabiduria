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
    const query =`SELECT Estudiante.nombre, Estudiante.id
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
                let query = `SELECT Horario.id, Horario.dia, 
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

const updateAsignatura = async (id, id_asignatura) => {
    const query = `UPDATE Curso set id_asignatura=? WHERE id=?;`;
    const params = [id_asignatura, id]
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

const getCodigoDocente = async (id) => {
    let query = `SELECT s.codigo_docente, s.expiracion, s.id
        FROM Curso c
            INNER JOIN
            Horario h ON (h.id_curso = c.id) 
            INNER JOIN
            Sesion s ON (s.id_horario = h.id) 
        WHERE c.id = ${id}
        ORDER BY s.expiracion DESC LIMIT 1`;

    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get(query, (err, rows) => {
                if (err) {
                    console.log(err.message);
                }
                console.log(rows)
                resolve(rows);
            })
        })
    })
}

const getIDSesion = async (id) => {
    let query = `SELECT s.codigo_docente, s.expiracion, s.id
        FROM Curso c
            INNER JOIN
            Horario h ON (h.id_curso = c.id) 
            INNER JOIN
            Sesion s ON (s.id_horario = h.id) 
        WHERE h.id = ${id}
        ORDER BY s.expiracion DESC LIMIT 1`;

    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get(query, (err, rows) => {
                if (err) {
                    console.log(err.message);
                }
                console.log(rows)
                resolve(rows);
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
    updateDocente,
    updateAsignatura,
    getCodigoDocente,
    getIDSesion
}