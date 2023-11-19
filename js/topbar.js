const topbar = document.getElementById("topbar")

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


