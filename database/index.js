const Sequelize = require('sequelize')
const config = require('../models/database')

const Endereco = require('../models/enderecos')

const connection = new Sequelize(config)

Endereco.init(connection)
Endereco.associate(connection.models)

module.exports = connection
