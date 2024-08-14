const wsUrl = 'wss://api.terminalsaturn.com:1111';
const socket = new WebSocket(wsUrl);

async function generateNotification(source, content) {
    const notificationDiv = document.getElementById("notifscontainer")
    const notificationsStorage = document.getElementById("nfstg")
    const container = document.getElementById("notifications")
    const notif = notificationsStorage.children[0].cloneNode(true)

    notif.children[0].textContent = source
    notif.children[1].textContent = content
    container.appendChild(notif)

    function fadeOut() {
        const anim = notif.animate([{"opacity":0}], {duration:250, "fill":"forwards"})
        anim.onfinish = () => {
            notif.remove()
        }
    }
    notif.addEventListener("mouseenter", ()=>{
        notif.animate([{"backgroundColor":"#363636"}], {duration:250, "fill":"forwards"})

    })
    notif.addEventListener("mouseleave", ()=>{
        notif.animate([{"backgroundColor":"#2c2c2c"}], {duration:250, "fill":"forwards"})
    })
    notif.addEventListener("click", () =>{
        fadeOut()
    })
    setTimeout(() => {
        fadeOut()
    }, 5000);
    
    
}

socket.onopen = function (event) {
    socket.send(JSON.stringify({ type: '01', message: localStorage.getItem("user")}));
};

socket.onmessage = function (event) {
    if (event.data === "rload") {
        generateNotification("Admin", "Your data was updated and your page will be automatically refreshed in 3 seconds.")
        setTimeout(() => {
            location.reload()
        }, 1000*3);
    }else
    {
        generateNotification("Server", event.data)
    }
};

socket.onclose = function (event) {
    console.log('WebSocket connection closed:', event.reason);
};

socket.onerror = function (error) {
    console.error('WebSocket error:', error.message);
};
//make socket connections require password when connecting via username - security/bug