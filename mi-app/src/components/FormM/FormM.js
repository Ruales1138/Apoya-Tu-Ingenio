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
        </div>
    )
};

export default FormM;