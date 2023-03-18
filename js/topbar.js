const topbar = document.getElementById("top")



for (const value of topbar.getElementsByTagName("h1"))
{
    if (value.className != "t_ign")
    {
        value.addEventListener("mouseenter", () =>{
            value.animate([{color:"#7289da"}], {duration:150, fill:"forwards"})
            value.parentElement.children[1].style.visibility = "visible"
            value.parentElement.children[1].animate([{"width":"100%"}], {duration:150, fill:"forwards"})

        })
        value.addEventListener("mouseleave", () =>{
            value.animate([{color:"white"}], {duration:150, fill:"forwards"})
            value.parentElement.children[1].animate([{"width":"0%"}], {duration:150, fill:"forwards"})
            setTimeout(() => {
                value.parentElement.children[1].style.visibility = "hidden"
            }, 153);
        })

        value.addEventListener("click", ()=>{
            const link = social(value.textContent).split("|")
            if (link[0] == undefined || link[0].length === 0 ) {alert("No redirect set!"); return}
            window.open(link[0], link[1])
        })
        
    }
}