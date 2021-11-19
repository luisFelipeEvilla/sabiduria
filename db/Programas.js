const { db } = require('../db');


const getProgramas= async () => {
    const query = `SELECT ProgramaAcademico.id,
    ProgramaAcademico.nombre,
    Departamento.nombre as departamento
    FROM ProgramaAcademico,
    Departamento
    WHERE ProgramaAcademico.id_departamento = Departamento.id;`;

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

const getPrograma = async (id) => {
    const query =`SELECT PlanDeEstudio.id,
    strftime('%Y', PlanDeEstudio.ano) as ano
    FROM ProgramaAcademico,
    PlanDeEstudio
    WHERE ProgramaAcademico.id = PlanDeEstudio.id_programa_academico
    AND ProgramaAcademico.id = ${id};`;

    return new Promise ((resolve, reject)=>{

        db.serialize(() => {
            db.all(query, (err, rows) => {
                if (err) {
                    console.log(err.message);
                }
                const planestudios = rows
                let query = `SELECT * From ProgramaAcademico WHERE id =${id} `
                db.all(query, (err, rows) => {
                    if (err) {
                        console.log(err.message);
                    }
    
                    const programa = rows
                    resolve({planestudios, programa})
    

                })

            });
        })

    })
}


const addPrograma = async (nombre, id_departamento) => {


    return new Promise((resolve, reject)=> {

        let query = 'INSERT INTO ProgramaAcademico (nombre, id_departamento) VALUES(?,?);'
        const params = [nombre, id_departamento];

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


const deletePrograma = async (id) => {
    return new Promise ((resolve,reject) => {
        let query = 'DELETE FROM ProgramaAcademico WHERE id =?;'
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


const updatePrograma = async (id, nombre, id_departamento) => {
    const query = `UPDATE ProgramaAcademico set nombre=?, id_departamento=? WHERE id=?;`;
    const params = [nombre,id_departamento, id]
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


const updateDepartamento = async (id, id_departamento) => {
    const query = `UPDATE ProgramaAcademico set id_departamento=? WHERE id=?;`;
    const params = [id_departamento, id]
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
    getProgramas,
    getPrograma,
    addPrograma,
    deletePrograma,
    updatePrograma,
    updateDepartamento

}