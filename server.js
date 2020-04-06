import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as socketIO from 'socket.io'
import * as mongoose from 'mongoose'
import * as cors from 'cors'

import {
    PORT,
    MONGO_URI
} from '../config/keys'

import * as compression from 'compression'
import { errorHandler } from '../tools/routing_tools'
import { sendErrorMail } from '../tools/error_tools'

import somerouts from './somerouts/somerouts'
import Counter from '../models/influencer/counter'


const app = express()

app.use(compression())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
const io = socketIO()

const server = require('http').Server(app)

io.attach(server)


mongoose.connect(MONGO_URI, { useNewUrlParser: true }, (err) => {
    if (err) {
        sendErrorMail(err, 'Error while connecting to MongoDB')
    } else {
        console.log('Connected to MongoDB')
    }
})

app.get('/', (req, res) => {
    res.send({ BLMSTN_YEMECH_TAPI: true })
})

somerouts(app)
somerouts(app)
somerouts(app)
somerouts(app)
somerouts(app)
somerouts(app)


app.use(errorHandler)
let connected = false
const flim = () => setTimeout(async () => {
    flim()
    if (connected) {
        const la = await Counter.addOne()
        io.emit('signup', 1)
    }
}, (Math.random() * 15 + 1) * 1000)
let sockets = []
flim()
io.on('connection', function (socket) {
    sockets.push(socket.id)
    connected = true
    socket.on('disconnect', () => {
        sockets = sockets.filter((n) => n !== socket.id)
        if (sockets.length === 0) connected = false
    })
})

server.listen(PORT, () => {
    console.log(`Running on port ${PORT}, `)
})