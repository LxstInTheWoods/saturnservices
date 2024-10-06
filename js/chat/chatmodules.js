const endpoint_websocket = "https://terminalsaturn.com/ws_chat"
const requests = "https://terminalsaturn.com/chat"
import * as utils from "../modules.js"
import * as local from "./chat.js"
import * as animations from "./animation.js"

const socket = new WebSocket(endpoint_websocket)

var socket_rays = {}
var socket_open = false

socket.onclose = (event) => {
    utils.generateNotification("Server", `Connection to the ${utils.create_atag("server", endpoint_websocket)} was lost.`)
}

socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    const ray_id = data[0]
    if (ray_id in socket_rays) {
        const { resolve } = socket_rays[ray_id]
        resolve(data[1])
        delete socket_rays[ray_id]
    }
    else {
        console.warn("ray mismatch, not listening for this request")
        return null
    }
}


async function postSocket(body) {
    if (socket_open) {
        const ray_id = utils.randomHex(20)
        return new Promise((resolve, reject) => {
            //listening
            socket_rays[ray_id] = { resolve, reject }
            const toSend = JSON.stringify({ body: {code:body['code'], data:body}, ray_id: ray_id })
            socket.send(toSend);
        })
    } else {
        console.warn("socket is not accepting requests")
        return null
    }
}



socket.onopen = async (event) => {
    socket_open = true
    socket.send(JSON.stringify({ type: '01', message: utils.getUserData(), ray_id: utils.randomHex(12) }));
}



//saved chats wont update till you have some form of data syncing for chats page, since it updates all data via terminalsaturn.
//write something for dynamically updating value on all pages
async function post(_body) {
    const data = await fetch(requests, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(_body)
    })
    const tr = await data.json()
    return tr
}

async function create_message_clone(type, data) {
    const message_main = document.getElementById('messages')
    const message_storage = document.getElementsByClassName("message-storage")[0]
    const message_sent = message_storage.children[0]
    const message_recieved = message_storage.children[1]

    let clone = type === "recieved" ? message_recieved.cloneNode(true) : message_sent.cloneNode(true)

    const username = (clone.children[1]).children[0]
    const profile_picture = clone.children[0]
    const content = (clone.children[1]).children[1]
    profile_picture.src = data[0]
    username.textContent = data[1]
    content.textContent = data[2]

    message_main.appendChild(clone)

}

