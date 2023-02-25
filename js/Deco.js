const p1anim = document.getElementById('ConsoledecoAnim')

function loop()
{
    console.log("Call")
    setTimeout(() => {
       if (p1anim.textContent === ">_")
       {
        p1anim.textContent = ">"
       } 
       else if (p1anim.textContent === ">")
       {
        p1anim.textContent = ">_"
       }
       loop()
    }, 1000);
}; loop()