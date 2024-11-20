let userdata
const endpoint = "https://terminalsaturn.com/"
export const contextMenu = document.getElementById('context-menu');
if (localStorage.getItem("user")) {
    userdata = localStorage.getItem("user")
}

export function logOut() {
    localStorage.clear()
    setTimeout(() => {
        location.reload()
    }, 200);
}


export function randomHex(size){
    return  [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
}

export async function readData() {
    //autosets
    const response = await fetch(`${endpoint}/readwrite`, {
        method:"POST",
        mode:"cors",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            "type":"read",
            userdata:getUserData()
        })
    })
    const rr = await response.json()
    localStorage.setItem("user", JSON.stringify(rr))
    return rr
}

export function update_tab_name(str){
    const tab_name = document.getElementById("tabnm")
    tab_name.textContent = str
}

export async function writeData(updated){
    localStorage.setItem("user", JSON.stringify(updated))
    await fetch(`${endpoint}readwrite`, {
        method:"POST",
        mode:"cors",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            "type": "write",
            "userdata": updated
        })
    })
}
export function create_atag(str, link){
    const style = `style="color:wheat; text-decoration:none;"`
    return `<a ${style} href="${link}">${str}</a>`
}

export async function delay(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
}
export async function generateNotification(source, content, dur) {
    const notificationDiv = document.getElementById("notifscontainer")
    const notificationsStorage = document.getElementById("nfstg")
    if (!notificationsStorage){return null}
    const container = document.getElementById("notifications")
    const notif = notificationsStorage.children[0].cloneNode(true)

    notif.children[0].textContent = source
    notif.children[1].innerHTML = content
    container.appendChild(notif)
    if (dur != "inf"){
        notif.animate([{ "opacity": 1 }], { duration: dur ? dur : 250, "fill": "forwards" })   
    }

    function fadeOut() {
        const anim = notif.animate([{ "opacity": 0 }], { duration: 250, "fill": "forwards" })
        anim.onfinish = () => {
            notif.remove()
        }
    }
    notif.addEventListener("mouseenter", () => {
        notif.animate([{ "backgroundColor": "#363636" }], { duration: 250, "fill": "forwards" })

    })
    notif.addEventListener("mouseleave", () => {
        notif.animate([{ "backgroundColor": "#2c2c2c" }], { duration: 250, "fill": "forwards" })
    })
    notif.addEventListener("click", () => {
        fadeOut()
    })
    setTimeout(() => {
        fadeOut()
    }, 5000);
}

export function getUserData() {
    const ud = JSON.parse(localStorage.getItem("user"));
    return ud && typeof ud === "object" ? ud : null
}

export async function loginSite(fbody) {
    return await fetch(`${endpoint}loginsite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: 'cors',
        body: JSON.stringify(fbody)
    })
}

export async function commands(fbody) {
    return await fetch(`${endpoint}command`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify(fbody)
    })
}

export async function ping() {
    try {
       await fetch("https://terminalsaturn.com/ping", {
            mode: "cors",
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
        return true
    } catch (err) {
        return false
    }
}



export function clearcontext() {
    contextMenu.style.display = 'none';
    for (const x of [...document.getElementById("context").children]) {
        x.remove()
    }
}
export function generateContext(text) {
    const context = document.createElement('li')
    context.textContent = text
    context.addEventListener("mouseenter", function () {
        context.animate([{ "backgroundColor": "#454545" }], { duration: 250, "fill": "forwards" })
    })
    context.addEventListener("mouseleave", () => {
        context.animate([{ "backgroundColor": "#252524" }], { duration: 250, "fill": "forwards" })
    })
    document.getElementById("context").appendChild(context)
    return context
}



export function interact(event) {
    contextMenu.style.display = "block"
    contextMenu.style.left = `${event.clientX}px`;
    contextMenu.style.top = `${event.clientY}px`;
}
if (contextMenu) {

    document.addEventListener('click', function () {
        clearcontext()
    });
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            clearcontext()
        }
    });
}