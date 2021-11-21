const { db } = require('../db');


const getPlanEstudios = async () => {
    const query = `SELECT PlanDeEstudio.id,
    strftime('%Y', PlanDeEstudio.ano) as ano,
    ProgramaAcademico.nombre as programa
    FROM PlanDeEstudio,
    ProgramaAcademico
    WHERE PlanDeEstudio.id_programa_academico = ProgramaAcademico.id;`;

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

const getPlanEstudio = async (id) => {
    const query = `SELECT Semestre.numero,
        Semestre.id,
        Asignatura.nombre as asignatura
        FROM PlanDeEstudio,
        Semestre,
        Asignatura,
        Cursa
        WHERE PlanDeEstudio.id = Semestre.id_plan_de_estudio AND 
        Asignatura.id = Cursa.id_asignatura AND 
        Semestre.id = Cursa.id_semestre AND 
        PlanDeEstudio.id = ${id};`;

    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(query, (err, rows) => {
                if (err) {
                    console.log(err.message);
                }
                const semestres = rows
                let query = `SELECT Estudiante.nombre
                         FROM PlanDeEstudio,
                         Estudiante
                         WHERE PlanDeEstudio.id = Estudiante.id_plan_de_estudio AND 
                         PlanDeEstudio.id = ${id};`;
                db.all(query, (err, rows) => {
                    if (err) {
                        console.log(err.message);
                    }

                    const estudiantes = rows

                    let query = `SELECT * FROM PlanDeEstudio WHERE id = ${id};`;

                    db.all(query, (err, rows) => {
                        if (err) {
                            console.log(err.message);
                        }

                        const planestudio = rows
                        resolve({ semestres, estudiantes, planestudio })
                    })
                })
            })

        })


    })
}

const getAsignaturasDisponibles = async (id_plan_de_estudio, id_departamento) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT a.nombre,
            a.id
        FROM Asignatura a
            INNER JOIN
            Contiene c ON (a.id = c.id_asignatura) 
            INNER JOIN
            Departamento d ON (c.id_departamento = d.id) 
            INNER JOIN ProgramaAcademico pr ON (pr.id_departamento = d.id)
            INNER JOIN PlanDeEstudio pl ON (pl.id_programa_academico = pr.id)
        WHERE pl.id = ?
        EXCEPT
        SELECT a.nombre, a.id FROM PlanDeEstudio p
        INNER JOIN Semestre s on (s.id_plan_de_estudio = p.id)
        INNER JOIN Cursa cu on (cu.id_semestre = s.id)
        INNER JOIN Asignatura a on (cu.id_asignatura = a.id)
        WHERE p.id = ?;`

        const params = [id_plan_de_estudio, id_plan_de_estudio];

        db.serialize(() => {
            db.all(query, params, (err, rows) => {
                if (err) {
                    console.log(err.message)
                    reject(console.log('Error creando el recurso.'))
                }
                resolve(rows)
            })
        })
    })
}

const addPlanEstudio = async (ano, id_programa_academico) => {


    return new Promise((resolve, reject) => {

        let query = 'INSERT INTO PlanDeEstudio (ano, id_programa_academico) VALUES(Date(?) , ?);'
        const params = [ano, id_programa_academico];

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

const deletePlanEstudio = async (id) => {
    return new Promise((resolve, reject) => {
        let query = 'DELETE FROM PlanDeEstudio WHERE id =?;'
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

const updatePlanEstudio = async (id, ano, id_programa_academico) => {
    const query = `UPDATE PlanDeEstudio set ano=?, id_programa_academico=? WHERE id=?;`;
    const params = [ano, id_programa_academico, id]
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


module.exports = {
    getPlanEstudios,
    getPlanEstudio,
    getAsignaturasDisponibles,
    addPlanEstudio,
    deletePlanEstudio,
    updatePlanEstudio
}