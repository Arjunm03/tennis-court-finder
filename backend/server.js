import express from 'express'
import dotenv from 'dotenv'
import courtRouter from './routes/courts.js'
import mongoose from 'mongoose'
import cors from 'cors'

dotenv.config()

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use('/api/courts', courtRouter)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(port, () => console.log(`Server running on port ${port}`))
    })
    .catch((error) => console.log(error))