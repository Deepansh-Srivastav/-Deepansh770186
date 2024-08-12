// let launches = require("./launches.mongo.js")

let latestFlightNumber = 100

const launches = new Map()

const launch = {
    flightNumber : 100,
    mission:"Kepler Exploration X",
    rocket:"Explorer IS1",
    launchDate : new Date('December 27, 2030'),
    target:"Kepler-422 b",
    customers:["NASA","ISRO"],
    upcoming:true,
    success:true
}

launches.set(launch.flightNumber, launch)

function getAllLaunches(){
    return Array.from(launches.values())
}

function addNewLaunch(launchData){

    latestFlightNumber = latestFlightNumber+1

    const predefinedLaunchData = {
        success:true,
        upcoming:true,
        flightNumber:latestFlightNumber
    }

    launches.set(latestFlightNumber,Object.assign(launchData, predefinedLaunchData))
}

function isValidLaunch(id){
    return launches.has(id)
}

function abortLaunch(id){
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

module.exports= {
    getAllLaunches,
    addNewLaunch,
    isValidLaunch,
    abortLaunch
}