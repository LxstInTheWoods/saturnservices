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


export function comparestrings(str1, str2){
        str1 = str1.toLowerCase();
        str2 = str2.toLowerCase();
        
        for (let i = 0; i < Math.min(str1.length, str2.length); i++) {
            if (str1[i] < str2[i]) {
                return [str1, str2].join("___");
            } else if (str1[i] > str2[i]) {
                return [str2, str1].join("___");
            }
        }
        

        if (str1.length < str2.length) {
            return [str1, str2].join("___");
        } else {
            return [str2, str1].join("___");
        }
}

socket.onmessage = async (event) => {
    const data = JSON.parse(event.data)
    const ray_id = data[0]


    if (data['rb']) {

        //recieving an instant message
        if (data['type'] === "instant_message" && await local.local_update(2, null) === data['chat_id']){
            create_message_clone("recieved", [data['pfp'], data['sender'], data['content']])
            scrollToBottomMsgs()
        }
    }else {
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

}


async function postSocket(body) {
    if (!body) {
        console.warn("post failed - No body provided")
    }
    if (socket_open) {
        const ray_id = utils.randomHex(20)
        return new Promise((resolve, reject) => {
            //listening
            socket_rays[ray_id] = { resolve, reject }
            const toSend = JSON.stringify({ body: { code: body['code'], data: body }, ray_id: ray_id })
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


function scrollToBottomMsgs() {
    const messageMain = document.getElementById('messages');
    messageMain.scrollTop = messageMain.scrollHeight;
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
    profile_picture.src = data[0].length > 0 ? data[0] : "./img/user.jpg"
    username.textContent = data[1]

    if (data[1] === utils.getUserData()['username']) {
        username.style.color = "#1693db"
    }

    content.textContent = data[2]

    message_main.appendChild(clone)
    scrollToBottomMsgs()

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
        if (typeof d['chatData']['messages'] === "undefined") { console.log('return'); return; }
        if (d === "undefined") { return; }
        if (bypass){
            console.log("ok")
            chats = d
        }
        console.log(chats)

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
                clone_username.style.color = "#1693db"
                clone_pfp.src = udata['profilepicture'].length > 0 ? udata['profilepicture'] : "./img/user.jpg"
            }
            else {
                if (chats['targetData']['username'] === x['sender'] && chats['targetData']['pfp'].length > 0 ) {
                    clone_pfp.src = chats['targetData']['pfp']
                } else {
                    clone_pfp.src = "./img/user.jpg"

                }
            }
            message_frame.appendChild(message_clone);
        }
    }

    function load(d, skip_toolbar) {
        try {
            if (!d) {console.warn("d is null"); return}
            // Extract target user's data from the provided data
            const str_username = d['targetData']['username'];
            const str_pfp = d['targetData']['pfp'];

            // Update the toolbar with the target user's username and profile picture
            if (!skip_toolbar) {
                toolbar_username.textContent = str_username;
                toolbar_pfp.src = str_pfp.length > 0 ? str_pfp : "./img/user.jpg";
                text_area.placeholder = `Message @${str_username}`;
            }

            // If only loading messages, skip friend list update
            if (messages === "only") {
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
            new animations.setup_room_hover(clone);
            var closeState = new animations.setup_closeroom_hover(clone.children[2]);

            // Add click event to load chat when clicking on the friend card (if not closing)
            console.log(closeState.hover)
            clone.addEventListener("click", !closeState.hover ? (__loadmessages__) => {
                console.log("clickeddd")
                // Clear previous messages, update local state, and load new chat
                localStorage.setItem("lastchat", str_username)

                message_frame.innerHTML = "";
                console.log("ok")
                
                local.local_update(1, d['targetData']['order']);
                utils.update_tab_name(`Onechat - @${d['targetData']['username']}`);
                load_chat(d['targetData']['username'], chats, "only", true);
            } : null);

            // Handle closing of the chat room when clicking the close button
            close_room.addEventListener("click", (__closeroom__) => {

                __closeroom__.stopPropagation()
                let scl = structuredClone(utils.getUserData());

                delete scl['data']['chat'][str_username]
                message_frame.innerHTML = "";
                
                local.local_update(3)
                
                utils.writeData(scl)

                clone.remove()
                
            });

            // Set up hover animations for the close button

            // Load messages if needed
            if (messages) {
                local.local_update(1, d['targetData']['order'])
                load_messages(d);
            }
        }catch (err) {
            console.log("an error occured in load: ", err)
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
            console.log(dpost)
            load(dpost)
            return dpost
        }

        // If the target chat exists in cache (chats), return cached chat

            // Otherwise, load chat data from the server
            const dpost = target in chats ? chats[target]: await postSocket({
                "code": "get_chat",
                "requested_by": udata,
                "target": target
            });

            // If chat data is found, load it; if not, return empty array
            if (typeof dpost === "object") {
                load(await dpost);
                return dpost;
            } else {
                // If user not found
                return [];
            }
    } else {
        // If target is a dictionary, load all chats using loop_load
        loop_load();
        return;
    }
    scrollToBottomMsgs()
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
    if (!args[2]) { utils.generateNotification("Error!", "no chat is selected!"); return; }
    const input = document.getElementById("message")
    console.log(...args)
    create_message_clone(...args)
    adjustTextareaHeight()

    async function to_database() {
        const send_data = {
            "code": "send_message",
            "chat_id": await local.local_update(2),
            "message": {
                "sender": args[1][1],
                "pfp":utils.getUserData()['profilepicture'],
                "content": input.value
            }

        }
        console.log(send_data)
        let s = await postSocket(send_data)
        input.value = ""
    }

    to_database()



}

