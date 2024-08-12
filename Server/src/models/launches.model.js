let launchesDatabase = require("./launches.mongo.js")
let planets = require("./planets.mongo.js")

let latestFlightNumber = 100

const launches = new Map()

const launch = {
    flightNumber: 100,
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: new Date('12/12/2030'),
    target: "Kepler-1652 b",
    customers: ["NASA"],
    upcoming: true,
    success: true
}

saveLaunch(launch)


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

    await launchesDatabase.updateOne({ flightNumber: launchData.flightNumber }, launchData, { upsert: true })

}

function addNewLaunch(launchData) {

    latestFlightNumber = latestFlightNumber + 1

    const predefinedLaunchData = {
        success: true,
        upcoming: true,
        flightNumber: latestFlightNumber
    }

    launches.set(latestFlightNumber, Object.assign(launchData, predefinedLaunchData))
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
    addNewLaunch,
    isValidLaunch,
    abortLaunch
}