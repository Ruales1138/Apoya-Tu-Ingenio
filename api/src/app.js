const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// rutas
const authRoutes = require('./routes/auth');
const convocatoriaRoutes = require('./routes/convocatorias'); // 👈 importamos las rutas de convocatorias

app.use('/api/auth', authRoutes);
app.use('/api/convocatorias', convocatoriaRoutes); // 👈 registramos las rutas de convocatorias

// ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

module.exports = app;