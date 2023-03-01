const joindiscord = document.getElementsByClassName("joindiscord")

for (const value of joindiscord)
{

        value.addEventListener("mouseenter", function(){
        value.animate([{borderColor:"#FFFFFFFF"}], {duration:250, fill:"forwards"})
        })

        value.addEventListener("mouseleave", function(){
            value.animate([{borderColor:"#7289da"}], {duration:250, fill:"forwards"})
        })

        value.addEventListener("click", function(){
            window.open(social("discord").split("|")[0], social("discord").split("|")[1])
        })

}

//footer

document.getElementById("copyright").textContent += ` Saturn Services 2021-${new Date().getFullYear()}`