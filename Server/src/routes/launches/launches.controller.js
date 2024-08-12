const {
    getAllLaunches,
    isValidLaunch,
    abortLaunch,
    saveNewLaunch
} = require("../../models/launches.model")

async function httpGetAllLaunches(req, res) {
    return res.status(200).json(await getAllLaunches())
}

async function httpAddNewLaunch(req, res) {
    const launch = req.body

    if (!launch.mission || !launch.rocket || !launch.target || !launch.launchDate) {

        res.status(400).json({
            error: "Missing the required launch property "
        })
    }

    launch.launchDate = new Date(launch.launchDate)

    await saveNewLaunch(launch)

    return res.status(201).json(launch)
}

async function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id)

    const validLaunch = await isValidLaunch(launchId)

    if (!validLaunch) {
        return res.status(400).json({
            error: "The launch does not exist"
        })
    }

    const result = await abortLaunch(launchId)

    res.status(200).json(result)

}
module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}