const { db } = require('../db');


const getSemestres = async () => {
    const query = `SELECT * FROM Semestre`;

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

const getSemestre = async (id) => {
    const query =`
    SELECT Semestre.id, Asignatura.nombre
      FROM Semestre,
           Cursa,
           Asignatura
     WHERE Semestre.id = Cursa.id_semestre AND 
           Asignatura.id = Cursa.id_asignatura AND 
           Semestre.id =${id};`;

    return new Promise ((resolve, reject)=>{

        db.serialize(() => {
            db.all(query, (err, rows) => {
                if (err) {
                    console.log(err.message);
                }
                const asignaturas = rows;
                let query = `SELECT * From Semestre WHERE id =${id} `
                db.all(query, (err, rows) => {
                    if (err) {
                        console.log(err.message);
                    }
    
                    const semestre = rows
                    resolve({asignaturas, semestre})
    

                })
            });
        })

    })
}

const addSemestre = async (numero, id_plan_de_estudio) => {


    return new Promise((resolve, reject)=> {

        let query = 'INSERT INTO Semestre (numero, id_plan_de_estudio) VALUES(?,?);'
        const params = [numero, id_plan_de_estudio];

        db.serialize(() =>{
            db.run(query, params, (err, rows)  =>{
                if (err) {
                    console.log(err.message)
                    reject(console.log('Error creando el recurso.'))
                }
                let query = `SELECT * From Semestre WHERE numero =${numero} AND id_plan_de_estudio =${id_plan_de_estudio};`
                db.all(query, (err, rows) => {
                    if (err) {
                        console.log(err.message);
                    }
    
                    const semestre = rows
                    resolve(semestre)
    

                })

                
            })
        })

    })
}

const deleteSemestre = async (id) => {
    return new Promise ((resolve,reject) => {
        let query = 'DELETE FROM Semestre WHERE id =?;'
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
const updateSemestre = async (id, numero, id_plan_de_estudio) => {
    const query = `UPDATE Semestre set numero=?, id_plan_de_estudio=? WHERE id=?;`;
    const params = [numero, id_plan_de_estudio, id]
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
    getSemestres,
    getSemestre,
    addSemestre,
    deleteSemestre,
    updateSemestre
    
}