const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path')

const planets = require('./planets.mongo')

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'Kepler_Data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', async (data) => {
                if (isHabitablePlanet(data)) {
                    await savePlanets(data)
                }
            })
            .on('error', (err) => {
                console.log(err);
                reject(err)
            })
            .on('end', async () => {
                let totalHebitablePlanets = (await getAllPlanets()).length
                console.log(`${totalHebitablePlanets} habitable planets found!`);
                resolve();
            });
    })
}

async function getAllPlanets() {
    return await planets.find({},{
        "_id":0,
        "__v":0
    })
}

async function savePlanets(planetsData) {

    await planets.updateOne({
        keplerName: planetsData.kepler_name
    }, {
        keplerName: planetsData.kepler_name
    }, {
        upsert: true
    })
}



module.exports = {
    loadPlanetsData,
    getAllPlanets
}