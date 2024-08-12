//GLOBAL MESSAGES ONLY
const i_set =  document.getElementById("i_set").contentWindow
const i_config = document.getElementById("i_config").contentWindow
const gFunc = {
    "500_c":()=>{
        i_set.postMessage("500_cc", "*")
    },
    "501_l":()=>{
        i_set.postMessage("501_ll", "*")
    },
    "500_a":()=>{
        i_config.postMessage("500_aa", "*")

    }
} 
window.addEventListener("message", (event)=>{
    if (gFunc[event.data]) {
        gFunc[event.data]()
    }
})