var current = ""
//scripted at 3am so its awful code
var currentAddonIndex = 0
const cloneOrigin = document.getElementById("clonecartitem").cloneNode(true)
cloneOrigin.firstChild.parentElement.style.display = "none"

document.body.appendChild(cloneOrigin) 


document.getElementById("AddItem").addEventListener("click", function(){

  const clone = document.getElementById("clonecartitem").cloneNode(true).firstChild.parentElement


  if (document.getElementsByClassName("cartdetailslist")[0].children.length  === 0)
  {
    clone.getElementsByTagName("br")[0].remove()
  }

  document.getElementsByClassName("cartdetailslist")[0].appendChild(clone)

  clone.firstChild.parentElement.style.display = "contents"
  clone.firstChild.parentElement.style.paddingLeft = "3em"

  //add an add on
  clone.firstChild.parentElement.children[3].addEventListener("click", ()=>{
    //

  })

})

  function sendMessage(Str) {
    //in archive for security
  }



document.getElementById("submit").addEventListener("click", function(){
  current = ""
  for (const value of document.getElementsByClassName("maindetailslist")[0].children)
  {
    current += ` ${value.children[0].textContent} : ${value.children[1].children[0].value} -- `
  }

  sendMessage(current)
})



document.getElementById("DeleteItem").addEventListener("click", function(){
  console.log( document.getElementsByClassName("cartdetailslist")[0].children.length)
  console.log(  document.getElementsByClassName("cartdetailslist")[0].children[document.getElementsByClassName("cartdetailslist")[0].children.length - 1])
  document.getElementsByClassName("cartdetailslist")[0].children[document.getElementsByClassName("cartdetailslist")[0].children.length - 1].remove()
})

