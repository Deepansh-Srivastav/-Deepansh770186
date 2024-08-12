const app = require("./app")

const mogoose = require('mongoose')

const { loadPlanetsData } = require("./models/planets.model")

const PORT = 8000

const MONGO_URL = 'mongodb+srv://deepanshengineering03:aBmo8hAPNjPAirpD@project.e0lej.mongodb.net/NASA_Project_Database'

const http = require("http")
const { default: mongoose } = require("mongoose")
const { log } = require("console")

const server = http.createServer(app)

async function startServer() {

    await mongoose.connect(MONGO_URL)
    .then(()=>{
        console.log('Database Connected');
    })
    .catch(()=>{
        console.log('error');
        
    })

    await loadPlanetsData()

    server.listen(PORT, () => {
        console.log(`Listening on PORT ${PORT}...`);
    })
}

startServer()