const { db } = require('../db');

const getListaAsistencia = async (id_sesion) => {
    const query = `Select Estudiante.nombre, id_estudiante, id_sesion, codigo_salon, asistencia 
    FROM Asistencia, Estudiante 
    WHERE id_sesion = ${id_sesion} 
    AND Estudiante.id = id_estudiante;`;


    
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.all(query, (err, rows) => {
                    if (err) {
                        console.log(err.message);
                    }
                    
                    resolve(rows);
                })
            })
        })
}

module.exports = {
    getListaAsistencia

}