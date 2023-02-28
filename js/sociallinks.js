const data = fetch('./data.json')
const slinks = {
    telegram:"https://t.me/+eOkB8WnJ5n40NDNh",
    discord:data.yes
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
        console.log(element.value)
    })
}