export async function load_chat(target, chats, messages, bypass) {
    console.log(target, chats, messages)
    // Function to load chat data once, then switch to websockets for instant messaging
    // Parameters:
    // - target: the chat target, can be a username (string) or dictionary of chat data
    // - chats: cached chats, can be null
    // - messages: if "only", load messages only
    // - bypass: bypass cache and force loading from the server

    // Getting user data and selecting DOM elements for the chat UI
    const udata = utils.getUserData();
    const toolbar_username = document.getElementsByClassName("toolbar-username")[0];
    const toolbar_pfp = document.getElementsByClassName("toolbar-pfp")[0];
    const text_area = document.getElementById('message');

    const friend_list = document.getElementsByClassName("friend-list")[0];
    const friend_card = document.getElementsByClassName('friend')[0];

    const message_storage = document.getElementsByClassName("message-storage")[0];
    const message_frame = document.getElementById('messages');
    const message_sent = document.getElementsByClassName("message-sent")[0];
    const message_recieved = document.getElementsByClassName("message-rec")[0];

    // Function to load chat messages
    function load_messages(d) {
        // Check if messages exist in chatData
        console.log(d)
        if (typeof d['chatData']['messages'] === "undefined") { console.log('return') ;return; }
        if (d === "undefined") { return; }

        // Loop through the messages and display them in the chat UI
        for (const [i, x] of Object.entries(d['chatData']['messages'])) {
            // Determine if the message was sent by the current user
            const message_clone = x['sender'] === udata['username'] ? message_sent.cloneNode(true) : message_recieved.cloneNode(true);

            // Set the username, profile picture, and message content
            const clone_username = (message_clone.children[1]).children[0];
            const clone_pfp = message_clone.children[0];
            const clone_content = (message_clone.children[1]).children[1];

            clone_username.textContent = x['sender'];
            clone_content.textContent = x['content'];

            // Check if profile picture should come from cached chats or targetData

            //might need debugging later
            if (udata['username'] === x['sender']) {
                clone_pfp.src = udata['profilepicture'].length > 0 ? udata['profilepicture'] : "./img/user.jpg"
            }
            else {
                if (chats != null && chats.length > 0 && chats[x['sender']]['profilepicture'].length > 0) {
                    clone_pfp.src = chats[x['sender']]['profilepicture']
                } else {
                    clone_pfp.src = "./img/user.jpg"

                }
            }
            // Append the message to the message frame
            message_frame.appendChild(message_clone);
        }
    }

    // Function to load target chat and display friend info
    function load(d, skip_toolbar) {
        console.log("running load")
        // Extract target user's data from the provided data
        const str_username = d['targetData']['username'];
        const str_pfp = d['targetData']['pfp'];

        // Update the toolbar with the target user's username and profile picture
        if (!skip_toolbar){
        toolbar_username.textContent = str_username;
        toolbar_pfp.src = str_pfp.length > 0 ? str_pfp : "./img/user.jpg";
        text_area.placeholder = `Message @${str_username}`;
        }

        // If only loading messages, skip friend list update
        if (messages === "only") {
            console.log("yeah")
            load_messages(d);
            return;
        }

        // Clone the friend card template and set the user's profile and username
        const clone = friend_card.cloneNode(true);
        clone.children[0].src = str_pfp.length > 0 ? str_pfp : "./img/user.jpg";
        clone.children[1].textContent = str_username;
        friend_list.appendChild(clone);

        const close_room = clone.children[2];

        // Set up animations for the hover and close button on the friend card
        const closeState = new animations.setup_room_hover(clone);

        // Add click event to load chat when clicking on the friend card (if not closing)
        clone.addEventListener("click", closeState ? (__loadmessages__) => {
            // Clear previous messages, update local state, and load new chat
            message_frame.innerHTML = "";
            local.local_update(1, d['targetData']['order']);
            utils.update_tab_name(`Onechat - @${d['targetData']['username']}`);
            load_chat(d['targetData']['username'], chats, "only", true);
        } : null);

        // Handle closing of the chat room when clicking the close button
        close_room.addEventListener("click", (__closeroom__) => {
            console.log("oka");
        });

        // Set up hover animations for the close button
        animations.setup_closebutton_hover(clone.children[2]);

        // Load messages if needed
        if (messages) {
            load_messages(d);
        }
    }

    // Function to load multiple chats from a dictionary
    function loop_load() {

        // Loop through each chat in the target dictionary and load it
        for (const [_, x] of Object.entries(target)) {
            load(x, true);
        }
    }

    // Main logic to determine how to load chat (string target or dictionary)
    if (typeof target === "string") {
        // If a bypass is requested, load chat data from the server
        if (bypass) {
            const dpost = await postSocket({
                "code": "get_chat",
                "requested_by": udata,
                "target": target
            })
            load(dpost)
            return  dpost
        }

        // If the target chat exists in cache (chats), return cached chat
        if (target in chats) {
            return chats[target];
        }
        else {
            // Otherwise, load chat data from the server
            const dpost = await postSocket({
                "code": "get_chat",
                "requested_by": udata,
                "target": target
            });
            console.log(dpost)

            // If chat data is found, load it; if not, return empty array
            if (typeof dpost === "object") {
                load(await dpost);
                return dpost;
            } else {
                // If user not found
                return [];
            }
        }
    } else {
        // If target is a dictionary, load all chats using loop_load
        loop_load();
        return;
    }
}



export function adjustTextareaHeight() {
    const T1input = document.getElementById("message")
    T1input.style.height = 'auto';
    T1input.style.height = T1input.scrollHeight + 'px';

    if (T1input.scrollHeight > parseInt(getComputedStyle(T1input).maxHeight)) {
        T1input.style.overflowY = "scroll;";
    } else {
        T1input.style.overflowY = "auto";
    }
}

export function init_self() {
    if (utils.getUserData()) {
        const prfl = document.getElementById("profile")
        const my_pfp = prfl.children[0]
        const my_username = prfl.children[2]
        const my_data = utils.getUserData()
        my_username.textContent = my_data['username']
        my_pfp.src = my_data["profilepicture"].length > 0 ? my_data['profilepicture'] : "./img/user.jpg"
        load_chat(my_data['data']['chat'], null)
    }
    else {
        utils.generateNotification("OneChat", `You must create an account at ${utils.create_atag("TerminalSaturn", "https://terminalsaturn.com")} to use this service`)
    }


}

export async function send_message(...args) {
    //work on this next
    const input = document.getElementById("message")

    create_message_clone(...args)
    adjustTextareaHeight()
    console.log(...args)
    async function to_database() {
        let s = await postSocket({
            "code": "send_message",
            "chat_id": local.local_update(2),
            "message": {
                "sender": user_data['username'],
                "content": input.value
            }

        })
        input.value = ""
    }



}

