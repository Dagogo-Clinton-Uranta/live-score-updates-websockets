import {WebSocket,WebSocketServer} from 'ws'

function sendJson(params) {
    if(socket.readyState !== WebSocket.OPEN ) return; //guard

    socket.send(JSON.stringify(payload));
}

function broadcast(wss,payload){
//sens to ALL CLIENTS

for(const client of wss.clients){
    if(client.readyState !== WebSocket.OPEN ) continue; 

    socket.send(JSON.stringify(payload));
}
}


//export function attachWebSocketServer(server){
//    const wss = new WebSocket({
//        server,
//        path:'/ws',
//        maxPayload:1024*1024
//
//    })
//    
//    
//    wss.on('connection', (socket)=>{
//        sendJson(socket,{type:'welcome'})
//
//        socket.on('error', console.error)
//    });
//
//    function broadcastMatchCreated(match) {
//      broadcast(wss, {type:'match_created', data:match})
//    }
//
//    return {broadcastMatchCreated}
//
//}



export function attachWebSocketServer(server){

    const wss = new WebSocket({
                server,
                path:'/ws',
                maxPayload:1024*1024
        
            })


            wss.on('connection', (socket)=>{
                        sendJson(socket,{type:'welcome'})
                
                        socket.on('error', console.error)
                    });


      const interval = setInterval(()=>{
        wss.clients.forEach((ws)=>{
        if(ws.isAlive === false){return ws.terminate()}

         ws.isAlive = false
         ws.ping()
        })


      },30000)

      wss.on('close',()=>{clearInterval(interval)})

}