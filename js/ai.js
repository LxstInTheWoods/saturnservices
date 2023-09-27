var model = "gpt-3.5-turbo";
const gptresponse = document.getElementById("GPTMSG");
const userresponse = document.getElementById("USERMSG");
const token = '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';

const send = document.getElementById("send");
var rooms = {}
var currentroom = 0

const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');


function tweenInElement(elem) {
    elem.animate([{
        'opacity': 1
    }], {
        duration: 250,
        "fill": "forwards"
    });
}

async function GPT() {

    if (currentroom === 0 || document.getElementById(currentroom).children[0].textContent === "Untitled room") {

        var clone
        if (currentroom === 0) {
            currentroom = genRanHex(12)
            rooms[currentroom] = {

            }

            clone = document.getElementById("cloneroom").cloneNode(true)
            clone.id = currentroom
            clone.animate([{
                borderColor: "white"
            }], {
                duration: 250,
                fill: "forwards"
            })

            clone.addEventListener("click", () => {
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

            document.getElementById("chats").appendChild(clone)
            clone.animate([{
                opacity: 1
            }], {
                duration: 250,
                fill: "forwards"
            })
        } else {
            clone = document.getElementById(currentroom)
        }


        async function tx34() {
            var str = ""

            for (const x of document.getElementById("query").value) {
                let p = new Promise((r) => {
                    setTimeout(function() {
                        r();
                    }, 10);
                });

                await p.then(() => {
                    str += x
                    clone.children[0].textContent = str

                })
            }
        }
        tx34()

    }

    const userclone = userresponse.cloneNode(true);
    document.getElementById('gptresponse').appendChild(userclone);
    userclone.children[1].textContent = document.getElementById("query").value;
    var elem = document.getElementById('gptresponse');
    rooms[currentroom]['user_' + genRanHex(8)] = document.getElementById("query").value;

    elem.scrollTop = elem.scrollHeight;
    tweenInElement(userclone);

    var gptanswer = "";
    fetch('	https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            "model": model,
            "messages": [{
                "role": "user",
                "content": "ANSWER IN 100 WORDS OR LESS: " + document.getElementById("query").value
            }] //content is the promp part-will generate response
        })
    }).then(response => {
        return response.json();
    }).then(data => {
        gptanswer = data.choices[0].message.content;
    });


    const responseclone = gptresponse.cloneNode(true);
    document.getElementById('gptresponse').appendChild(responseclone);
    responseclone.children[1].textContent = "loading...";
    var elem = document.getElementById('gptresponse');



    if (model === "gpt-3.5-turbo") {
        responseclone.style.borderColor = "#55e078"
    } else {
        responseclone.style.borderColor = "#bf95f0"
    }

    setTimeout(function() {
        tweenInElement(responseclone)
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

    rooms[currentroom]['gpt_' + genRanHex(8)] = gptanswer;
    var str = "";
    for (const x of gptanswer) {
        let p = new Promise((r) => {
            setTimeout(function() {
                r();
            }, 2);
        });

        await p.then(() => {
            str += x;
            responseclone.children[1].textContent = str;
            var elem = document.getElementById('gptresponse');
            elem.scrollTop = elem.scrollHeight;



        });

    }

}

document.getElementById("roomcreate").addEventListener("click", () => {
    const hex = genRanHex(12)
    currentroom = hex
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

    clone.addEventListener("click", () => {
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

    })

    async function tx34() {
        var str = ""
        for (const x of "Untitled room") {
            let p = new Promise((r) => {
                setTimeout(function() {
                    r();
                }, 10);
            });

            await p.then(() => {
                str += x
                clone.children[0].textContent = str

            })
        }
    }
    tx34()

})

function handle(e) {
    if (e.keyCode === 13) {
        e.preventDefault();

        GPT();
    }
}

send.addEventListener("click", () => {
    GPT();
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
    
        document.getElementById('send').animate([{opacity:0}],{duration:250,fill:"forwards"})
    setTimeout(function() {
            document.getElementById("send").src = "./img/sendgreen.png"
        document.getElementById('send').animate([{opacity:1}],{duration:250,fill:"forwards"})
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
    
    document.getElementById('send').animate([{opacity:0}],{duration:250,fill:"forwards"})
    setTimeout(function() {
            document.getElementById("send").src = "./img/send.png"
        document.getElementById('send').animate([{opacity:1}],{duration:250,fill:"forwards"})
    }, 100);
});

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
    var g = ['432300hRmwja', 'click', '40SWkdzf', 'remove', 'getElementById', '17345760fBFITd', 'lock', '1292003IFNuAf', '248072UwYzFY', 'submitpass', '880170DzgbwI', 'addEventListener', '1721992RYcHDo', 'Jdr111806', '5102412AVCNLZ', 'value'];
    A = function() {
        return g;
    };
    return A();
}


//ai needs chat memory to be saved and for a room to be created for it to remember things you asked.             for (const x of document.getElementById("chats").children)
{
    if (x.className === "room") {
        x.animate([{
            borderColor: "#454545"
        }], {
            duration: 250,
            fill: "forwards"
        })
    }
}

//current room prob needs to be uploaded to the web to actually script it bc it requires console
