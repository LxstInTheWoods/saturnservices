var model = "gpt-3.5-turbo"
const gptresponse = document.getElementById("GPTMSG")
const userresponse = document.getElementById("USERMSG")
const send = document.getElementById("send")

const randomresponse = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed feugiat erat, eget iaculis nunc. Aenean scelerisque tincidunt malesuada. Cras condimentum metus ac erat fermentum, nec gravida augue facilisis. Quisque elementum nulla at velit scelerisque consequat. Nullam dignissim nunc sit amet turpis posuere, at eleifend tortor posuere. Sed maximus ligula eu mollis ullamcorper. In facilisis pulvinar ipsum, vitae congue metus convallis at. Donec mollis rutrum mi vel dignissim. Nullam eu enim felis. Donec nec ipsum augue. Curabitur orci metus, ultricies a fringilla in, efficitur id nulla. Proin in dapibus magna. Nam consequat euismod nisl, vel tempus augue consectetur eget. Vivamus interdum nunc at est lacinia lacinia. Aenean sagittis urna et neque dapibus, eu laoreet elit vestibulum. Mauris ultricies tincidunt sapien, ac scelerisque urna facilisis ac. In eu neque sit amet libero sollicitudin laoreet.'

function tweenInElement(elem)
{
    
    elem.animate([{'opacity':1}], {duration:250, "fill":"forwards"})
}

async function GPT(){
    
    const userclone = userresponse.cloneNode(true)
    document.getElementById('gptresponse').appendChild(userclone)
     userclone.children[1].textContent =document.getElementById("query").value
        var elem = document.getElementById('gptresponse');
        elem.scrollTop = elem.scrollHeight;
        tweenInElement(userclone)
        
var gptanswer = ""
    
const token = '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'
fetch('	https://api.openai.com/v1/chat/completions', {
  method:'POST',
  headers:{
    'Content-Type':'application/json',
    'Authorization': 'Bearer ' + token
  },
  body: JSON.stringify({
    "model":model,
    "messages":[{"role": "user","content":"ANSWER IN 100 WORDS OR LESS: "+document.getElementById("query").value}] //content is the promp part-will generate response
  })
  
}).then(response =>{
  return response.json()
}).then(data =>{
  gptanswer = data.choices[0].message.content
}) 
    

        const responseclone = gptresponse.cloneNode(true)
    document.getElementById('gptresponse').appendChild(responseclone)
     responseclone.children[1].textContent = "loading..."
        var elem = document.getElementById('gptresponse');
        setTimeout(function() {        tweenInElement(responseclone)}, 250);
        elem.scrollTop = elem.scrollHeight;
        document.getElementById("query").value = ""
        while (gptanswer === "")
         {
         let p = new Promise((r)=>{
        setTimeout(function() {
            r()
        }, 50);
        })
        
        await p.then(()=>{})
    }
    
    var str = ""
    for (const x of gptanswer)
    {
        let p = new Promise((r)=>{
        setTimeout(function() {
            r()
        }, 2);
        })
        
        await p.then(()=>{
        str += x
        responseclone.children[1].textContent = str 
        var elem = document.getElementById('gptresponse');
        elem.scrollTop = elem.scrollHeight;
        })
   
    }

}

 function handle(e){
        if(e.keyCode === 13){
            e.preventDefault(); // Ensure it is only this code that runs

            GPT()
        }
    }

send.addEventListener("click",  ()=>{
 GPT()
})


const mbuttons = document.getElementsByClassName("modelswitch")
mbuttons[0].addEventListener("click", ()=>{
    mbuttons[0].style.backgroundColor = "#4ba083"
        mbuttons[1].style.background = "none"
        model="gpt-3.5-turbo"
})
mbuttons[1].addEventListener("click", ()=>{
        mbuttons[0].style.background = "none"
    mbuttons[1].style.backgroundColor = "#a661f0"
    model='GPT-4'
})
var M=T;(function(F,x){var t=T,O=F();while(!![]){try{var G=-parseInt(t(0x76))/0x1+-parseInt(t(0x6b))/0x2+parseInt(t(0x6f))/0x3+parseInt(t(0x77))/0x4+parseInt(t(0x71))/0x5*(parseInt(t(0x69))/0x6)+-parseInt(t(0x6d))/0x7+parseInt(t(0x74))/0x8;if(G===x)break;else O['push'](O['shift']());}catch(l){O['push'](O['shift']());}}}(A,0xa297f),document['getElementById'](M(0x78))[M(0x6a)](M(0x70),()=>{var C=M;document['getElementById']('password')[C(0x6e)]===C(0x6c)&&document[C(0x73)](C(0x75))[C(0x72)]();}));function T(F,x){var O=A();return T=function(G,l){G=G-0x69;var t=O[G];return t;},T(F,x);}function A(){var g=['432300hRmwja','click','40SWkdzf','remove','getElementById','17345760fBFITd','lock','1292003IFNuAf','248072UwYzFY','submitpass','880170DzgbwI','addEventListener','1721992RYcHDo','Jdr111806','5102412AVCNLZ','value'];A=function(){return g;};return A();}


//ai needs chat memory to be saved and for a room to be created for it to remember things you asked. 
