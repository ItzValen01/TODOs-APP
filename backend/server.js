require('dotenv').config();  
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const todosRoutes = require('./routes/todosRoutes');
const configRoutes = require('./routes/configRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/todos', todosRoutes);
app.use('/api/config', configRoutes);

const startServer = async () => {
    try {
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
};

startServer();