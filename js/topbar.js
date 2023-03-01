const topbar = document.getElementById("top")



for (const value of topbar.getElementsByTagName("h1"))
{
    if (value.className != "t_ign")
    {
        value.addEventListener("mouseenter", () =>{
            value.animate([{color:"#7289da"}], {duration:150, fill:"forwards"})
        })
        value.addEventListener("mouseleave", () =>{
            value.animate([{color:"white"}], {duration:150, fill:"forwards"})
        })

        value.addEventListener("click", ()=>{
            const link = social(value.textContent)
            console.log(link)
            if (link == undefined || link.length === 0 ) {alert("No redirect set!"); return}
            window.open(link, "_self")
        })
        
    }
}