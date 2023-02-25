const nav = document.getElementById("top")
var navhead = nav.getElementsByTagName("h1")

const NavLinks = [
    "https://discord.gg/he2C66bS",
    null,
    "https://www.roblox.com/games/9874957650/SoftPoint"
]

for (let i = 0; i <= navhead.length; i++)
{
    const header = navhead[i]
    
    const Duration = 250;
    const Fill = "forwards"
    if (typeof header === "object" && header.id != "ign")
    {
        header.addEventListener('mousedown', () => {
            window.open(NavLinks[i])
        })

        header.addEventListener('mouseenter', () => {
         header.animate([{color:"#7289da"}], {duration:Duration, fill:Fill})   
        })
        
        header.addEventListener('mouseleave', () => {
            header.animate([{color:"#FFFFFF"}], {duration:Duration, fill:Fill})   
           })

    }
}

const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownMenu = document.querySelector('.dropdown-menu');

dropdownBtn.addEventListener('click', () => {
  dropdownMenu.classList.toggle('show');
});


const funcs = [
    function(){
        console.log("Cat")
    }
]

funcs[Math.floor(Math.random() * funcs.length)]()