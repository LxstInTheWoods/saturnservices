const endpoint_websocket = "https://terminalsaturn.com/ws_chat"
const requests = "https://terminalsaturn.com/chat"
import * as utils from "../modules.js"

async function post(_body){
    const data =  await fetch(requests, {
        method:"POST",
        mode:"cors", 
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(_body)
    })
    return await data.json()
}

async function create_message_clone(type, data){
    const message_main = document.getElementById('messages')
    const message_storage = document.getElementsByClassName("message-storage")[0]
    const message_sent = message_storage.children[0]
    const message_recieved = message_storage.children[1]
    
    let clone = type === "recieved" ? message_recieved.cloneNode(true) : message_sent.cloneNode(true)

    const username = (clone.children[1]).children[0]
    const profile_picture = clone.children[0]
    const content = (clone.children[1]).children[1]
    username.textContent = "Test card"
    content.textContent = data[2]

    message_main.appendChild(clone)
    const s = await post({
        "code":"send_message"
    })
    console.log(s)


}

export function load_chat(target) {
//if the chat exists and the user is authorized return chat dictionary else return [false, 300]

    udata = utils.getUserData()

    const id =  udata['chats'].keys().length() === 0 ?  true : false
    if (id) {
        for (const x of Object.keys(udata['chats'])) {
            
        }
    }


    console.log(post({
        "code":"get_chat",
        "requested_by":udata,
        "target":{
            "user":target,
            "id":
        }
    }))
    return true
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

export function send_message(...args) {
    const input = document.getElementById("message")
    input.value = ""
    create_message_clone(...args)
    for (let i = 0; i < 5; i++){
        adjustTextareaHeight()

    }
    
}