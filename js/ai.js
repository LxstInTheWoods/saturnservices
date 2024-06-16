(async () => {
    if (!localStorage.getItem("ts")){alert("Server offline"); return}

    if (localStorage.getItem("user") === 'undefined' || localStorage.getItem("user") === null) {
        alert("please sign in")
        window.open("https://terminalsaturn.com", "_self")
        return

    }
    var userdata
    var token = ""
    if (localStorage.getItem("user")) {
        userdata = localStorage.getItem("user")
        document.getElementById('apikeyset').value = userdata['token']
        token = JSON.parse(userdata)['token'];

    }




    var model = "gpt-3.5-turbo";
    var endpoint = 'https://api.terminalsaturn.com';
    function rwup() {
        fetch(`${endpoint}/readwrite`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "type": "write",
                "userdata": JSON.parse(localStorage.getItem("user"))
            })
        })
    }
    async function setEndpoint() {
        const location = toString(window.location)
        if (location.includes("local") || location.includes("chronos") || location.includes("satvrnservices") || true) {
            //chrome or local
            // endpoint = `api.satvrnservices.com:443`

        }

    }; setEndpoint();

    const gptresponse = document.getElementById("GPTMSG");
    const userresponse = document.getElementById("USERMSG");
    const aiturboicon = document.getElementById("aiturboicon")
    const modelcolor = {
        "gpt-3.5-turbo": '#55e078',
        "gpt-4-1106-preview": '#bf95f0',
        'SATURN': "white"
    };
    var animateuse = 0
    const send = document.getElementById("send");
    var rooms = {

    };
    var currentroom = 0;
    var del

    async function setupaifs() {
        if (!localStorage.getItem("ts")) { return 404 }
        rooms = JSON.parse(userdata)['data']['aiturbo']
        return 500
        //depracated function update to remove later, info is already updated by config.js
    }

    function erasemsgs(id) {
        if (id && id != currentroom) { return }
        const elements = [...document.getElementsByClassName('GPTMSG')];
        for (const x of elements) {
            if (x.parentNode.id !== "storage") {
                x.remove();
            }
        }
    }

    function roomColorAE() {
        if (document.getElementById(currentroom)) {
            document.getElementById(currentroom).children[0].animate([{ borderRight: `solid 5px ${modelcolor[model]}` }], { duration: 150, fill: "forwards" })
        }
    }

    const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

    const T1input = document.getElementById("query");

    function adjustTextareaHeight() {
        T1input.style.height = 'auto';
        T1input.style.height = T1input.scrollHeight + 'px';

        if (T1input.scrollHeight > parseInt(getComputedStyle(T1input).maxHeight)) {
            T1input.style.overflowY = "scroll;";
        } else {
            T1input.style.overflowY = "auto";
        }
    }
    T1input.addEventListener('input', adjustTextareaHeight);
    adjustTextareaHeight();

    function formatCodeBlocks(message) {
        const codeRegex = /```(.*?)```/gs;

        const formattedMessage = message.replace(codeRegex, (match, language, offset, input) => {
            const codeDiv = `<div style="background-color: black; font-family: monospace; padding: 10px; color: white;">${match}</div>`;

            return `<p>${language}</p>${codeDiv}`;
        });
        return formattedMessage;
    }


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



    function hoverStuff(clone) {
        const delbutton = clone.children[1].children[0];
        const prnt = delbutton.parentNode;

        clone.addEventListener("mouseenter", () => {
            prnt.style.display = "flex";

        });
        clone.addEventListener("mouseleave", () => {
            prnt.style.display = "none";
        });
        delbutton.addEventListener("mouseenter", () => {
            delbutton.animate([{
                borderColor: "white"
            }], {
                duration: 250,
                fill: "forwards"
            });
            del = true
        });
        delbutton.addEventListener("mouseleave", () => { 
            delbutton.animate([{
                borderColor: "grey"
            }], {
                duration: 250,
                fill: "forwards"
            });
            setTimeout(() => {
                del = false
            }, 100);
        });


        delbutton.addEventListener("click", () => {
            erasemsgs(clone.id);
            del = true
            setTimeout(() => {
                del = false
            }, 100);
            clone.remove();
            if (clone.id === currentroom) {
                currentroom = 0;
            }
            rooms[clone.id] = null;
            let tmps = JSON.parse(localStorage.getItem("user"))
            tmps['data']['aiturbo'] = rooms
            localStorage.setItem("user", JSON.stringify(tmps))
            rwup()
            console.log("ok")
        });
    }

    async function GPT() {
        const tstring = document.getElementById("query").value;
        const hasLetters = /[a-zA-Z]/.test(tstring);
        const hasNumbers = /\d/.test(tstring);

        if (hasLetters || hasNumbers) {

            if (currentroom === 0 || document.getElementById(currentroom).children[0].innerHTML === "Untitled room") {
                var clone;
                if (currentroom === 0) {
                    currentroom = genRanHex(12);
                    rooms[currentroom] = {

                    };
                    clone = document.getElementById("cloneroom").cloneNode(true);
                    clone.id = currentroom;
                    clone.children[0].animate([{
                        borderRight: `solid 5px ${modelcolor[model]}`
                    }], {
                        duration: 250,
                        fill: "forwards"
                    });



                    clone.children[1].children[0].addEventListener("click", () => { 
                        erasemsgs(clone.id);
                        clone.remove();
                        if (currentroom === clone.id) {
                            currentroom = 0;
                        }
                        rooms[clone.id] = null;
                        del = true
                        setTimeout(() => {
                            del = false
                        }, 250);

                    });

                    const delbutton = clone.children[1].children[0];
                    const prnt = delbutton.parentNode;
                    prnt.style.display = "none";

                    hoverStuff(clone);
                    clone.addEventListener("click", () => {
                        //code for created room here
                        if (del) { return }
                        erasemsgs();
                        currentroom = clone.id;
                        for (let k of Object.keys(rooms[clone.id])) {
                            if (k.includes("user_")) {
                                var ucl = userresponse.cloneNode(true);
                                document.getElementById('gptresponse').appendChild(ucl);
                                ucl.children[1].innerHTML = rooms[clone.id][k];
                                ucl.children[0].src = JSON.parse(userdata)['profilepicture']
                                tweenInElement(ucl);

                            } else {
                                const responseclone = gptresponse.cloneNode(true);
                                document.getElementById('gptresponse').appendChild(responseclone);
                                responseclone.children[1].innerHTML = rooms[clone.id][k];
                                responseclone.style.borderColor = modelcolor[k.split("_")[1]];
                                tweenInElement(responseclone);

                                const modelselector = k.split("_")[1]


                                if (modelselector === "gpt-3.5-turbo") {
                                    responseclone.children[0].src = "./img/gptmint.png"

                                } else if (modelselector === "gpt-4-1106-preview") {
                                    responseclone.children[0].src = "./img/GPT.png"
                                } else {
                                    responseclone.children[0].src = "./img/Saturnai.png"
                                }
                            }
                        }
                        //
                        prnt.style.display = "none";
                        clone.addEventListener("mouseenter", () => {
                            prnt.style.display = "flex";
                        });
                        clone.addEventListener("mouseleave", () => {
                            prnt.style.display = "none";
                        });

                        for (const x of document.getElementById("chats").children) {
                            if (x.className === "room") {
                                x.children[0].animate([{
                                    borderRight: "solid 5px #454545"
                                }], {
                                    duration: 250,
                                    fill: "forwards"
                                });
                            }
                        }
                        clone.children[0].animate([{
                            borderRight: `solid 5px ${modelcolor[model]}`
                        }], {
                            duration: 250,
                            fill: "forwards"
                        });

                    });

                    document.getElementById("chats").appendChild(clone);
                    clone.children[0].animate([{
                        opacity: 1
                    }], {
                        duration: 250,
                        fill: "forwards"
                    });
                } else {
                    clone = document.getElementById(currentroom);
                }

                document.getElementById(currentroom).children[0].innerHTML = "Untitled room"

                async function tx34(response) {
                    var str = "";

                    for (const x of response) {
                        let p = new Promise((r) => {
                            setTimeout(function () {
                                r();
                            }, 10);
                        });

                        await p.then(() => {
                            str += x;
                            document.getElementById(currentroom).children[0].innerHTML = str;
                        });
                    }
                }

                if (model != "SATURN" && token.length > 0) {
                    if (document.getElementById("query").value.length <= 5000) {
                        console.log(typeof localStorage.getItem("user"))

                        fetch(`${endpoint}/getGPTResponse`, {
                            method: 'POST',
                            mode: 'cors',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                prompt: "(do not wrap in quotes): create a formal chat name as short as possible (5 words if possible DO NOT EXCEED 10 WORDS UNDER ANY CIRCUMSTANCE.) that summarizes what the prompt is about. example: solve 1+2 -> mathmetical inquiries." + document.getElementById("query").value,
                                userdata: localStorage.getItem("user"),
                                gtp: model,
                                history: null,
                            })
                        }).then(response => {
                            if (!response.ok) {
                                r4('Server error: ' + response.status)
                            }
                            return response.json();
                        })
                            .then(data => {
                                gptanswer = formatCodeBlocks(data.value);
                                rooms[currentroom]['ROOMNAME'] = data.value
                                tx34(data.value);
                            })
                            .catch(error => {
                                if (error.message.includes("Failed")) {
                                    console.log("failed to connect to server - may be offline")
                                }
                                else {
                                    r4("(CALL BY CLIENT)ERROR: " + error)
                                }
                            });

                    }



                }


            }
            const userclone = userresponse.cloneNode(true);
            document.getElementById('gptresponse').appendChild(userclone);
            userclone.children[1].innerHTML = document.getElementById("query").value.replace(/\n/g, "<br>");
            if (typeof userdata === Object) {
                userclone.children[0].src = userdata['profilepicture']
            }
            else {
                userclone.children[0].src = JSON.parse(userdata)['profilepicture']
            }
            var elem = document.getElementById('gptresponse');

            rooms[currentroom]['user_' + genRanHex(8)] = document.getElementById("query").value;
            elem.scrollTop = elem.scrollHeight;
            tweenInElement(userclone);
            document.getElementById('gptresponse').scrollTop = document.getElementById('gptresponse').scrollHeight;


            const gptresponsehex = genRanHex(8)
            rooms[currentroom][`gpt_${model}_` + gptresponsehex] = "generating response...";
            var gptanswer = "";

            const responseclone = gptresponse.cloneNode(true);

            async function r4(value) {
                try {
                    if (typeof eval(responseclone) === 'undefined') {
                        console.log(`${responseclone} is declared but not initialized`);
                    }
                } catch (e) {
                    return
                }
                try {
                    let str = ""
                    for (const x of value) {
                        let p = new Promise((r) => {
                            setTimeout(function () {
                                r()
                            }, 2);
                        })

                        await p.then(() => {
                            str += x
                            responseclone.children[1].innerHTML = str
                            adjustTextareaHeight()
                        })
                    }
                    //save gpt reply
                    rooms[currentroom][`gpt_${model}_` + gptresponsehex] = value;
                    let tmps = JSON.parse(localStorage.getItem("user"))
                    tmps['data']['aiturbo'] = rooms
                    localStorage.setItem("user", JSON.stringify(tmps))
                    rwup()

                    elem.scrollTop = elem.scrollHeight;
                } catch (err) {
                    console.log(err)
                }
            };

            if (model === "SATURN") {
                let str = userclone.children[1].innerHTML

                const commands = {
                    admlog: (a1, command, a3) => {
                        fetch(`${endpoint}/command`, {
                            method: "POST",
                            mode: 'cors',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                'command': command,
                                a1: str,
                            })
                        }).then(function (response) {
                            return response.json();
                        }).then(function (data) {
                            r4(data[0]);
                            if (data[0].includes("Access Granted")) {
                                token = data[1]
                                document.getElementById('apikeyset').value = token
                            }
                        })
                            .catch(function (error) {
                                console.error("ERROR: " + error);
                            });
                    },
                    help: (a1, command, a3) => {
                        r4(`Welcome, This is the official console for our AI application. below are the available commands: 
                    \n\n -help [returns info about console and commands]
                    \n -admlog:user:pass [allows you to log into an administrator account and autofill their account API token.]
                    \n-requests:user [returns the amount of AI requests the user has made.]
                    \n-debug [returns a value based on what the developer is attempting to debug (set in script)]`)
                    },
                    requests: (a1, command, a3) => {
                        fetch(`${endpoint}/command`, {
                            method: "POST",
                            mode: 'cors',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                'command': command,
                                a1: str,
                            })
                        }).then(function (response) {
                            return response.json();
                        }).then(function (data) {
                            r4(data[0]);
                        })
                            .catch(function (error) {
                                console.error("ERROR: " + error);
                            });
                    },
                    debug: () => {
                        r4("animateuses: " + animateuse)
                    }
                }

                if (!commands[str.split(":")[0]]) {
                    r4("Unknown command.")
                } else {
                    commands[str.split(":")[0]](str, str.split(":")[0])
                }


            } else if (token.length === 0) {
                r4("Please provide a token by opening settings and pasting it into the API key field.")
            } else {
                try {
                    if (document.getElementById("query").value.length > 5000) {
                        r4("Query too long.")
                    } else {
                        responseclone.children[1].innerHTML = "generating response...";
                        console.log(typeof localStorage.getItem("user"))
                        fetch(`${endpoint}/getGPTResponse`, {
                            method: 'POST',
                            mode: 'cors',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                prompt: document.getElementById("query").value,
                                userdata: localStorage.getItem("user"),
                                gtp: model,
                                history: JSON.stringify(rooms[currentroom]),
                            })
                        }).then(response => {
                            if (!response.ok) {
                                r4('Server error: ' + response.status)
                            }
                            return response.json();
                        })
                            .then(data => {
                                gptanswer = data.value


                                r4(data.value)
                            })
                            .catch(error => {
                                r4("ERROR: " + error)
                            });


                    }
                } catch (err) {
                    alert(err)
                }

            }
            document.getElementById('gptresponse').appendChild(responseclone);
            if (model === "gpt-3.5-turbo") {
                responseclone.children[0].src = "./img/gptmint.png"
            } else if (model === 'gpt-4-1106-preview') {
                responseclone.children[0].src = "./img/GPT.png"

            } else {
                responseclone.children[0].src = './img/Saturnai.png'
            }
            elem = document.getElementById('gptresponse');



            if (model === "gpt-3.5-turbo") {
                responseclone.style.borderColor = "#55e078";
            } else if (model === 'gpt-4-1106-preview') {
                responseclone.style.borderColor = "#bf95f0";
            } else {
                responseclone.style.borderColor = "white"
            }

            setTimeout(function () {
                tweenInElement(responseclone);
            }, 250);

            elem.scrollTop = elem.scrollHeight;
            document.getElementById("query").value = "";

            while (gptanswer === "") {
                let p = new Promise((r) => {
                    setTimeout(function () {
                        r();
                    }, 50);
                });

                await p.then(() => { })
            }

            rooms[currentroom][`gpt_${model}_` + gptresponsehex] = gptanswer;


        }
    }

    async function ctrr(index, data) {

        if (!data) { return 404 }
        erasemsgs()

        var hex = genRanHex(12);
        if (index) { hex = index }
        currentroom = hex;
        if (!index) {
            rooms[currentroom] = {
                "ROOMNAME": "Untitled Room"
            }
        }

        const clone = document.getElementById("cloneroom").cloneNode(true)
        document.getElementById("chats").appendChild(clone)
        for (const x of document.getElementById("chats").children) {
            if (x.className === "room") {
                x.children[0].animate([{
                    borderRight: "solid 5px #454545"
                }], {
                    duration: 250,
                    fill: "forwards"
                })
            }
        }
        if (!index) {
            clone.children[0].animate([{
                borderRight: `solid 5px ${modelcolor[model]}`
            }], {
                duration: 250,
                fill: "forwards"
            })

            clone.children[0].animate([{
                opacity: 1
            }], {
                duration: 250,
                fill: "forwards"
            })
        }
        clone.id = hex
        currentroom = clone.id

        const delbutton = clone.children[1].children[0]
        const prnt = delbutton.parentNode
        //%#($#)
        prnt.style.display = "none"

        hoverStuff(clone)

        clone.addEventListener("click", () => {
            //clicked on created room.
            if (del) { return }

            erasemsgs()


            for (let k of Object.keys(rooms[clone.id])) {
                if (k != "ROOMNAME") {
                    if (k.includes("user_")) {
                        var ucl = userresponse.cloneNode(true);
                        document.getElementById('gptresponse').appendChild(ucl);
                        console.log(typeof userdata)

                        ucl.children[1].innerHTML = rooms[clone.id][k];
                        ucl.children[0].src = JSON.parse(userdata)['profilepicture']
                        tweenInElement(ucl)
                    } else {
                        const responseclone = gptresponse.cloneNode(true);
                        document.getElementById('gptresponse').appendChild(responseclone);
                        responseclone.children[1].innerHTML = rooms[clone.id][k];
                        const modelselector = k.split("_")[1]
                        responseclone.style.borderColor = modelcolor[modelselector]
                        tweenInElement(responseclone)
                        if (modelselector === "gpt-3.5-turbo") {
                            responseclone.children[0].src = "./img/gptmint.png"

                        } else if (modelselector === "gpt-4-1106-preview") {
                            responseclone.children[0].src = "./img/GPT.png"

                        } else {
                            responseclone.children[0].src = "./img/Saturnai.png"
                        }
                    }
                }
            }



            for (const x of document.getElementById("chats").children) {
                if (x.className === "room") {
                    x.children[0].animate([{
                        borderRight: "#454545 solid 5px"
                    }], {
                        duration: 250,
                        fill: "forwards"
                    })
                }
            }

            clone.children[0].animate([{
                borderRight: `solid 5px ${modelcolor[model]}`
            }], {
                duration: 250,
                fill: "forwards"
            })

            currentroom = clone.id


        })

        async function tx34() {
            try {
                var currentroominternal = currentroom
                var str = ""
                var touse = "Untitled room"
                if (index) {
                    touse = data['ROOMNAME']
                }
                for (const x of touse) {
                    let p = new Promise((r) => {
                        setTimeout(function () {
                            r();
                        }, 10);
                    });

                    await p.then(() => {
                        str += x
                        document.getElementById(currentroominternal).children[0].innerHTML = str

                    })
                }
            } catch (err) {
                console.log(err)
            }
        }
        tx34()

        var elem = document.getElementById('gptresponse');
        elem.scrollTop = elem.scrollHeight;

        if (index) {
            currentroom = 0
        }
    }

    (async () => {
        let iso = await setupaifs()
        if (iso === 404) {
            console.warn("loaded chats from local save, may contain innacurate information. -- saving disabled until refresh")
        }
            for (const x of Object.keys(rooms)) {
                if (rooms[x]) {
                    console.log(x)
                    ctrr(x, rooms[x])
                }
            }
        
    })()

    document.getElementById("roomcreate").addEventListener("click", () => {
        ctrr(null, true)
    })
    var debounce = true

    document.getElementById("query").addEventListener("keypress", (e) => {
        if (e.keyCode === 13) {
            if (debounce) {
                debounce = false

                setTimeout(function () {
                    debounce = true
                }, 750);
                e.preventDefault();
                setTimeout(function () {
                    adjustTextareaHeight()

                }, 100);


                GPT();
            }
        }
    })



    send.addEventListener("click", () => {
        GPT();
        adjustTextareaHeight()
        setTimeout(function () {
            adjustTextareaHeight()

        }, 100);
    });


    function animateProperty(element, property, value) {
        animateuse += 1
        if (property === "b") {
            element.animate([{
                'borderColor': value
            }], {
                duration: 150,
                fill: "forwards"
            })

        } else {
            element.animate([{
                'color': value
            }], {
                duration: 150,
                fill: "forwards"
            })

        }
    }
    const mbuttons = document.getElementsByClassName("modelswitch");
    mbuttons[0].addEventListener("click", () => {
        model = "gpt-3.5-turbo";

        animateProperty(mbuttons[0], "b", "#55e078")
        animateProperty(mbuttons[0], "b", "#55e078")
        animateProperty(mbuttons[1], "c", "#d6d6d6")
        animateProperty(mbuttons[2], "c", "#d6d6d6")
        animateProperty(mbuttons[1], "b", "#1c1c1c")
        animateProperty(mbuttons[2], "b", "#1c1c1c")

        aiturboicon.src = "./img/gptmint.png";
        document.querySelector("link[rel*='icon']").setAttribute("href", "./img/gptmint.png");




        document.getElementById("querycontainer").animate([{
            borderBottomColor: "#55e078"
        }], {
            duration: 350,
            fill: "forwards"
        })

        document.getElementById('send').animate([{
            opacity: 0
        }], {
            duration: 250,
            fill: "forwards"
        })

        setTimeout(function () {
            document.getElementById("send").src = "./img/sendgreen.png"
            document.getElementById('send').animate([{
                opacity: 1
            }], {
                duration: 250,
                fill: "forwards"
            })
        }, 100);
        roomColorAE()


    });
    mbuttons[1].addEventListener("click", () => {
        model = 'gpt-4-1106-preview';
        animateProperty(mbuttons[1], "b", "#bf95f0")
        animateProperty(mbuttons[1], "c", "#bf95f0")
        animateProperty(mbuttons[0], "c", "#d6d6d6")
        animateProperty(mbuttons[0], "b", "#1c1c1c")
        animateProperty(mbuttons[2], "c", "#d6d6d6")
        animateProperty(mbuttons[2], "b", "#1c1c1c")
        document.getElementById("querycontainer").animate([{
            borderBottomColor: "#bf95f0"
        }], {
            duration: 350,
            fill: "forwards"
        })




        aiturboicon.src = "./img/GPT.png";
        document.querySelector("link[rel*='icon']").setAttribute("href", "./img/GPT.png");


        document.getElementById('send').animate([{
            opacity: 0
        }], {
            duration: 250,
            fill: "forwards"
        })
        setTimeout(function () {
            document.getElementById("send").src = "./img/send.png"
            document.getElementById('send').animate([{
                opacity: 1
            }], {
                duration: 250,
                fill: "forwards"
            })
        }, 100);
        roomColorAE()
    });

    mbuttons[2].addEventListener("click", () => {
        model = 'SATURN';
        animateProperty(mbuttons[2], "b", "white")
        animateProperty(mbuttons[2], "c", "white")
        animateProperty(mbuttons[1], "c", "#d6d6d6")
        animateProperty(mbuttons[1], "b", "#1c1c1c")
        animateProperty(mbuttons[0], "c", "#d6d6d6")
        animateProperty(mbuttons[0], "b", "#1c1c1c")


        document.getElementById("querycontainer").animate([{
            borderBottomColor: "white"
        }], {
            duration: 350,
            fill: "forwards"
        })




        aiturboicon.src = "./img/Saturnai.png";

        document.querySelector("link[rel*='icon']").setAttribute("href", "./img/Saturnai.png");



        document.getElementById('send').animate([{
            opacity: 0
        }], {
            duration: 250,
            fill: "forwards"
        })

        setTimeout(function () {
            document.getElementById("send").src = "./img/sendsaturn.png"
            document.getElementById('send').animate([{
                opacity: 1
            }], {
                duration: 250,
                fill: "forwards"
            })
        }, 100);
        roomColorAE()

    });


    document.getElementById("search").addEventListener("input", () => {
        for (const x of [...document.getElementById("chats").children]) {
            if (x.id != 'chatstorage' && x.children[0].innerHTML.toLowerCase().includes(document.getElementById("search").value.toLowerCase())) {
                x.style.display = ""
                x.animate([{
                    opacity: 1
                }], {
                    duration: 250,
                    fill: "forwards"
                })
            } else {
                x.animate([{
                    opacity: 0
                }], {
                    duration: 250,
                    fill: "forwards"
                })
                setTimeout(function () {
                    x.style.display = "none"
                }, 250);
            }
        }
    });


    function openSettings() {
        const settings = document.getElementById('settingspannel');
        const currentOpacity = parseFloat(settings.style.opacity);

        if (currentOpacity === 1) {
            fadeOut(settings);
        } else {
            fadeIn(settings);
        }
    }

    function fadeIn(element) {
        element.style.opacity = 0;
        element.style.display = 'block';

        let opacity = 0;
        const start = performance.now();

        function updateOpacity(timestamp) {
            const elapsed = timestamp - start;
            opacity = elapsed / 250;
            element.style.opacity = Math.min(opacity, 1);

            if (opacity < 1) {
                requestAnimationFrame(updateOpacity);
            }
        }

        requestAnimationFrame(updateOpacity);
    }

    function fadeOut(element) {
        let opacity = 1;
        const start = performance.now();

        function updateOpacity(timestamp) {
            const elapsed = timestamp - start;
            opacity = 1 - elapsed / 250;
            element.style.opacity = Math.max(opacity, 0);

            if (opacity > 0) {
                requestAnimationFrame(updateOpacity);
            } else {
                element.style.display = 'none';
            }
        }

        requestAnimationFrame(updateOpacity);
    }
    //preset
    const aks = document.getElementById("apikeyset")
    aks.value = token
    aks.addEventListener("input", () => {
        token = aks.value
    })
    document.getElementById("openSettings").addEventListener("click", openSettings)


    //00. make it so the the dropdown for the selection buttons has animation and doesnt just suddenly appear
    //01. make it so when asking for html content it gives a preview of the site and the code, when it writes code into innerhtml it breaks the page.
    //02. implement streaming for chunked responses and faster replies
    //03. !!! make it so server requests are a lot more controlled, saving on site leave or refresh instead of on every event (optimization)
    //04. fix profile picture shape being weird
    //05. see line 68?
    //06. make it so when signing out refreshing isnt required, just signs out.
    //INFO. note if the send button changing on the mbuttons isnt working just make the animation asynchronous.


})()