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
                        
                        <input className={style.textbox.input} id="fullName" type="text" placeholder="Ana María García" />
                    </div>

                    <div className={style.textboxright}>
                        <label className={style.textbox.label} htmlFor="studentID">
                            Código Estudiantil<span className={style.required}>*</span>
                        </label>
                        <br></br>
                        <input className={style.textbox.input} id="studentID" type="text" placeholder="202100567" />
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
                        <input className={style.textboxRightTwo.input} id="currentSemester" type="text" placeholder="Séptimo" />
                    </div>

                    <div className={style.textboxAverage}>
                        <label className={style.textboxAverage.label} htmlFor="averageGrade">
                            Promedio Acumulado (GPA)<span className={style.required}>*</span>
                        </label>
                        <br></br>
                        <input className={style.textboxAverage.input} id="averageGrade" type="text" placeholder="4.5" />
                    </div>

                    <div className={style.textboxEmail}>
                        <label className={style.textboxEmail.label} htmlFor="email">
                            Correo Institucional<span className={style.required}>*</span>
                        </label>
                        <br></br>
                        <input className={style.textboxEmail.input} id="email" type="text" placeholder="ejemplo@soyudemedellin.edu.co" />
                    </div>

                    <div className={style.textboxTelephone}>
                        <label className={style.textboxTelephone.label} htmlFor="telephone">
                            Teléfono de Contacto<span className={style.required}>*</span>
                        </label>
                        <br></br>
                        <input className={style.textboxTelephone.input} id="telephone" type="text" placeholder="+57 3001234567" />
                    </div>

                    <div className={style.textboxEmail}>
                        <label className={style.textboxEmail.label} htmlFor="email">
                            Correo Institucional<span className={style.required}>*</span>
                        </label>
                        <br></br>
                        <input className={style.textboxEmail.input} id="email" type="text" placeholder="ejemplo@soyudemedellin.edu.co" />
                    </div>

                    <div className={style.textboxTelephone}>
                        <label className={style.textboxTelephone.label} htmlFor="telephone">
                            Teléfono de Contacto<span className={style.required}>*</span>
                        </label>
                        <br></br>
                        <input className={style.textboxTelephone.input} id="telephone" type="text" placeholder="+57 3001234567" />
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
                                    defaultChecked
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
                        <input className={style.textarea.input} id="experienceDetails" type="text" placeholder="Detalla tu experiencia aquí..." />
                    </div>
                </form>
            </section>
        </div>
    )
};

export default FormM;