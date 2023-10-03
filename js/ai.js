var model = "gpt-3.5-turbo";
    const gptresponse = document.getElementById("GPTMSG");
    const userresponse = document.getElementById("USERMSG");
    const token = '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';
    const modelcolor = {
        "gpt-3.5-turbo": '#55e078',
        "gpt-4": '#bf95f0'
    }
    
    const send = document.getElementById("send");
    var rooms = {};
    var currentroom = 0;
    
    const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    
    const T1input = document.getElementById("query");
        
        function adjustTextareaHeight(){
            T1input.style.height = 'auto';
            T1input.style.height = T1input.scrollHeight + 'px'
            
            if (T1input.scrollHeight > parseInt(getComputedStyle(T1input).maxHeight)){
                T1input.style.overflowY = "scroll;"
            }else{
                T1input.style.overflowY = "auto"
            }
        }
        T1input.addEventListener('input', adjustTextareaHeight)
        adjustTextareaHeight()
        
        T1input.addEventListener('keydown', (event) => {
      if (event.shiftKey && event.key === 'Enter') {
        event.preventDefault();
        const start = T1input.selectionStart;
        const end = T1input.selectionEnd;
        const value = T1input.value;
        T1input.value = value.substring(0, start) + '\n' + value.substring(end);
        T1input.selectionStart = T1input.selectionEnd = start + 1;
        T1input.scrollTop = T1input.scrollHeight;
        
        
      }
    });
        
    function tweenInElement(elem) {
        elem.animate([{
            'opacity': 1
        }], {
            duration: 250,
            "fill": "forwards"
        });
    }
    
    
    async function LogTable(TB, reloop, v) {
        try {
            for (let x in TB) {
                var el = document.createElement("label");
                if (reloop) {
                    el.textContent = `(table:${v} --> ${x}:${TB[x]}   )   `;
    
                } else {
                    el.textContent = `(    ${x}:${TB[x]}   )   `;
    
                }
                el.style.color = "white";
    
                if (typeof TB[x] === "object") {
                    LogTable(TB[x], true, x);
                } else {
                    document.getElementById('gptresponse').appendChild(el);
                }
            }
        } catch (err) {
            alert(err);
        }
    }
    
    async function GPT() {
        const tstring = document.getElementById("query").value
    const hasLetters = /[a-zA-Z]/.test(tstring);
      const hasNumbers = /\d/.test(tstring);
    
        if (hasLetters || hasNumbers)
        {
        
        if (currentroom === 0 || document.getElementById(currentroom).children[0].textContent === "Untitled room") {
    
            const elements = [...document.getElementsByClassName('GPTMSG')];
            for (const x of elements) {
                if (x.parentNode.id !== "storage") {
                    x.remove();
                }
            }
    
            var clone;
            if (currentroom === 0) {
                currentroom = genRanHex(12);
                rooms[currentroom] = {
    
                };
    
                clone = document.getElementById("cloneroom").cloneNode(true);
                clone.id = currentroom;
                clone.animate([{
                    borderColor: "white"
                }], {
                    duration: 250,
                    fill: "forwards"
                });
    
                clone.addEventListener("click", () => {
    
                    //code for created room here
    
                    const elements = [...document.getElementsByClassName('GPTMSG')];
                    for (const x of elements) {
                        if (x.parentNode.id !== "storage") {
                            x.remove();
                        }
                    }
                    for (let k of Object.keys(rooms[clone.id])) {
                        if (k.includes("user_")) //make the chatbox match the gpt purple based on 3.5 or 4 
                        {
                            var ucl = userresponse.cloneNode(true);
                            document.getElementById('gptresponse').appendChild(ucl);
                            ucl.children[1].textContent = rooms[clone.id][k];
                            tweenInElement(ucl)
                        } else {
                            const responseclone = gptresponse.cloneNode(true);
                            document.getElementById('gptresponse').appendChild(responseclone);
                            responseclone.children[1].textContent = rooms[clone.id][k];
                            tweenInElement(responseclone)
                        }
                    }
    
                    for (const x of document.getElementById("chats").children) {
                        if (x.className === "room") {
                            x.animate([{
                                borderColor: "#454545"
                            }], {
                                duration: 250,
                                fill: "forwards"
                            });
                        }
                    }
                    clone.animate([{
                        borderColor: "white"
                    }], {
                        duration: 250,
                        fill: "forwards"
                    });
                    currentroom = clone.id;
    
                });
    
                document.getElementById("chats").appendChild(clone);
                clone.animate([{
                    opacity: 1
                }], {
                    duration: 250,
                    fill: "forwards"
                });
            } else {
                clone = document.getElementById(currentroom);
            }
    
    
            async function tx34() {
                var str = "";
    
                for (const x of document.getElementById("query").value) {
                    let p = new Promise((r) => {
                        setTimeout(function() {
                            r();
                        }, 10);
                    });
    
                    await p.then(() => {
                        str += x;
                        document.getElementById(currentroom).children[0].textContent = str;
    
                    });
                }
            }
            tx34();
    
        }
    
        const userclone = userresponse.cloneNode(true);
        document.getElementById('gptresponse').appendChild(userclone);
        userclone.children[1].innerHTML = document.getElementById("query").value.replace(/\n/g, "<br>");
        var elem = document.getElementById('gptresponse');
        rooms[currentroom]['user_' + genRanHex(8)] = document.getElementById("query").value;
        elem.scrollTop = elem.scrollHeight;
        tweenInElement(userclone);
    
        const gptresponsehex = genRanHex(8)
        rooms[currentroom][`gpt_${model}_` + gptresponsehex] = "Generating response...(if this takes too long api key may be expired or api connection is blocked)";
    
    
        var gptanswer = "";
        fetch('	https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + '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'
            },
            body: JSON.stringify({
                "model": model,
                "messages": [{
                    "role": "user",
                    "content": "ANSWER IN 100 WORDS OR LESS: " + document.getElementById("query").value
                }]
            })
        }).then(response => {
            return response.json();
        }).then(data => {
            gptanswer = data.choices[0].message.content;
            rooms[currentroom][`gpt_${model}_` + gptresponsehex] = gptanswer;
    
        });
    
    
        const responseclone = gptresponse.cloneNode(true);
        document.getElementById('gptresponse').appendChild(responseclone);
        responseclone.children[1].textContent = "Generating response...(if this takes too long api key may be expired or api connection is blocked)";
        elem = document.getElementById('gptresponse');
    
    
    
        if (model === "gpt-3.5-turbo") {
            responseclone.style.borderColor = "#55e078";
        } else {
            responseclone.style.borderColor = "#bf95f0";
        }
    
        setTimeout(function() {
            tweenInElement(responseclone);
        }, 250);
    
        elem.scrollTop = elem.scrollHeight;
        document.getElementById("query").value = "";
    
        while (gptanswer === "") {
            let p = new Promise((r) => {
                setTimeout(function() {
                    r();
                }, 50);
            });
    
            await p.then(() => {})
        }
    
        rooms[currentroom][`gpt_${model}_` + gptresponsehex] = gptanswer;
        var str = "";
        for (const x of gptanswer) {
            let p = new Promise((r) => {
                setTimeout(function() {
                    r();
                }, 2);
            });
    
            LogTable(rooms)
    
            await p.then(() => {
                str += x;
                responseclone.children[1].textContent = str;
                var elem = document.getElementById('gptresponse');
                elem.scrollTop = elem.scrollHeight;
    
    
    
            });
    
        }
    }
    }
    
    document.getElementById("roomcreate").addEventListener("click", () => {
    
        const elements = [...document.getElementsByClassName('GPTMSG')];
        for (const x of elements) {
            if (x.parentNode.id !== "storage") {
                x.remove();
            }
        }
    
        const hex = genRanHex(12);
        currentroom = hex;
        rooms[currentroom] = {
    
        }
    
        const clone = document.getElementById("cloneroom").cloneNode(true)
        document.getElementById("chats").appendChild(clone)
        for (const x of document.getElementById("chats").children) {
            if (x.className === "room") {
                x.animate([{
                    borderColor: "#454545"
                }], {
                    duration: 250,
                    fill: "forwards"
                })
            }
        }
    
        clone.animate([{
            borderColor: "white"
        }], {
            duration: 250,
            fill: "forwards"
        })
    
        clone.animate([{
            opacity: 1
        }], {
            duration: 250,
            fill: "forwards"
        })
        clone.id = hex
        currentroom = clone.id
    
        clone.addEventListener("click", () => {
    
            if (currentroom != clone.id) {
    
                const elements = [...document.getElementsByClassName('GPTMSG')];
                for (const x of elements) {
                    if (x.parentNode.id !== "storage") {
                        x.remove();
                    }
                }
    
    
                for (let k of Object.keys(rooms[clone.id])) {
                    if (k.includes("user_")) //make the chatbox match the gpt purple based on 3.5 or 4 
                    {
                        var ucl = userresponse.cloneNode(true);
                        document.getElementById('gptresponse').appendChild(ucl);
                        ucl.children[1].textContent = rooms[clone.id][k];
                        tweenInElement(ucl)
                    } else {
                        const responseclone = gptresponse.cloneNode(true);
                        document.getElementById('gptresponse').appendChild(responseclone);
                        responseclone.children[1].textContent = rooms[clone.id][k];
                        responseclone.style.borderColor = modelcolor[k.split("_")[1]]
    
                        tweenInElement(responseclone)
                    }
                }
    
    
            } //else same room
    
            for (const x of document.getElementById("chats").children) {
                if (x.className === "room") {
                    x.animate([{
                        borderColor: "#454545"
                    }], {
                        duration: 250,
                        fill: "forwards"
                    })
                }
            }
    
            clone.animate([{
                borderColor: "white"
            }], {
                duration: 250,
                fill: "forwards"
            })
    
            currentroom = clone.id
    
    
        })
    
        async function tx34() {
            var currentroominternal = currentroom
            var str = ""
            for (const x of "Untitled room") {
                let p = new Promise((r) => {
                    setTimeout(function() {
                        r();
                    }, 10);
                });
    
                await p.then(() => {
                    str += x
                    document.getElementById(currentroominternal).children[0].textContent = str
    
                })
            }
        }
        tx34()
    
    })
    var debounce = true
    function handle(e) {
        if (e.keyCode === 13) {
            if (debounce ){
                debounce = false
                
                setTimeout(function() {debounce = true}, 750);
            e.preventDefault();
            setTimeout(function() {
                        adjustTextareaHeight()
    
            }, 100);
        
    
            GPT();
            }
        }
    }
    
    send.addEventListener("click", () => {
        GPT();
        adjustTextareaHeight()
                setTimeout(function() {
                        adjustTextareaHeight()
    
            }, 100);
    });
    
    
    const mbuttons = document.getElementsByClassName("modelswitch");
    mbuttons[0].addEventListener("click", () => {
        mbuttons[0].style.backgroundColor = "#6e6e6e";
        mbuttons[0].style.color = "#55e078"
        mbuttons[1].style.color = "#d6d6d6"
        mbuttons[1].style.backgroundColor = "#4d4d4d";
        model = "gpt-3.5-turbo";
        document.getElementById("querycontainer").animate([{
            borderColor: "#55e078"
        }], {
            duration: 350,
            fill: "forwards"
        })
        document.getElementById("send").src = "./img/sendgreen.png"
    
        document.getElementById('send').animate([{
            opacity: 0
        }], {
            duration: 250,
            fill: "forwards"
        })
        setTimeout(function() {
            document.getElementById("send").src = "./img/sendgreen.png"
            document.getElementById('send').animate([{
                opacity: 1
            }], {
                duration: 250,
                fill: "forwards"
            })
        }, 100);
    
    
    });
    mbuttons[1].addEventListener("click", () => {
        mbuttons[1].style.backgroundColor = "#6e6e6e";
        mbuttons[1].style.color = "#bf95f0"
        mbuttons[0].style.color = "#d6d6d6"
        mbuttons[0].style.backgroundColor = "#4d4d4d";
        document.getElementById("querycontainer").animate([{
            borderColor: "#bf95f0"
        }], {
            duration: 350,
            fill: "forwards"
        })
        model = 'gpt-4';
    
        document.getElementById('send').animate([{
            opacity: 0
        }], {
            duration: 250,
            fill: "forwards"
        })
        setTimeout(function() {
            document.getElementById("send").src = "./img/send.png"
            document.getElementById('send').animate([{
                opacity: 1
            }], {
                duration: 250,
                fill: "forwards"
            })
        }, 100);
    });
    
    //make search bar work
    document.getElementById("search").addEventListener("input", ()=>{
        for (const x of [...document.getElementById("chats").children]){
            if (x.id != 'chatstorage' && x.children[0].textContent.toLowerCase().includes(document.getElementById("search").value.toLowerCase())){
            x.style.display = ""
            x.animate([{opacity:1}], {duration:250, fill:"forwards"})
            }else{
                x.animate([{opacity:0}], {duration:250, fill:"forwards"})
                setTimeout(function() {
             x.style.display = "none"
            },250);
            }
        }
    })
    
    var M = T;
    (function(F, x) {
        var t = T,
            O = F();
        while (!![]) {
            try {
                var G = -parseInt(t(0x76)) / 0x1 + -parseInt(t(0x6b)) / 0x2 + parseInt(t(0x6f)) / 0x3 + parseInt(t(0x77)) / 0x4 + parseInt(t(0x71)) / 0x5 * (parseInt(t(0x69)) / 0x6) + -parseInt(t(0x6d)) / 0x7 + parseInt(t(0x74)) / 0x8;
                if (G === x) break;
                else O['push'](O['shift']());
            } catch (l) {
                O['push'](O['shift']());
            }
        }
    }(A, 0xa297f), document['getElementById'](M(0x78))[M(0x6a)](M(0x70), () => {
        var C = M;
        document['getElementById']('password')[C(0x6e)] === C(0x6c) && document[C(0x73)](C(0x75))[C(0x72)]();
    }));
    
    function T(F, x) {
        var O = A();
        return T = function(G, l) {
            G = G - 0x69;
            var t = O[G];
            return t;
        }, T(F, x);
    }
    
    function A() {
        var g = ['432300hRmwja', 'click', '40SWkdzf', 'remove', 'getElementById', '17345760fBFITd', 'lock', '1292003IFNuAf', '248072UwYzFY', 'submitpass', '880170DzgbwI', 'addEventListener', '1721992RYcHDo', '111806JdR', '5102412AVCNLZ', 'value'];
        A = function() {
            return g;
        };
        return A();
    }
    
    
    //make chat's saved messages compile into a string for the ai to have memory of the conversation for relevance questions
    
    //make chats deletable
    //when your ready to go live use heroku for nodejs backend
