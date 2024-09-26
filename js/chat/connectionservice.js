import * as utils from "../modules.js"
const wsUrl = 'https://terminalsaturn.com/ws';
const socket = new WebSocket(wsUrl);

socket.onopen = async function (event) {
    socket.send(JSON.stringify({ type: '01', message: utils.getUserData()}));
};

socket.onmessage = async function (event) {
    const data = JSON.parse(event.data)
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