import * as utils from "./modules.js"
const wsUrl = 'wss://api.terminalsaturn.com:1111';
const socket = new WebSocket(wsUrl);

function logOut(){
    localStorage.clear()
    location.reload() 
}

socket.onopen = function (event) {
    socket.send(JSON.stringify({ type: '01', message: utils.getUserData()}));
};

socket.onmessage = function (event) {
    const data = JSON.parse(event.data)
    const operations = {
        "rload":()=>{
            utils.generateNotification("Admin", "Your data was updated and your page will be automatically refreshed in 3 seconds.")
            setTimeout(() => {
                location.reload()
            }, 1000*3);
        },
        "connect":()=>{
            console.log(data[1])
            utils.generateNotification("Server", data[1])
            localStorage.setItem("SID", data[2])
        },
        "dcl":()=>{
            if (utils.getUserData()){
            logOut()
            }
        }
    }
    if (data[0] in operations) {
        operations[data[0]]()
    }
    else
    {
        utils.generateNotification("Server", data)
    }
};  

socket.onclose = function (event) {
    console.log('WebSocket connection closed:', event.reason);
};

socket.onerror = function (error) {
    console.error('WebSocket error:', error.message);
};
//make socket connections require password when connecting via username - security/bug