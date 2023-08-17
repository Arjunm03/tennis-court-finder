import Court from '../models/courtModel.js'
import dotenv from 'dotenv'
import {Client} from "@googlemaps/google-maps-services-js";

dotenv.config()
const client = new Client({});

const getCourt = async (req, res) => {
    const { placeId } = req.query;
    const court = await Court.findOne({ placeId: placeId })
    if (!court) {
        return res.status(404).json({ message: 'Court not found' })
    }
    res.status(200).json(court)
}

const getCourts = async (req, res) => {
    const { lat, lng, radius } = req.query;
    const nearbyCourts = await client.placesNearby({
        params: {
            key: process.env.GOOGLE_MAPS_API_KEY,
            location: [lat, lng],
            radius: radius,
            keyword: 'tennis',
        },
        timeout: 1000,
    });
    let courts = []
    let promises = nearbyCourts.data.results.map((nearbyCourt) => {
        return Court.findOne({ placeId: nearbyCourt.place_id })
            .then((court) => {
                if (!court) {
                    Court.create({
                        placeId: nearbyCourt.place_id,
                        name: nearbyCourt.name,
                        address: nearbyCourt.vicinity,
                        latitude: nearbyCourt.geometry.location.lat,
                        longitude: nearbyCourt.geometry.location.lng,
                        phone: nearbyCourt.phone_number,
                        website: nearbyCourt.website,
                    }).then((court) => {
                        courts.push(court)
                    })
                } else {
                    courts.push(court)
                }
            })
    })
    Promise.all(promises).then(() => res.status(200).send(courts));
}

const createCourt = async (req, res) => {
    const { placeId, name, address, latitude, longitude, phone, website } = req.body;
    const court = await Court.create({
        placeId,
        name,
        address,
        latitude,
        longitude,
        phone,
        website,
    })
    res.status(201).json(court)
}

const updateCourt = async (req, res) => {
    const { placeId } = req.query;
    const court = await Court.findOneAndUpdate({ placeId: placeId }, req.body)
    if (!court) {
        return res.status(404).json({ message: 'Court not found' })
    }
    res.status(200).json(court)
}

const deleteCourt = async (req, res) => {
    const { placeId } = req.query;
    const court = await Court.findOneAndDelete({ placeId: placeId })
    if (!court) {
        return res.status(404).json({ message: 'Court not found' })
    }
    res.status(200).json(court)
}

const deleteCourts = async (req, res) => {
    const deletions = await Court.deleteMany()
    res.status(200).json(deletions)
}

export { getCourt, getCourts, createCourt, updateCourt, deleteCourt, deleteCourts }