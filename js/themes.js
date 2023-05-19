const pageheader = document.getElementById("themesheader")
const underscore = document.getElementById("underscore")
async function setpageheadtext(){
    const text = "Customizability"
    var currenttxt = pageheader.textContent

    for (const x of text)
    {
        let p = new Promise((resolve) =>{
            setTimeout(() => {
                currenttxt += x
                pageheader.textContent = currenttxt 
                resolve()
            }, 25);
        })

        await p.then(()=>{})

    }

    async function timer()
    {
        let p = new Promise((resolve) =>{
            setTimeout(() => {

            underscore.animate([{"opacity":0}], {duration:150, fill:'forwards'})
            setTimeout(() => {
                resolve()
            }, 500);
            }, 250);
        })

        await p.then((r)=>{
            underscore.animate([{"opacity":1}], {duration:150, fill:'forwards'})
            timer()
        })

        
    }timer()

} setpageheadtext()