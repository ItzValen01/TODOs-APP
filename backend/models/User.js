const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Tabla User
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Tabla TODO
const Todo = sequelize.define('TODO', {
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    completed: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 0,
        get() {
            const value = this.getDataValue('completed');
            return value === 1;
        },
        set(value) {
            this.setDataValue('completed', value ? 1 : 0);
        }
    },
});

// Tabla Config
const Config = sequelize.define('Config', {
    darkMode: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    resetConfig: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {
            activated: true,
            resetMode: 'normal',
            // Reset Modes
            // normal -> Se mantiene todo igual, no se borra ni reinicia ningun TODO
            // reset  -> Cada dia se reinician los TODOs (se ponen como que no los completastes)
            // delete -> Cada dia se borran todos los TODOs.
        }
    }
});

// Relaciones
User.hasMany(Todo, { as: 'todos', foreignKey: 'userId', onDelete: 'CASCADE' });
Todo.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(Config, { as: 'config', foreignKey: 'userId', onDelete: 'CASCADE' });
Config.belongsTo(User, { foreignKey: 'userId' });

sequelize.sync()
    .then(() => {
        console.log('Tablas creadas con éxito.');
    })
    .catch((error) => {
        console.error('Error creando las tablas:', error);
    });

module.exports = { User, Todo, Config };