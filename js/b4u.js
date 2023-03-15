const coursemod = document.getElementById('crsmd')
coursemod.style.transform = "translateX(-400%)"
const storageclone = document.getElementById('addonstorage')
const addonHolder = document.getElementById('addonholder')
const addtocart = document.getElementById("additemtocart")




document.getElementById('coursebutton').addEventListener("click", () =>{

        coursemod.animate([{transform:"translateX(0%"}], {duration:150, fill:"forwards"})
        
    })


document.getElementsByClassName("closebutton")[0].addEventListener("click", () =>{
    coursemod.animate([{transform:"translateX(-400%"}], {duration:150, fill:"forwards"})

})

document.getElementById('createaddon').addEventListener("click", ()=>{
    const clone = storageclone.children[0].cloneNode(true)
    const tx = clone.appendChild(document.createElement("textarea"))
    const clonemod = clone.firstChild.parentElement
    clonemod.children[2].remove()
    clonemod.style.display = "block"
    clonemod.style.opacity = "0"
    addonHolder.appendChild(clone)
    tx.id = `TX${addonHolder.children.length - 1}`
    clonemod.animate([{"opacity":"1"}], {duration:200, fill:"forwards"})
})


document.getElementById('deleteaddon').addEventListener('click', ()=>{
    try{
        addonHolder.children[addonHolder.children.length - 1].style.opacity = "1"

        addonHolder.children[addonHolder.children.length - 1].animate([{"opacity":"0"}], {duration:200, fill:"forwards"})

        setTimeout(() => {
            addonHolder.children[addonHolder.children.length - 1].remove()               
        }, 190);

      
    }
   catch(err){console.warn("nothing to delete!")}
})

addtocart.addEventListener('click', ()=>{

    var item = {
        addons:[

        ],

    }
    const itemName = document.getElementById("itemname")
    const itemPrice = document.getElementById("itemprice")

    console.log(itemName.children)

    item["name"] = itemName.children[2].value
    item["price"] = itemPrice.children[2].value
    
    var count = 0
    for (const CVALUE of document.getElementById('addonholder').children)
    {
        count += 1
        if (item.className != "jsignore")
        {
            try{
                item.addons.push(document.getElementById(`TX${count}`).value)
            }
            catch(e){}
        }
    }

    coursemod.animate([{transform:"translateX(-400%"}], {duration:150, fill:"forwards"})
    //code to clear form here
})