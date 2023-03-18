
async function AboutSS(){
    const aboutss = document.getElementById('aboutSS_index')

    const original = "What is saturn services?"
    const chars = [
        "1",
        "0",
        "1",
        "0"
    ]

    var origintolist = []

    for (const x of original)
    {
        origintolist.push(x)
    }


    async function promiseawait()
    {
    for (const value in origintolist)
    {
        let p = new Promise( async (resolve) =>{

            for (let k = 0; k < chars.length; k++)
            { 

                setTimeout(() => {
                    resolve()
                }, 50);

                let internal = new Promise((resolveInt) =>{
                    setTimeout(() => {
                        origintolist[value] = chars[Math.floor(Math.random() * chars.length) + 1]
                        aboutss.textContent = origintolist.join().replaceAll(",", "") 
                        resolveInt()
                    }, 10);

                })

                await internal.then((f) => {

                })
                }            

            })

            await p.then((f) =>{

            })

    

}
    }

promiseawait()

    await promiseawait()


        var encrtolist = []

        for (let c4c of original)
        {
            encrtolist.push(chars[Math.floor(Math.random() * chars.length) + 1])
        }
        
        setTimeout( async() => {
            for (const c43 in encrtolist)
            {
                let px2 = new Promise((r)=>{
                    setTimeout(() => {
                        encrtolist[c43] = original[c43]
                        aboutss.textContent = encrtolist.join().replaceAll(",", "")
                        r()
                    }, 35);
                })

                await px2.then(()=>{})


            }
            setTimeout(() => {
                AboutSS()
            }, 3500);


    
        }, 200);


}

AboutSS()


//footer

document.getElementById("copyright").textContent += ` Saturn Services 2021-${new Date().getFullYear()}`