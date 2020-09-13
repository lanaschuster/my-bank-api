const monk = require('monk')
const connectionString = 'localhost/mybank'
const database = monk(connectionString)

module.exports = database
