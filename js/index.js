const thing = document.getElementById("SSINTRO")

const divid_top = document.getElementsByClassName("divid_top")

const typewrite = document.getElementById("csttpwrt2")

const aqhead = document.getElementById("aqhead")


thing.animate([{opacity:1}], {duration:500, fill:'forwards'})

setTimeout(() => {
    for (const x of divid_top)
    {
    x.animate([{width:"85%"}], {duration:450, fill:"forwards"})
    }
    aqhead.animate([{opacity:1}], {duration:250, fill:"forwards"})

    const str = "Where darkness and light intersect."
    var cur = ""
    _ = async () =>{
    for (const x of str)
    {


            let p = new Promise((r) =>{
                setTimeout(() => {
                    cur += x
                    typewrite.textContent = cur
                    r()
                }, 7);
            })
            
            await p.then(()=>{})
    }
};  _()


    
}, 500);



for (const [x, v] of Object.entries(document.getElementById("aboutholder").children))
{
v.addEventListener("mouseenter", function(){
    v.animate([{backgroundColor:"#343434", borderColor:"white"}], {duration:250, fill:"forwards"})
})
v.addEventListener("mouseleave", function(){
    v.animate([{backgroundColor:"rgb(24,24,24)", borderColor:"rgb(24,24,24)"}], {duration:250, fill:"forwards"})

})
}

const dnld = document.getElementsByClassName("order")[0]
dnld.addEventListener("mouseenter", ()=>{
dnld.animate([{boxShadow:"0 0 10px white, 0 0 30px white, 0 0 50px white"}], {duration:150, fill:"forwards"})
})
dnld.addEventListener("mouseleave", ()=>{
    dnld.animate([{boxShadow:"0 0 10px #115dd6, 0 0 30px #115dd6, 0 0 50px #115dd6"}], {duration:150, fill:"forwards"})
})





//basic af
