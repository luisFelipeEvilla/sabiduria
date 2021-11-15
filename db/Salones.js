const { db } = require('../db');

const getSalones = async () => {
    const query = `SELECT * FROM Salon`;

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

const getSalon = async (id) => {
    const query =`
    SELECT Curso.id,
       Asignatura.nombre as asignatura,
       Docente.nombre as docente
        FROM Salon,
       Curso,
       Asignatura,
       Docente
        WHERE Salon.id = Curso.id_salon AND 
       Curso.id_asignatura = Asignatura.id AND 
       Curso.id_docente = Docente.id AND 
       Salon.id = ${id};`;

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

const addSalon = async (nombre) => {


    return new Promise((resolve, reject)=> {

        let query = 'INSERT INTO Salon (nombre) values (?);'

        params = nombre;
        

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

const deleteSalon = async (id) => {
    return new Promise ((resolve,reject) => {
        let query = 'DELETE FROM Salon WHERE id =?;'
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


const updateSalon = async (id, nombre) => {
    const query = `UPDATE Salon set nombre=? WHERE id=?;`;
    const params = [nombre, id]
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
    getSalones,
    getSalon,
    addSalon,
    deleteSalon,
    updateSalon
    
}