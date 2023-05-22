const images = [
    document.getElementById("0"),
    document.getElementById("1"),
    document.getElementById("2"),
    document.getElementById("3")
]
const image = document.getElementById("IMGG")
var current = 0


async function Set(){
    let p = new Promise( async (resolve) =>{
    for (const [v, x] of Object.entries(images))
    {

        let _pinternal = new Promise((intres)=>{
  images[parseInt(v)].animate([{right:"0%"}], {duration:1500, fill:"forwards"})

            setTimeout(() => {
                intres() 
            }, 1500);


        })

        await _pinternal.then(()=>{
            if (parseInt(v) === images.length - 1)
            {
                setTimeout(() => {
                    images[parseInt(v) ].animate([{right:"1000%"}], {duration:250, fill:"forwards"})
                }, 1500);
            }
            else{images[parseInt(v) + 1 ].animate([{right:"1000%"}], {duration:1500, fill:"forwards"})}

        })

    }

    resolve()

}) //end promise

    await p.then((r) =>{
        Set()
    })
}

Set()

//in images[parseInt(v)  ].animate([{right:"0%"}], {duration:1500, fill:"forwards"})
//out images[parseInt(v) + 1 ].animate([{right:"1000%"}], {duration:1500, fill:"forwards"})