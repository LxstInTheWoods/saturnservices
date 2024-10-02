const endpoint_websocket = "https://terminalsaturn.com/ws_chat"
const requests = "https://terminalsaturn.com/chat"
import * as utils from "../modules.js"
import * as local from "./chat.js"
import * as animations from "./animation.js"

const user_data = utils.getUserData();
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
    //will load the messages once, then websocket will take over updates for instant messaging and notifications
    //there wont be a need to load the messages on every start due to this
    console.log(target, chats)
    const udata = utils.getUserData()
    const toolbar_username = document.getElementsByClassName("toolbar-username")[0]
    const toolbar_pfp = document.getElementsByClassName("toolbar-pfp")[0]
    const text_area = document.getElementById('message')

    const friend_list = document.getElementsByClassName("friend-list")[0]
    const friend_card = document.getElementsByClassName('friend')[0]

    const message_storage = document.getElementsByClassName("message-storage")[0]
    const message_frame = document.getElementById('messages')
    const message_sent = document.getElementsByClassName("message-sent")[0]
    const message_recieved = document.getElementsByClassName("message-rec")[0]

    function load_messages(d) {
        if (typeof d['chatData']['messages'] === "undefined") { return }
        if (d === "undefined") { return }
        for (const [i, x] of Object.entries(d['chatData']['messages'])) {
            /*
                    expecting 
                    {
                        messageid :{
                            ['sender'] = user
                            ['content] = message
                        }
                    }
            */

            const message_clone = x['sender'] === udata['username'] ? message_sent.cloneNode(true) : message_recieved.cloneNode(true)

            const clone_username = (message_clone.children[1]).children[0]
            const clone_pfp = message_clone.children[0]
            const clone_content = (message_clone.children[1]).children[1]


            clone_username.textContent = x['sender']
            clone_content.textContent = x['content']
            clone_pfp.src = x['sender'] === udata['username'] ? udata['profilepicture'] : chats != null && chats.length > 0 ? chats[x['sender']]['profilepicture'] : d['targetData'][0]['pfp']
            message_frame.appendChild(message_clone)

        }
    }

    function load(d) {
        //need to make it so it searches if the user doesnt exist in cache
        const str_username = d['targetData'][0]['username']
        const str_pfp = d['targetData'][0]['pfp']
        toolbar_username.textContent = str_username
        toolbar_pfp.src = str_pfp.length > 0 ? str_pfp : "./img/user.jpg"
        text_area.placeholder = `Message @${str_username}`

        if (messages === "only") {
            load_messages(d);
            return;
        }



        const clone = friend_card.cloneNode(true)
        clone.children[0].src = str_pfp.length > 0 ? str_pfp : "./img/user.jpg"
        clone.children[1].textContent = str_username
        friend_list.appendChild(clone)
        const close_room = clone.children[2]

        const closeState = new animations.setup_room_hover(clone)

        clone.addEventListener("click", !closeState ? (__loadmessages__) => {
            message_frame.innerHTML = ""
            console.log(d['targetData'])
            local.local_update(1, null)
            load_chat(d['targetData'][0]['username'], chats, "only", true)

        }: null)

        close_room.addEventListener("click", (__closeroom__)=>{
            console.log("ok")
        })

        animations.setup_closebutton_hover(clone.children[2])

        if (messages) {
            load_messages(d)
        }

    }


    function loop_load() {
        console.log("loop")
        for (const [_, x] of Object.entries(target)) {
            load(x)
        }
    }


    if (typeof target === "string") {

        if (bypass) {
            //basically pseudocode to load a chat, make it so it either caches or gets from server.
            const dpost = await post({
                "code": "get_chat",
                "requested_by": udata,
                "target": target
            })
            console.log("getting")

            load(await dpost)
            return dpost
        }

        if (target in chats) {
            return chats[target]
        }
        else {
            const dpost = await post({
                "code": "get_chat",
                "requested_by": udata,
                "target": target
            })

            if (typeof dpost === "object") {
                load(await dpost)
                return dpost
            }
            else {
                //if user not found
                return []

            }

        }
    }
    else {
        loop_load();
        return
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
        load_chat(my_data['data']['chat'], null, false)
    }
    else {
        utils.generateNotification("OneChat", `You must create an account at ${utils.create_atag("TerminalSaturn", "https://terminalsaturn.com")} to use this service`)
    }


}

export async function send_message(...args) {
    const input = document.getElementById("message")

    create_message_clone(...args)
    adjustTextareaHeight()
    async function to_database() {
        let s = await post({
            "code": "send_message",
            "chat": "",
            "message": {
                "sender": user_data['username'],
                "content": input.value
            }

        })
        input.value = ""
    }



}