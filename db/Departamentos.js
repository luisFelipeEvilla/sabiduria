const { db } = require('../db');



const getDepartamentos = async () => {
    const query = `SELECT 
    *
    FROM Departamento d;`;

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
const addDepartamento = async (nombre) => {


    return new Promise((resolve, reject)=> {

        let query = 'INSERT INTO Departamento (nombre) VALUES(?);'
        const params = nombre

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

const deleteDepartamento = async (id) => {
    return new Promise ((resolve,reject) => {
        let query = 'DELETE FROM Departamento WHERE id =?;'
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

const updateDepartamento = async (id, nombre) => {
    const query = `UPDATE Departamento set nombre=? WHERE id=?;`;
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

const getDepartamento = async (id) => {
    let query = `SELECT 
    d.nombre
    FROM Docente d
    INNER JOIN Departamento de
    ON (d.id_departamento = de.id)
    WHERE de.id=${id};`;

    return new Promise((resolve, reject)=> {
        db.serialize(() => {
            db.all(query, (err, rows) => {
                if (err) {
                    console.log(err.message);
                }
                const docentes = rows
                let query = `SELECT a.nombre
                    FROM Asignatura a
                    INNER JOIN
                    Contiene c ON (a.id = c.id_asignatura) 
                    INNER JOIN
                    Departamento d ON (c.id_departamento = d.id) 
                    WHERE d.id = ${id};`;
                db.all(query, (err, rows) => {
                    if (err) {
                        console.log(err.message);
                    }

                    const asignaturas = rows

                    resolve({docentes, asignaturas})


                })
            })

        })


    })
}




module.exports = {
    getDepartamentos,
    getDepartamento,
    addDepartamento,
    deleteDepartamento,
    updateDepartamento
}