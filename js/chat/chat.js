import * as module from "./chatmodules.js"
import * as utils from "../modules.js"
//send message handler 

const endpoint_websocket = "https://terminalsaturn.com/ws_chat"
const requests = "https://terminalsaturn.com/chat"

const input = document.getElementById("message")
const T1input = document.getElementById("message")
function adjustTextareaHeight() {
    T1input.style.height = 'auto';
    T1input.style.height = T1input.scrollHeight + 'px';

    if (T1input.scrollHeight > parseInt(getComputedStyle(T1input).maxHeight)) {
        T1input.style.overflowY = "scroll;";
    } else {
        T1input.style.overflowY = "auto";
    }
}
T1input.addEventListener('input', adjustTextareaHeight);
T1input.addEventListener('keydown', (event) => {
    if (event.shiftKey && event.key === 'Enter') {
        event.preventDefault();
        const start = T1input.selectionStart;
        const end = T1input.selectionEnd;
        const value = T1input.value;
        T1input.value = value.substring(0, start) + '\n' + value.substring(end);
        T1input.selectionStart = T1input.selectionEnd = start + 1;
        T1input.scrollTop = T1input.scrollHeight;

    }else if(event.key === "Enter" && !event.shiftKey) {
        event.preventDefault()
        module.send_message("sent", ["profilepicture", "username", T1input.value])
        adjustTextareaHeight()
        
    }
});
adjustTextareaHeight()

document.getElementById("search-for-user").addEventListener("click", ()=>{
    const searchinput = document.getElementById("search-input")
    if (typeof module.load_chat(searchinput.value) != "array"){ //test later
        console.log("exists")
    }
    else {
        utils.generateNotification("Client", "You do not have permission to access this chat.")
    }
})

/*
____________  ___  ___  ___ _____ _    _  ___________ _   __
|  ___| ___ \/ _ \ |  \/  ||  ___| |  | ||  _  | ___ \ | / /
| |_  | |_/ / /_\ \|      || |__ | |  | || | | | |_/ / |/ / 
|  _| |    /|  _  || |\/| ||  __|| |/\| || | | |    /|    \ 
| |   | |\ \| | | || |  | || |___\  /\  /\ \_/ / |\ \| |\  \
\_|   \_| \_\_| |_/\_|  |_/\____/ \/  \/  \___/\_| \_\_| \_/
                                                                       

Original message sent should be client side, messages recieved dropped by server, connected via WS for live updates.
when reclicking, messages should be saved and client messages should be immediately synced.

adding users: must search by full username, no friend requests required. blocking will come later

chats should save under collection with id(1), id(2) and only be accessible if accessing user's PW matches



*/
