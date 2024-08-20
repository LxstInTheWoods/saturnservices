let userdata
const endpoint = "https://api.terminalsaturn.com:444/"
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

export async function delay(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
}
export async function generateNotification(source, content) {
    const notificationDiv = document.getElementById("notifscontainer")
    const notificationsStorage = document.getElementById("nfstg")
    if (!notificationsStorage){return null}
    const container = document.getElementById("notifications")
    const notif = notificationsStorage.children[0].cloneNode(true)

    notif.children[0].textContent = source
    notif.children[1].textContent = content
    container.appendChild(notif)
    notif.animate([{ "opacity": 1 }], { duration: 250, "fill": "forwards" })


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
    return JSON.parse(localStorage.getItem("user"))
}

export async function loginSite(fbody) {
    console.log(fbody)
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
       await fetch("https://api.terminalsaturn.com:444/ping", {
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
    console.log("ok")
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