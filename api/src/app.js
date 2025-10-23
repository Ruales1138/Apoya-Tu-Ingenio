const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// rutas
const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes);

// ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

module.exports = app;
