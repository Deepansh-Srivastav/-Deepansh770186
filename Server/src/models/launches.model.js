let launchesDatabase = require("./launches.mongo.js")
let planets = require("./planets.mongo.js")

let DEFAULT_FLIGHT_NUMBER = 100

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber")

    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER
    }

    return latestLaunch.flightNumber
}

async function getAllLaunches() {
    return await launchesDatabase.find({})
}

async function saveLaunch(launchData) {

    const isValidPlanet = await planets.findOne({
        keplerName: launchData.target
    })

    if (!isValidPlanet) {
        // return console.error("Invalid Planet")
        throw new Error("Invalid PLanet Name");
    }

    await launchesDatabase.findOneAndUpdate({ flightNumber: launchData.flightNumber }, launchData, { upsert: true })

}

async function saveNewLaunch(launch){

    let newFlightNumber = await getLatestFlightNumber() + 1

    const newLaunch = Object.assign(launch, {
        success:true,
        upcoming:true,
        flightNumber: newFlightNumber,
        customers: ["ISRO", "NASA"]
    })

    await saveLaunch(newLaunch)
}

function isValidLaunch(id) {
    return launches.has(id)
}

function abortLaunch(id) {
    // launches.delete(id)

    let launch = launches.get(id)

    launch.upcoming = false
    launch.success = false

    launches.set(id, launch);

    // or another approach 
    // launches.get(id).upcoming = false
    // launches.get(id).success = false

    return


}

module.exports = {
    getAllLaunches,
    isValidLaunch,
    abortLaunch,
    saveNewLaunch
}