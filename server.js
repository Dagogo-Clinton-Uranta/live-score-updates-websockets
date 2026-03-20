import {WebSocketServer,WebSocket} from 'ws'

const wss = new WebSocketServer({port: 8080}); //Zombie http server is spun up,  that only exists to listen for that upgraded websocket connecton, once it sees a web connection, it handles the connection and holds the TCP port open
//in production,  you attach the webserver to an existing express/fastify port so it can share resources


//this event will fire after browser/client switches from http to websockets 101 handshake is verified
//socket contains the individual connectio client
//request will contain the headers, such as cookies, ip address and more fro mthe upgraded request
wss.on('connection',(socket,request)=>{
  const ip = request.socket.remoteAddress;

  //raw data is actually a binary, dont forget
  socket.on('message', (rawData)=>{
    console.log({rawData});
    const message = rawData.toString()


    //a list of all active socket clients can be gotten by doing so
    wss.clients.forEach((client)=>{
         
        // client states explained below
        //0: Connecting
        //1: OPEN (the only state where you can safely .send())
        //2: CLOSING
        //3: CLOSED

     if(client.readyState === Websocket.OPEN){cleint.send(`Server Broadcast: ${message}`)}
    })


  })

  
  //sockets gotta have en error state, perhaps so we can close them, so our server doesnt crash
  socket.on('error', (err)=>{
   console.error(`Error:${err.message}: ${ip}`)
  })



   //sockets gotta have en error state, perhaps so we can close them, so our server doesnt crash
   socket.on('close', (err)=>{
    console.log(`Client Disconnected`)
   })

})