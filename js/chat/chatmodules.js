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
    const tr = await data.json()
    console.log(tr)
    return tr
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
}

export async function load_chat(target) {
//if the chat exists and the user is authorized return chat dictionary else return [false, 300]
    const udata = utils.getUserData()
    const toolbar_username = document.getElementsByClassName("toolbar-username")[0]
    const toolbar_pfp = document.getElementsByClassName("toolbar-pfp")[0]
    const text_area = document.getElementById('message')
    const d =  await post({
        "code":"get_chat",
        "requested_by":udata,
        "target":target
    })

    if (typeof d === "object") {
        const str_username = d['targetData'][0]['username']
        const str_pfp = d['targetData'][0]['pfp']
        console.log(str_username, str_pfp)
        toolbar_username.textContent = str_username
        toolbar_pfp.src =  str_pfp.length > 0 ?  str_pfp : "./img/user.jpg"
        text_area.placeholder = `Message @${str_username}`


        const friend_list = document.getElementsByClassName("friend-list")[0]
        const friend_card = document.getElementsByClassName('friend')[0]

        const clone = friend_card.cloneNode(true)
        clone.children[0].src = str_pfp > 0 ?  str_pfp : "./img/user.jpg"
        clone.children[1].textContent = str_username
        friend_list.appendChild(clone)
    }
    else {
        //if user not found
        utils.generateNotification("Server", "Couldnt find the user.")
    }
    
    return d
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

export function init_self(){
    if (utils.getUserData()){
    const prfl = document.getElementById("profile")
    const my_pfp = prfl.children[0]
    const my_username = prfl.children[2]
    const my_data = utils.getUserData()
    console.log(my_pfp)
    my_username.textContent = my_data['username']
    my_pfp.src =  my_data["profilepicture"].length > 0 ?  my_data['profilepicture'] : "./img/user.jpg"
    //should load chats in history
    //should set username at bottom right
    }
    else
    {   
        utils.generateNotification("OneChat", `You must create an account at ${utils.create_atag("TerminalSaturn", "https://terminalsaturn.com")} to use this service`)
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