function social(x)
{
    const data = {
        discord:"https://discord.gg/jYMwx7cGcg",
        telegram:"https://t.me/+eOkB8WnJ5n40NDNh",
        amazon:"./amazon.html"
    }
    console.log(data[x.toLowerCase()])
    return data[x.toLowerCase()]
}



for (const element of document.getElementsByClassName("sociallink"))
{
    element.addEventListener('mouseenter', () => {
        element.animate([{borderColor:"white"}], {duration:150, fill:"forwards"})
    })
    element.addEventListener("mouseleave", () =>{
        element.animate([{borderColor:"#7289da"}], {duration:150, fill:"forwards"})
    })
    element.addEventListener("click", () =>{
        window.open(social(element.id))
    })
}

