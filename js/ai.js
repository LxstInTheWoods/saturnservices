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
     userclone.children[1].textContent = document.getElementById("query").value
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
    "model":"gpt-3.5-turbo",
    "messages":[{"role": "user","content":document.getElementById("query").value}] //content is the promp part-will generate response
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


//ai needs chat memory to be saved and for a room to be created for it to remember things you asked. 
