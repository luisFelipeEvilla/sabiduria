const { db } = require('../db');


const getEstudiantes = async () => {
    const query = `SELECT * FROM Estudiante`;

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
    getEstudiantes
    
}