import React, { useEffect, useState } from "react";
import style from "./Aplications.module.css";

export default function Aplications() {
	const [apps, setApps] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			setError("Inicia sesión para ver tus aplicaciones");
			setLoading(false);
			return;
		}
		fetch("http://localhost:3001/api/applications", {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then(async (res) => {
				const data = await res.json();
				if (!res.ok) throw new Error(data.message || "No se pudieron cargar las aplicaciones");
				setApps(Array.isArray(data.applications) ? data.applications : []);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message || "Error al cargar");
				setLoading(false);
			});
	}, []);

	const formatDate = (s) => {
		if (!s) return "";
		const d = new Date(s);
		if (!isNaN(d)) return d.toISOString().slice(0, 10);
		return String(s).slice(0, 10);
	};

	const estadoClass = (estado) => {
		if (!estado) return "";
		const e = estado.toLowerCase();
		if (e === "seleccionada") return style.estadoAceptada;
		if (e === "rechazada") return style.estadoRechazada;
		return style.estadoPendiente;
	};

	return (
		<section id="aplicaciones">
			<h2>Mis Aplicaciones</h2>
			<div className={style.applicationsTable}>
				{loading ? (
					<p>Cargando...</p>
				) : error ? (
					<p className={style.error}>{error}</p>
				) : apps.length === 0 ? (
					<p>No has aplicado a ninguna convocatoria aún.</p>
				) : (
					<table className={style.table}>
						<thead>
							<tr>
								<th>Convocatoria</th>
								<th>Curso</th>
								<th>Fecha de Aplicación</th>
								<th>Estado</th>
								<th>Score IA</th>
							</tr>
						</thead>
						<tbody>
							{apps.map((a) => (
								<tr key={a.id}>
									<td>{a.convocatoria?.titulo || "-"}</td>
									<td>{a.convocatoria?.materia || "-"}</td>
									<td>{formatDate(a.createdAt)}</td>
									<td className={estadoClass(a.estado)}>{a.estado}</td>
									<td>{typeof a.score === "number" ? `${Math.round(a.score)}%` : "-"}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</section>
	);
}
