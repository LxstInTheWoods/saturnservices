const topbar = document.getElementById("topbar")

window.addEventListener('message', function(event) {
        console.log("Profile picture received in iframe:", event.data[1]);
        document.getElementById('cscpfp').src = event.data[1];

});
function handleImageError(image) {
    image.onerror = null; 
    image.src = './img/guesticon.png'; 
    console.log("Fallback image set due to an error loading the primary image.");
}

function openprofile(element){

}

for(const x of [...topbar.getElementsByTagName("a")])
{
    
    if (x.className != "jsignore")
    {
        try{
    const hr = x.parentElement.children[1]
    x.addEventListener("mouseenter", () =>{
        hr.style.visibility = "visible"
        hr.animate([{width:"100%"}], {duration:50, fill:"forwards"})
    })

    x.addEventListener("mouseleave", () =>{
        hr.animate([{width:"0%"}], {duration:50, fill:"forwards"}).finished.then(()=>{
            hr.style.visibility = "hidden"

        })
    })
}catch(e){alert(e)}
}
}
