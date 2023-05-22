const topbar = document.getElementById("topbar")

for(const x of topbar.getElementsByTagName("a"))
{

    if (x.parentElement.children[0].tagName === "IMG")
    {  
        x.parentElement.children[0].addEventListener("mouseenter", ()=>{
            x.parentElement.children[0].addEventListener("mouseenter", () =>{

                x.animate([{color:"white"}], {duration:150, fill:"forwards"})
            })
        
            x.parentElement.children[0].addEventListener("mouseleave", () =>{
                x.animate([{color:"#666666"}], {duration:150, fill:"forwards"})
            })
        })
    }
    x.addEventListener("mouseenter", () =>{
        x.animate([{color:"white"}], {duration:150, fill:"forwards"})
    })

    x.addEventListener("mouseleave", () =>{
        x.animate([{color:"#666666"}], {duration:150, fill:"forwards"})
    })
}


