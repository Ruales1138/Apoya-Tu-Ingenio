import React from "react";
import style from "./Aplications.module.css";

export default function Aplications() {
	return (
		<section id="aplicaciones">
			<h2>Mis Aplicaciones</h2>
			<div className={style.applicationsTable}>
				<table className={style.table}>
					<thead>
						<tr>
							<th>Convocatoria</th>
							<th>Curso</th>
							<th>Fecha de Aplicación</th>
							<th>Estado</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Monitoría de Programación I</td>
							<td>Ingeniería de Sistemas</td>
							<td>01/05/2024</td>
							<td className={style.estadoAceptada}>Aceptada</td>
						</tr>
						<tr>
							<td>Monitoría de Base de Datos</td>
							<td>Ciencias de la Computación</td>
							<td>28/04/2024</td>
							<td className={style.estadoPendiente}>Pendiente</td>
						</tr>
						<tr>
							<td>Monitoría de Estadística</td>
							<td>Matemáticas</td>
							<td>25/04/2024</td>
							<td className={style.estadoRechazada}>Rechazada</td>
						</tr>
						<tr>
							<td>Monitoría de Física II</td>
							<td>Ingeniería Civil</td>
							<td>22/04/2024</td>
							<td className={style.estadoPendiente}>Pendiente</td>
						</tr>
						<tr>
							<td>Monitoría de Redes I</td>
							<td>Ingeniería de Telecomunicaciones</td>
							<td>18/04/2024</td>
							<td className={style.estadoAceptada}>Aceptada</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	);
}
