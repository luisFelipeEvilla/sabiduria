const router = require('express').Router();
const Docente = require('../db/Docentes');
const Asignatura = require('../db/Asignaturas');
const Horario = require('../db/Horarios');
const Curso = require('../db/Cursos');
const Estudiante = require('../db/Estudiantes');



router.get('/', async (req, res) => {



    if (res.rol == 'd') {


        const docente = await Docente.getDocente(res.id);

    
        let claseCurso;
        let claseHorario;

        date = new Date();
        datetext = date.toTimeString().split(' ')[0]
        datetext = datetext.substring(0,5);

        const forLoop = async _ => {
    
            for (let i = 0; i < docente.cursos.length; i++) {
                const curso = docente.cursos[i]
                const cursoInfo = await Curso.getCurso(curso.id)

                for (let j = 0; j < cursoInfo.horarios.length; j++) {

                    const horario = cursoInfo.horarios[j]
                    const dia =  await Horario.getWeekDay(horario.dia)

                    

                    if (datetext >= horario.hora_inicio && datetext <= horario.hora_fin && dia == date.getDay()) {

                        console.log(dia)
                        console.log(date.getDay())
                        console.log("Its class time bitch profesor")
                         claseCurso = curso;
                         claseHorario = horario;
                         console.log(claseCurso);
                         console.log(claseHorario);
                         console.log("aaaaaaaaaaaaaaaaaaa")
                         
    
                    } 
                    
                }
            } 
      
          }

          await forLoop();

          res.render('pages/docentes/home.ejs', { docente, claseCurso, claseHorario });

        // docente.cursos.forEach(async curso => {
    
        //     cursoInfo = await Curso.getCurso(curso.id)

        //     cursoInfo.horarios.forEach (  async horario => {

        //         const dia =  await Horario.getWeekDay(horario.dia)
        //         if (datetext > horario.hora_inicio && datetext < horario.hora_fin && dia == date.getDay()) {
        //             console.log("Its class time bitch")
        //              claseCurso = curso;
        //              claseHorario = horario;
        //              res.render('pages/docentes/home.ejs', { docente, claseCurso, claseHorario });

        //         } 
    
        //     } )
        // })

        


        
    

    } else {
        const estudiante = await Estudiante.getEstudiante(res.id);
        console.log(estudiante)

        let claseCurso;
        let claseHorario;

        date = new Date();
        datetext = date.toTimeString().split(' ')[0]
        datetext = datetext.substring(0,5);

        const forLoop = async _ => {
    
          
            for (let i = 0; i < estudiante.cursos.length; i++) {
                const curso = estudiante.cursos[i]
                const cursoInfo = await Curso.getCurso(curso.id)
                

                for (let j = 0; j < cursoInfo.horarios.length; j++) {
                
                    const horario = cursoInfo.horarios[j]
                    
                    
                    const dia =  await Horario.getWeekDay(horario.dia)



                    if (datetext >= horario.hora_inicio && datetext <= horario.hora_fin && dia == date.getDay()) {
                        sesion =  await Curso.getIDSesion(horario.id)

                        if (sesion != null){
                            const expiracion = new Date(sesion.expiracion);

                            const diffMs = expiracion - new Date(); 
                            const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    
                        
                            const expirado = diffMins <= 0 ? true : false;  
                            if (!expirado){
                                console.log("Its class time bitch")
                                claseCurso = curso;
                                claseHorario = horario;
    
                            }
                        }
                       


                         
    
                    } 
                    
                }
            }   
      
          }

          await forLoop();
          res.render('pages/estudiantes/home.ejs', {estudiante, claseCurso, claseHorario})

    }

})

module.exports = router;