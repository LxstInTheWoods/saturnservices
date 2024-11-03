(async ()=>{
    //initialize
    const fileNames_raw = await fetch("https://terminalsaturn.com/photography", {
        method:"GET",
        mode:"cors"
    })
    console.log(fileNames_raw)
})