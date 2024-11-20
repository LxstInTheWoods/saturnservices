import * as module from "./chatmodules.js"
import * as utils from "../modules.js"
//send message handler 
const endpoint_websocket = "https://terminalsaturn.com/ws_chat"
const requests = "https://terminalsaturn.com/chat"


const user_data = utils.getUserData()

var current_chat = null

export async function local_update(type, data) {
    if (type === 1) {
        current_chat = data
        console.log(current_chat)
    } else if (type === 2) {
        return current_chat
    } else if (type === 3) {
        current_chat = null
    }
}


if (!user_data) { utils.generateNotification("OneChat", `You must create an account at ${utils.create_atag("TerminalSaturn", "https://terminalsaturn.com")} to use this service`, "inf"); } else {

    var chats = utils.getUserData()['data']['chat']

    async function searchuser(given) {
        const searchinput = document.getElementById("search-input")
        if (!given && searchinput.value === utils.getUserData()['username']){
            utils.generateNotification("Client", "You cannot search for yourself.");
            return;
        }
        const cmpr = module.comparestrings(utils.getUserData()['username'], given ? given : searchinput.value)
        console.log(cmpr, '#@$#@F')
        if (cmpr === current_chat){return}

        const lr = await module.load_chat(given ? given : searchinput.value, chats, given ? "only" : true)

        //fix bug where searchinbg when nothing is cached in the client makes it so you have to click again else error.
        if (!lr) { console.warn("NO LR"); utils.generateNotification("Client", "An error occured, try again."); return}
        if (!Array.isArray(lr)) { //test later
            current_chat = cmpr
            chats[lr['targetData']['username']] = lr
            let copy = structuredClone(utils.getUserData())
            copy['data']['chat'][lr['targetData']['username']] = lr

            //make it so if the user doesnt already exist inside to preserve resources
            utils.writeData(copy)
    
    
        }
        else {
            utils.generateNotification("Client", "User not found")
        }
    }

    if (localStorage.getItem('lastchat') && localStorage.getItem('lastchat') in chats){ 
        console.log("loading last")
        searchuser(localStorage.getItem("lastchat")) 
    }//load last chat


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

    function send_message_actual() {
        const udata = utils.getUserData()
        module.send_message("sent", [udata['profilepicture'], udata['username'], T1input.value], current_chat)
        adjustTextareaHeight()
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
            adjustTextareaHeight()

        } else if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault()
            send_message_actual()

        }
    });

    document.getElementById('send-button').addEventListener("click", () => {
        send_message_actual()
    })
    adjustTextareaHeight()

    module.init_self()

    document.getElementById("search-for-user").addEventListener("click", ()=>searchuser())

}

console.log(await utils.readData())


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


chats need to be cached and loaded, not loaded all at once. can do later so you dont have to script limitations for saving

make it so you cant message yourself

*/

