const { db } = require('../db');


const getEstudiantes = async () => {
    const query = `SELECT Estudiante.nombre,
    ProgramaAcademico.nombre AS programa,
    Periodo.descripcion AS periodo_ingreso
    FROM Estudiante,
    PlanDeEstudio,
    ProgramaAcademico,
    Periodo
    WHERE Estudiante.id_plan_de_estudio = PlanDeEstudio.id AND 
    PlanDeEstudio.id_programa_academico = ProgramaAcademico.id AND 
    Estudiante.id_periodo_ingreso = Periodo.id; `;

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

const getEstudiante = async (id) => {
    const query = `SELECT Asignatura.nombre AS asignatura,
       Docente.nombre AS docente,
       Salon.nombre AS salon
        FROM Estudiante,
       Matricula,
       Curso,
       Asignatura,
       Docente,
       Salon
        WHERE Estudiante.id = Matricula.id_estudiante AND 
       Matricula.id_curso = Curso.id AND 
       Curso.id_asignatura = Asignatura.id AND 
       Curso.id_docente = Docente.id AND 
       Curso.id_salon = Salon.id AND 
       Estudiante.id = ${id};`;

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

const addEstudiante = async (nombre, id_plan_de_estudio, id_periodo_ingreso) => {


    return new Promise((resolve, reject)=> {

        let query = 'INSERT INTO Estudiante (nombre, id_plan_de_estudio, id_periodo_ingreso) values (?,?,?);'

        const params = [nombre, id_plan_de_estudio, id_periodo_ingreso]
        

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
const deleteEstudiante = async (id) => {
    return new Promise ((resolve,reject) => {
        let query = 'DELETE FROM Estudiante WHERE id =?;'
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

const updateEstudiante = async (id, nombre, id_plan_de_estudio, id_periodo_ingreso) => {
    const query = `UPDATE Estudiante
        SET nombre = ?,
        id_plan_de_estudio = ?,
        id_periodo_ingreso = ?
        WHERE id = ?;`;
    const params = [nombre, id_plan_de_estudio, id_periodo_ingreso, id]
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
    getEstudiantes,
    getEstudiante,
    addEstudiante,
    deleteEstudiante,
    updateEstudiante

}