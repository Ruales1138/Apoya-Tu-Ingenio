import React from "react";
import style from "./FormM.module.css";
import logo_udem from "../../images/logo_udem.png";
import avatar from "../../images/avatar.png";

function FormM() {
    return(
        <div className={style.pageContainer}>
            <header className={style.container}>
                <img src={logo_udem} alt="Logo Universidad de Medellín" className={style.image} />
                <img src={avatar} alt="Foto de perfil" className={style.avatar} />
            </header>
            <h1 className={style.text}>Formulario de Aplicación a Monitorías Académicas </h1>

            <section className={style.personalDataContainer}>
                <h2 className={style.textPersonalData}>Datos Personales</h2>

                <form>
                    <div className={style.textbox}>
                        <label className={style.textbox.label} htmlFor="fullName">
                            Nombre Completo<span className={style.required}>*</span>
                        </label>
                        <br></br>
                        
                        <input className={style.textbox.input} id="fullName" type="text" />
                    </div>

                    <div className={style.textboxright}>
                        <label className={style.textbox.label} htmlFor="studentID">
                            Código Estudiantil<span className={style.required}>*</span>
                        </label>
                        <br></br>
                        <input className={style.textbox.input} id="studentID" type="text"  />
                    </div>

                    <div className={style.textProgram}>
                        <label>Programa Académico<span className={style.required}>*</span></label>

                        <select className={style.dropdown}>
                            <option value="">Selecionar</option>
                            <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
                            <option value="Ingeniería Industrial">Ingeniería Industrial</option>
                            <option value="Ingeniería Electrónica">Ingeniería Electrónica</option>
                        </select>
                    </div>

                    <div className={style.textboxRightTwo}>
                        <label className={style.textboxRightTwo.label} htmlFor="currentSemester">
                            Semestre Actual<span className={style.required}>*</span>
                        </label>
                        <br></br>
                        <input className={style.textboxRightTwo.input} id="currentSemester" type="text"  />
                    </div>

                    <div className={style.textboxAverage}>
                        <label className={style.textboxAverage.label} htmlFor="averageGrade">
                            Promedio Acumulado (GPA)<span className={style.required}>*</span>
                        </label>
                        <br></br>
                        <input className={style.textboxAverage.input} id="averageGrade" type="text"  />
                    </div>

                    <div className={style.textboxEmail}>
                        <label className={style.textboxEmail.label} htmlFor="email">
                            Correo Institucional<span className={style.required}>*</span>
                        </label>
                        <br></br>
                        <input className={style.textboxEmail.input} id="email" type="text"  />
                    </div>

                    <div className={style.textboxTelephone}>
                        <label className={style.textboxTelephone.label} htmlFor="telephone">
                            Teléfono de Contacto<span className={style.required}>*</span>
                        </label>
                        <br></br>
                        <input className={style.textboxTelephone.input} id="telephone" type="text"  />
                    </div>

                    <div className={style.textboxEmail}>
                        <label className={style.textboxEmail.label} htmlFor="email">
                            Correo Institucional<span className={style.required}>*</span>
                        </label>
                        <br></br>
                        <input className={style.textboxEmail.input} id="email" type="text"  />
                    </div>

                    <div className={style.textboxTelephone}>
                        <label className={style.textboxTelephone.label} htmlFor="telephone">
                            Teléfono de Contacto<span className={style.required}>*</span>
                        </label>
                        <br></br>
                        <input className={style.textboxTelephone.input} id="telephone" type="text"  />
                    </div>

                </form>


            </section>
            <br></br>
            <section className={style.containerExperience}>
                <h2 className={style.textExperience}>Experiencia y Habilidades</h2>
                <form>
                    <p className={style.textQuestion}>¿Tienes experiencia previa como monitor?</p>

                    <div className={style.radioGroup}>
                        <div className={style.radioYes}>
                            <div className={`${style["radioYes-item"]}`}>
        
                                <input 
                                    type="radio" 
                                    name="monitorExperience" 
                                    value="sí" 
                                    id="experienceYes"
                                    className={style.radioInput} 
                                />
                                <label htmlFor="experienceYes">Sí</label>
                            </div>
                        </div>
                        
                        <div className={style.radioNo}>
                            <div className={`${style["radioNo-item"]}`}>
                                <input 
                                    type="radio" 
                                    name="monitorExperience" 
                                    value="no" 
                                    id="experienceNo" 
                                    className={style.radioInput} 
                                />
                                <label htmlFor="experienceNo">No</label>
                            </div>
                        </div>
                    </div>

                    <div className={style.textarea}>
                        <label className={style.textarea.label} htmlFor="experienceDetails">
                            Si es así, por favor detalla tu experiencia y las asignaturas que has monitoreado:
                        </label>
                        <br></br>
                        <input className={style.textarea.input} id="experienceDetails" type="text"  />
                    </div>
                </form>
            </section>

            <section className={style.containerPostulation}>
                <h2 className={style.textPostulation}>Postulación a Cursos y Disponibilidad</h2>
                <form>
                    <p className={style.textCourses}>Cursos a postularse<span className={style.required}>*</span></p>

                    <select className={style.containerCourses}>
                        <option value="">Seleccionar Cursos</option>
                        <option value="Matemáticas I">Matemáticas I</option>
                        <option value="Programación Básica">Programación Básica</option>
                    </select>

                    <p className={style.textDisponibility}>Disponibilidad Horaria</p>

                    <div className={style.containerHours}>
                        <p className={style.textFirstHour}>8:00 - 10:00</p>
                        <p className={style.textSecondHour}>10:00 - 12:00</p>
                        <p className={style.textThirdHour}>12:00 - 14:00</p>
                        <p className={style.textFourthHour}>14:00 - 16:00</p>

                        <p className={style.textL}>L</p>
                        <p className={style.textMa}>M</p>
                        <p className={style.textMi}>X</p>
                        <p className={style.textJ}>J</p>
                        <p className={style.textV}>V</p>
                        <p className={style.textS}>S</p>
                        <p className={style.textD}>D</p>

                        <input type="checkbox" className={style.checkbox1} />
                        <input type="checkbox" className={style.checkbox2} />
                        <input type="checkbox" className={style.checkbox3} />
                        <input type="checkbox" className={style.checkbox4} />

                        <input type="checkbox" className={style.checkbox5} />
                        <input type="checkbox" className={style.checkbox6} />
                        <input type="checkbox" className={style.checkbox7} />
                        <input type="checkbox" className={style.checkbox8} />
                        
                        <input type="checkbox" className={style.checkbox9} />
                        <input type="checkbox" className={style.checkbox10} />
                        <input type="checkbox" className={style.checkbox11} />
                        <input type="checkbox" className={style.checkbox12} />

                        <input type="checkbox" className={style.checkbox13} />      
                        <input type="checkbox" className={style.checkbox14} />
                        <input type="checkbox" className={style.checkbox15} />
                        <input type="checkbox" className={style.checkbox16} />

                        <input type="checkbox" className={style.checkbox17} />
                        <input type="checkbox" className={style.checkbox18} />
                        <input type="checkbox" className={style.checkbox19} />
                        <input type="checkbox" className={style.checkbox20} />

                        <input type="checkbox" className={style.checkbox21} />
                        <input type="checkbox" className={style.checkbox22} />
                        <input type="checkbox" className={style.checkbox23} />
                        <input type="checkbox" className={style.checkbox24} />

                        <input type="checkbox" className={style.checkbox25} />
                        <input type="checkbox" className={style.checkbox26} />
                        <input type="checkbox" className={style.checkbox27} />
                        <input type="checkbox" className={style.checkbox28} />
                        
                    </div>
                </form>

            </section>

            <button className={style.buttonCancel} type="button">Cancelar</button>
            <button className={style.buttonSend} type="submit">Enviar</button>

        </div>
    )
};

export default FormM;