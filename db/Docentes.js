const { db } = require('../db');
const { v4: uuidv4 } = require('uuid');
const Cursos = require('../db/Cursos');

const getDocentes = async () => {
    const query = `SELECT Docente.id,
    Docente.nombre,
    Departamento.nombre as departamento
    FROM Docente,
    Departamento
    WHERE Docente.id_departamento = Departamento.id;`;

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

const getDocente = async (id) => {
    let query = `SELECT 
    Asignatura.nombre AS asignatura,
    Curso.id ,
    Salon.nombre as salon
    FROM Docente,
    Asignatura,
    Curso,
    Salon
    WHERE Docente.id = Curso.id_docente AND 
    Asignatura.id = Curso.id_asignatura AND 
    Salon.id = Curso.id_salon AND
    Docente.id =${id};`;

    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(query, (err, rows) => {
                if (err) {
                    console.log(err.message);
                }
                const cursos = rows

                let query = `SELECT * FROM Docente WHERE id =${id}; `
                db.all(query, (err, rows) => {
                    if (err) {
                        console.log(err.message);
                    }

                    const docente = rows

                    resolve({ cursos, docente })
                })
            })
        })
    })
}

const getCredenciales = async (usuario) => {
    const query = `SELECT 
        d.usuario,
        d.contrasena,
        d.rol
    FROM Docente d
    WHERE
    d.usuario = ?;`;
    const params = [usuario]

    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get(query, params, (err, rows) => {
                if (err) {
                    console.log(err.message);
                }
                
                resolve(rows);
            })
        })
    })
}

const addDocente = async (nombre, id_departamento) => {
    return new Promise((resolve, reject) => {

        let query = 'INSERT INTO Docente (nombre, id_departamento) VALUES(?, ?);'
        const params = [nombre, id_departamento]

        db.serialize(() => {
            db.run(query, params, (err, rows) => {
                if (err) {
                    console.log(err.message)
                    reject(console.log('Error creando el recurso.'))
                }
                resolve(rows)

            })
        })
    })
}

const deleteDocente = async (id) => {
    return new Promise((resolve, reject) => {
        let query = 'DELETE FROM Docente WHERE id =?;'
        const params = id

        db.serialize(() => {
            db.run(query, params, (err, rows) => {
                if (err) {
                    console.log(err.message)
                    reject(console.log('Error eliminando el recurso.'))
                }
                resolve(rows)

            })
        })
    })
}

const updateDocente = async (id, nombre, id_departamento) => {
    const query = `UPDATE Docente set nombre=?, id_departamento=? WHERE id=?;`;
    const params = [nombre, id_departamento, id]
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(query, params, (err, rows) => {
                if (err) {
                    console.log(err.message)
                    reject(console.log('Error actualizando el recurso.'))
                }
                resolve(rows)

            })
        })

    })
}

const updateDepartamento = async (id, id_departamento) => {
    const query = `UPDATE Docente set id_departamento=? WHERE id=?;`;
    const params = [id_departamento, id]
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(query, params, (err, rows) => {
                if (err) {
                    console.log(err.message)
                    reject(console.log('Error actualizando el recurso.'))
                }
                resolve(rows)

            })
        })

    })
}

const createCodes = async (id, id_curso) => {

    return new Promise((resolve, reject) => {
        const codigoDocente = uuidv4();

        const ahora = new Date();
        const expiracion = new Date(ahora);
        expiracion.setMinutes(ahora.getMinutes() + 20);

        const query = `INSERT INTO Sesion (id_horario, codigo_docente, expiracion) VALUES (?, ?, ?)`
        const params = [1, codigoDocente, expiracion];

        db.serialize(() => {
            db.run(query, params, async (err, rows) => {
                if (err) {
                    console.log(err.message)
                    reject(console.log('Error creando el código de sesión.'))
                }

                const query = `SELECT id FROM Sesion WHERE codigo_docente = ?`;
                const params = [codigoDocente]

                db.get(query, params, async (err, rows) => {
                    if (err) {
                        console.log(err.message)
                        reject(console.log('Error obteniendo el codigo de la sesión.'))
                    }

                    const curso = await Cursos.getCurso(id_curso);

                    curso.estudiantes.forEach(estudiante => {
                        const codigoAsistencia = uuidv4();

                        const query = `INSERT INTO Asistencia (id_estudiante, id_sesion, asistencia, codigo_salon) VALUES (?, ?, '+', ?)`
                        const params = [estudiante.id, rows.id, codigoAsistencia];

                        db.run(query, params, (err, rows) => {
                            if (err) {
                                console.log(err.message)
                                reject(console.log('Error obteniendo el codigo de la sesión.'))
                            }

                            resolve(rows)
                        })
                    });
                })   
            })
        })
    })
}

module.exports = {
    getDocentes,
    getDocente,
    getCredenciales,
    addDocente,
    deleteDocente,
    updateDocente,
    updateDepartamento,
    createCodes
}