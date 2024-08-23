import * as utils from "./modules.js"
export var SID = null
const wsUrl = 'wss://terminalsaturn.com/ws';
const socket = new WebSocket(wsUrl);



socket.onopen = async function (event) {
    socket.send(JSON.stringify({ type: '01', message: utils.getUserData() }));

};

socket.onmessage = async function (event) {
    console.log("got msgs")
    const data = JSON.parse(event.data)
    console.log(event.data)
    const operations = {
        "rload": () => {
            utils.generateNotification("Admin", "Your data was updated and your page will be automatically refreshed in 3 seconds.")
            setTimeout(() => {
                location.reload()
            }, 1000 * 3);
        },
        "connect": () => {
            utils.generateNotification("Server", data[1])
            SID = data[2]
        },
        "dcl": () => {
            if (utils.getUserData()) {
                utils.logOut()
            }
        }
    }
    if (data[0] in operations) {
        operations[data[0]]()
    }
    else {
        utils.generateNotification("Server", data)
    }
};

socket.onclose = async function (event) {

    utils.generateNotification("Server", "Connection was lost.")
};

socket.onerror = async function (error) {
    console.error('WebSocket error:', error.message);
};
export async function awaitSID() {
    for (let k = 0; k < 20; k++) {
        console.log("looping", SID)
        if (k > 20) {
            utils.generateNotification("System", "Could not connect to server. Please refresh to try again.")
            return "F"
        }
        else
        if (SID) {
            return SID
        }
        await utils.delay(1)
    }
}
//make socket connections require password when connecting via username - security/bug