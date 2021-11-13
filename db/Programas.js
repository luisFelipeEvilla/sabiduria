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


module.exports = {
    getProgramas,


}