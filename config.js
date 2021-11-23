require('dotenv').config();

const PORT_SERVER = process.env.PORT || 3000
const DB_FILE = process.env.DB_FILE || "./sabiduria.db"
const jwt_secret_key = process.env.JWT_SECRET_KEY || 'secret key'

module.exports = {
    PORT_SERVER,
    DB_FILE,
    jwt_secret_key
}