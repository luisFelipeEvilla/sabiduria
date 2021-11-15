const { db } = require('../db');


const getPlanEstudios= async () => {
    const query = `SELECT * FROM PlanDeEstudio`;

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

const getPlanEstudio = async (id) => {
        const query =`SELECT Semestre.numero
        FROM PlanDeEstudio,
        Semestre
        WHERE PlanDeEstudio.id = Semestre.id_plan_de_estudio AND 
        PlanDeEstudio.id = ${id};`;
    
        return new Promise((resolve, reject)=> {
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
    
                        resolve({semestres, estudiantes})
    
    
                    })
                })
    
            })
    
    
        })
}

const addPlanEstudio = async (ano, id_programa_academico) => {


    return new Promise((resolve, reject)=> {

        let query = 'INSERT INTO PlanDeEstudio (ano, id_programa_academico) VALUES(Date(?) , ?);'
        const params = [ano, id_programa_academico];

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

const deletePlanEstudio = async (id) => {
    return new Promise ((resolve,reject) => {
        let query = 'DELETE FROM PlanDeEstudio WHERE id =?;'
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

const updatePlanEstudio = async (id, ano, id_programa_academico) => {
    const query = `UPDATE PlanDeEstudio set ano=?, id_programa_academico=? WHERE id=?;`;
    const params = [ano, id_programa_academico, id]
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
    getPlanEstudios,
    getPlanEstudio,
    addPlanEstudio,
    deletePlanEstudio,
    updatePlanEstudio
}