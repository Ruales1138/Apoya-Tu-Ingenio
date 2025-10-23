const app = require('./app');
const { sequelize } = require('./db');
const PORT = process.env.PORT || 3001;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión establecida correctamente con la base de datos');

    await sequelize.sync({ alter: true }); // o { force: false } si prefieres
    console.log('✅ Base de datos sincronizada correctamente');

    app.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al conectar o sincronizar la base de datos:', error);
  }
})();
