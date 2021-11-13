const { db } = require('../db');



const getDocentes= async () => {
    const query = `SELECT Docente.id,
    Docente.nombre,
    Departamento.nombre as departamento
    FROM Docente,
    Departamento
    WHERE Docente.id_departamento = Departamento.id;`;

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

const getDocente = async (id) => {
    let query = `SELECT Docente.id,
    Asignatura.nombre AS asignatura,
    Curso.id AS idcurso
    FROM Docente,
    Asignatura,
    Curso
    WHERE Docente.id = Curso.id_docente AND 
    Asignatura.id = Curso.id_asignatura AND 
    Docente.id =${id};`;

    return new Promise((resolve, reject)=> {
        db.serialize(() => {
            db.all(query, (err, rows) => {
                if (err) {
                    console.log(err.message);
                }
                resolve(rows)


            })

        })


    })
}

const addDocente = async (nombre, id_departamento) => {


    return new Promise((resolve, reject)=> {

        let query = 'INSERT INTO Docente (nombre, id_departamento) VALUES(?, ?);'
        const params = [nombre, id_departamento]

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


const deleteDocente = async (id) => {
    return new Promise ((resolve,reject) => {
        let query = 'DELETE FROM Docente WHERE id =?;'
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

const updateDocente = async (id, nombre, id_departamento) => {
    const query = `UPDATE Docente set nombre=?, id_departamento=? WHERE id=?;`;
    const params = [nombre, id_departamento, id]
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
    getDocentes,
    getDocente,
    addDocente,
    deleteDocente,
    updateDocente

}