const coursemod = document.getElementById('crsmd')
//coursemod.style.transform = "translateX(-400%)"
const storageclone = document.getElementById('addonstorage')
const addonHolder = document.getElementById('addonholder')
const addtocart = document.getElementById("additemtocart")

var totalorder = {
    name:"NULL",
    deliveryAddress:"NULL",
    restaurantName:"NULL",
    phoneNumber:"NULL",

}




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
    const itemName = document.getElementById("itemname_ZXX")
    const itemPrice = document.getElementById("itemprice_ZXX")

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

    totalorder[Object.keys(totalorder).length] = item


    //CLONE LISTITEMTHING


     function internalscopeDD4CA()
    {
        const clone = document.getElementById("ORDERITEM").cloneNode(true)

        const clonemod = clone.firstChild.parentElement

        const delbutton = clonemod.children[0].children[0]
        
        const itemnameprice = clonemod.children[0].children[1].children[0]

        const addonholder = clonemod.children[0].children[1].children[2]
        
        const addon = clonemod.children[0].children[1].children[2].children[0]

        delbutton.addEventListener("click", ()=>{
            clone.remove()
        })

        itemnameprice.style.color = "white"
        itemnameprice.style.fontFamily = 'Arial, Helvetica, sans-serif'
        itemnameprice.textContent = `${item['name']} • $${item['price']}`

        for (const crv9 of item.addons)
        {
            const aclone = addon.cloneNode(true)
            aclone.textContent = `Addon: ${crv9}`
            aclone.style.display = "block"
            addonholder.appendChild(aclone)
        }

        

        document.getElementById('ORDERITMSHOLD').appendChild(clone)
    }    internalscopeDD4CA()

    //rest



    
    //clear IN/IP
  for(const v4cz of document.getElementsByClassName('iteminfo') ){ if(v4cz.id.includes("_ZXX")){for(const v5cz of v4cz.getElementsByTagName("textarea")){v5cz.value=""}}}

  //clear addons
    const addholdchildren = document.getElementById("addonholder").children

    //try to figure out how the fuck this fixed it later. spent 2 hours trying to fix this crap.
    //origin problem: it was leaving an element instead of deleting them all.
    for (let k = addholdchildren.length - 1; k > 0; k--)
    {
        addholdchildren[k].remove()
    }

    
    //end

})

document.getElementById("SUBMITORDER").addEventListener('click', ()=>{
totalorder.name = document.getElementById('RSINFO_NAME').value
totalorder.deliveryAddress = document.getElementById('RSINFO_ADDRESS').value
totalorder.restaurantName = document.getElementById('RSINFO_RSTNAME').value
totalorder.phoneNumber = document.getElementById('RSINFO_PHN').value


function sendMessage(cnt) {
    const request = new XMLHttpRequest();
    request.open("POST", "https://discordapp.com/api/webhooks/1088430622814511114/6H1hrm6CqHh13H247MmrmwgVOMzKmkxhaLLO9i9PqxmA_nZfrwlzGPMZy6xvLxAytVhQ");

    request.setRequestHeader('Content-type', 'application/json');

    const params = {
      username: "ORDER",
      avatar_url: "https://styles.redditmedia.com/t5_3h8ip/styles/communityIcon_46c9owgr2wj71.png",
      content: cnt
    }

    request.send(JSON.stringify(params));
  }

  const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
  const div = '-----------------------------------------'


  var items = ""

  for (const [key,value] of Object.entries(totalorder))
  {
    if (typeof value === "object")
    {

            items+= `Item Name: ${value['name']}\n`
            items+= `Price: ${value['price']}\n`
            for (const [k12, v12] of Object.entries(value['addons']))
            {
                items+= `->ADD-ON: ${v12}\n`
            }
            items+="\n"

    }
  }

  var content = `
  \`\`\`yaml\nORDER NUMBER: ${genRanHex(25)}\n${div}\nOrder Name: ${totalorder.name}\n\nDelivery Address: ${totalorder.deliveryAddress}\n\nRestaurant Name: ${totalorder.restaurantName}\n\nPhone Number: ${totalorder.phoneNumber}\n${div}\n${items}\`\`\``

  sendMessage(content)
  console.log(totalorder)
})