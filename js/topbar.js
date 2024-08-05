const topbar = document.getElementById("topbar")

document.getElementById("cscpfp").addEventListener("click", function(){
    window.parent.postMessage("500_c", "*" )
})

window.addEventListener('message', function(event) {
        if (!event.data[1]){return}
        if (!localStorage.getItem("ts")){
            document.getElementById('cscpfp').src = './img/guesticon.png'; 
            return
        }
        document.getElementById('cscpfp').src = event.data[1];

});
function handleImageError(image) {
    image.onerror = null; 
    image.src = './img/guesticon.png'; 
    console.warn("Fallback image set due to an error loading the primary image.");
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
