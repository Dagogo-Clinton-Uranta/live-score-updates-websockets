import express from 'express'
import {matchRouter} from "./routes/matches.js"
import {attachWebSocketServer} from "./ws/server.js"
import http from 'http'

const PORT = Number(process.env.PORT || 8000)
const HOST = (process.env.HOST || 0.0.0.0)


//TO USE WEBSOCKETS IN EXPRESS WE NEED TO EXPLICITLY CREATE THE HTTP SERVER, SO THAT THE WS LIBRARY CAN HOOK INTO IT
const app = express();
const server = http.createServer(app)



app.use(express.json())

app.get('/',(req,res))=>{
    res.send("Hello from Express server")
}






app.use('/matches',matchRouter)

const {broadcastMatchCreated} = attachWebSocketServer(server )  
app.locals.broadcastMatchCreated = broadcastMatchCreated  //me i never see app.locals, but they say it's express' global object


server.listen(PORT,HOST,()=>{
     const baseUrl =  HOST === '0.0.0.0'?`http://localhost${PORT}`:`http://${HOST}:${PORT}`

    console.log(`Server is running at  ${baseUrl}`)
    console.log(`websocket Server is running at  ${baseUrl.replace('http','ws')}/ws`)
})


