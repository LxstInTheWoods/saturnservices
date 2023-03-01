function social(x)
{
    const data = {
        discord:["https://discord.gg/jYMwx7cGcg"],
        telegram:["https://t.me/+eOkB8WnJ5n40NDNh"],
        amazon:["./amazon.html", "_self"],
        home:["./index.html", "_self"]
    }
    console.log(`${data[x.toLowerCase()][0]}|${data[x.toLowerCase()][1]}`)
    return `${data[x.toLowerCase()][0]}|${data[x.toLowerCase()][1]}`
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
        window.open(social(element.id).split("|")[0], social(element.id).split("|")[1])
    })
}

