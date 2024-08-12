const {
    getAllLaunches,
    addNewLaunch,
    isValidLaunch,
    abortLaunch
} = require("../../models/launches.model")

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches())
}

function httpAddNewLaunch(req, res) {
    const launch = req.body

    if (!launch.mission || !launch.rocket || !launch.target || !launch.launchDate) {

        res.status(400).json({
            error: "Missing the required launch property "
        })
    }

    launch.launchDate = new Date(launch.launchDate)
    addNewLaunch(launch)

    return res.status(201).json(launch)
}

function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id)

    if (!isValidLaunch(launchId)) {
        return res.status(400).json({
            error: "The launch does not exist"
        })
    }

    abortLaunch(launchId)

    res.status(200).json({
        success: "The launch exists and is removed"
    })

}
module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}