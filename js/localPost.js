//GLOBAL MESSAGES ONLY
const i_set =  document.getElementById("i_set").contentWindow
const gFunc = {
    "500_c":()=>{
        i_set.postMessage("500_cc", "*")
    },
    "501_l":()=>{
        i_set.postMessage("501_ll", "*")
    }
}
window.addEventListener("message", (event)=>{
    if (gFunc[event.data]) {
        gFunc[event.data]()
    }
})