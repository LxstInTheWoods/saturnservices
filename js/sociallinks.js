function social(x)
{
    const data = {
        discord:["https://discord.gg/UYsdygmX"],
        telegram:["https://t.me/+eOkB8WnJ5n40NDNh"],
        amazon:["./amazon.html", "_self"],
        home:["./index.html", "_self"],
        b4u:["./b4u.html", "_self"]
    }

    return `${data[x.toLowerCase()][0]}|${data[x.toLowerCase()][1]}`
}



if (document.getElementsByClassName("sociallink"))
{
for (const element of document.getElementsByClassName("sociallink"))
{
    element.addEventListener('mouseenter', () => {
        element.animate([{borderColor:"#7289da"}], {duration:150, fill:"forwards"})
    })
    element.addEventListener("mouseleave", () =>{
        element.animate([{borderColor:"white"}], {duration:150, fill:"forwards"})
    })
    element.addEventListener("click", () =>{
        window.open(social(element.id).split("|")[0], social(element.id).split("|")[1])
    })
}

}