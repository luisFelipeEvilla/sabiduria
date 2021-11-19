const { db } = require('../db');


const getHorarios = async () => {
    const query = `SELECT Horario.id,
    Horario.dia,
    Horario.hora_inicio,
    Horario.hora_fin,
    Asignatura.nombre as asignatura,
    Salon.nombre as salon
    FROM Horario,
    Curso,
    Asignatura,
    Salon
    WHERE Horario.id_curso = Curso.id AND 
    Asignatura.id = Curso.id_asignatura AND 
    Salon.id = Curso.id_salon;`;

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

const getHorario = async (id) => {
    const query = `SELECT * FROM Horario WHERE id = ${id}`;

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

const addHorario = async (dia, hora_inicio, hora_fin, id_curso) => {


    return new Promise((resolve, reject)=> {

        let query = 'INSERT INTO Horario (dia, hora_inicio, hora_fin, id_curso) values (?,?,?,?);'

        const params = [dia, hora_inicio, hora_fin, id_curso]
        

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

const deleteHorario = async (id) => {
    return new Promise ((resolve,reject) => {
        let query = 'DELETE FROM Horario WHERE id =?;'
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

const updateHorario = async (id, dia, hora_inicio, hora_fin, id_curso) => {
    const query = `UPDATE Horario set dia=?, hora_inicio=? , hora_fin=?, id_curso=? WHERE id=?;`;
    const params = [dia, hora_inicio, hora_fin, id_curso, id]
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
    getHorarios,
    getHorario,
    addHorario,
    deleteHorario,
    updateHorario
}