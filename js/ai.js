import * as utils from "./modules.js"
import { SID, awaitSID } from "./wshandler.js"; 
(async () => {
    if (!utils.ping()){utils.generateNotification("System", "Server Offline") ;return}
    if (localStorage.getItem("user") === 'undefined' || localStorage.getItem("user") === null) {
        utils.generateNotification("AI Turbo", `You must create an account at ${utils.create_atag("TerminalSaturn", "https://terminalsaturn.com")} to use this service`)
        return
    }
    await awaitSID()
    utils.loginSite([utils.getUserData()['username'], utils.getUserData()['password'], SID]) // automatically log out if user no longer exists or cred mismatch

    var userdata = utils.getUserData()
    var token = ""
    function formatCodeBlocks(message) {
        const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g; // Regex for code blocks
        const formattedMessage = message.replace(codeBlockRegex, (match, lng, code) => {
            const lang = lng ? lng.toLowerCase() : 'markup';
            const language = Prism.languages[lang] || Prism.languages.markup;
            const escapedCode = code; // Escape HTML before highlighting
            const formattedCode = Prism.highlight(escapedCode, language, lang);
            return `<pre><code class="language-${lang}">${formattedCode}</code></pre>`;
        });
        return formattedMessage;
    }
    if (userdata) {
        document.getElementById('apikeyset').value = userdata['token']
        token = utils.getUserData()['token'];
    }
    utils.clearcontext()

    var model = "gpt-3.5-turbo";
    var endpoint = 'https://terminalsaturn.com';
    function rwup() {
        fetch(`${endpoint}/readwrite`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "type": "write",
                "userdata": utils.getUserData()
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
        "gpt-4o": '#bf95f0',
        'SATURN': "#ba6918"
    };
    var animateuse = 0
    const send = document.getElementById("send");
    var rooms = {

    };
    var currentroom = 0;
    var del

    async function setupaifs() {
        console.log(utils.getUserData(), typeof utils.getUserData())
        rooms = utils.getUserData()['data']['aiturbo']
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
            document.getElementById(currentroom).animate([{ backgroundColor: `${modelcolor[model]}` }], { duration: 150, fill: "forwards" })
        }
    }

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
            if (currentroom != clone.id) {
                clone.animate([{ "backgroundColor": "#454545" }], { duration: 250, "fill": "forwards" })
            }
        })
        clone.addEventListener("mouseleave", () => {
            if (currentroom != clone.id) {

                clone.animate([{ "backgroundColor": "#2d2d2d" }], { duration: 250, "fill": "forwards" })
            }
        })
        clone.addEventListener('contextmenu', function (event) {
            event.preventDefault();
            utils.generateContext("Delete chat").addEventListener("click", () => {
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
                let tmps = utils.getUserData()
                tmps['data']['aiturbo'] = rooms
                localStorage.setItem("user", JSON.stringify(tmps))
                rwup()
                utils.clearcontext()
            })
            rmc.animate([{ "backgroundColor": "#2d2d2d" }], { duration: 250, "fill": "forwards" })
            utils.interact(event)
        })
    }
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)\n```/g;
    async function GPT() {
        const tstring = document.getElementById("query").value;
        const hasLetters = /[a-zA-Z]/.test(tstring);
        const hasNumbers = /\d/.test(tstring);

        if (hasLetters || hasNumbers) {

            if (currentroom === 0 || document.getElementById(currentroom).children[0].innerHTML === "Untitled chat") {
                var clone;
                if (currentroom === 0) {
                    currentroom = utils.randomHex(12);
                    rooms[currentroom] = {};
                    clone = document.getElementById("cloneroom").cloneNode(true);
                    clone.id = currentroom;
                    clone.animate([{
                        backgroundColor: `${modelcolor[model]}`
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
                                ucl.children[0].src = utils.getUserData()['profilepicture']
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

                                } else if (modelselector === "gpt-4o") {
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
                                x.animate([{
                                    backgroundColor: "#2d2d2d"
                                }], {
                                    duration: 250,
                                    fill: "forwards"
                                });
                            }
                        }
                        clone.animate([{
                            backgroundColor: `${modelcolor[model]}`
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

                document.getElementById(currentroom).children[0].innerHTML = "Untitled chat"

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

                        fetch(`${endpoint}/getGPTResponse`, {
                            method: 'POST',
                            mode: 'cors',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                prompt:  "Create a short description describing this prompt, less than 7 words, do not answer the prompt should only describe, do not restate prompt \n\n TEXT: " + document.getElementById("query").value,
                                userdata: utils.getUserData(),
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
            if (typeof utils.getUserData() === Object) {
                userclone.children[0].src = userdata['profilepicture']
            }
            else {
                userclone.children[0].src = utils.getUserData()['profilepicture']
            }
            var elem = document.getElementById('gptresponse');

            rooms[currentroom]['user_' + utils.randomHex(8)] = document.getElementById("query").value;
            elem.scrollTop = elem.scrollHeight;
            tweenInElement(userclone);
            document.getElementById('gptresponse').scrollTop = document.getElementById('gptresponse').scrollHeight;


            const gptresponsehex = utils.randomHex(8)
            rooms[currentroom][`gpt_${model}_` + gptresponsehex] = "generating response...";
            var gptanswer = "";

            const responseclone = gptresponse.cloneNode(true);

            async function r4(value) {
                try {
                    if (typeof eval(responseclone) === 'undefined') {
                        console.log(`${responseclone} is declared but not initialized`);
                    }
                } catch (e) {
                    return;
                }

                try {
                    let str = "";

                    for (const x of formatCodeBlocks(value)) {
                        let p = new Promise((r) => {
                            setTimeout(function () {
                                r();
                            }, 2);
                        });

                        await p.then(() => {
                            // Process code blocks
                            str += x;

                            responseclone.children[1].innerHTML = str;
                            adjustTextareaHeight();

                        });
                    }

                    // Save GPT reply
                    rooms[currentroom][`gpt_${model}_` + gptresponsehex] = value;
                    let tmps = utils.getUserData();
                    tmps['data']['aiturbo'] = rooms;
                    localStorage.setItem("user", JSON.stringify(tmps));
                    rwup();

                    elem.scrollTop = elem.scrollHeight;
                } catch (err) {
                    console.log(err);
                }
            }


            if (model === "SATURN") {
                let str = userclone.children[1].innerHTML

                const commands = {
                    knownips:async (a1, command,a3) => {
                        await utils.commands({'command': command,a1: str,udata : localStorage.getItem("user")})
                        .then(function (response) {
                            return response.json();
                        }).then(function (data) {
                            if (typeof data === "string") {
                                r4(data)
                            }
                            else
                            {
                            r4(`Known ips for ${str.split(":")[1]} : \n \n${data[0]}`);
                            }
                        })
                            .catch(function (error) {
                                console.error("ERROR: " + error);
                            });
                    },
                    admlog: async (a1, command, a3) => {
                        await utils.commands({'command': command,a1: str,}).then(function (response) {
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
                    \n-connected: [returns users connected to terminalsaturn.com via WS.]
                    \n-debug [returns a value based on what the developer is attempting to debug (set in script)]`)
                    },
                    connected: (a1, command, a3) => {
                        utils.commands(JSON.stringify({
                            'command': command,
                            a1: str,
                            udata: localStorage.getItem("user")

                        })) 
                    },
                    requests: (a1, command, a3) => {
                        utils.
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
                        fetch(`${endpoint}/getGPTResponse`, {
                            method: 'POST',
                            mode: 'cors',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                prompt: document.getElementById("query").value,
                                userdata: utils.getUserData(),
                                gtp: model,
                                history: rooms[currentroom],
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
                }

            }
            document.getElementById('gptresponse').appendChild(responseclone);
            if (model === "gpt-3.5-turbo") {
                responseclone.children[0].src = "./img/gptmint.png"
            } else if (model === 'gpt-4o') {
                responseclone.children[0].src = "./img/GPT.png"

            } else {
                responseclone.children[0].src = './img/Saturnai.png'
            }
            elem = document.getElementById('gptresponse');



            if (model === "gpt-3.5-turbo") {
                responseclone.style.borderColor = "#55e078";
            } else if (model === 'gpt-4o') {
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

        var hex = utils.randomHex(12);
        if (index) { hex = index }
        currentroom = hex;
        if (!index) {
            rooms[currentroom] = {
                "ROOMNAME": "Untitled chat"
            }
        }

        const clone = document.getElementById("cloneroom").cloneNode(true)
        document.getElementById("chats").appendChild(clone)
        for (const x of document.getElementById("chats").children) {
            if (x.className === "room") {
                x.animate([{
                    backgroundColor: "#2d2d2d"
                }], {
                    duration: 250,
                    fill: "forwards"
                })
            }
        }
        if (!index) {
            clone.animate([{
                backgroundColor: `${modelcolor[model]}`
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
                        ucl.children[1].innerHTML = rooms[clone.id][k]
                        ucl.children[0].src = utils.getUserData()['profilepicture']
                        tweenInElement(ucl)
                    } else {
                        const responseclone = gptresponse.cloneNode(true);
                        document.getElementById('gptresponse').appendChild(responseclone);
                        responseclone.children[1].innerHTML = formatCodeBlocks(rooms[clone.id][k])


                        const modelselector = k.split("_")[1]
                        responseclone.style.borderColor = modelcolor[modelselector]
                        tweenInElement(responseclone)
                        if (modelselector === "gpt-3.5-turbo") {
                            responseclone.children[0].src = "./img/gptmint.png"

                        } else if (modelselector === "gpt-4o") {
                            responseclone.children[0].src = "./img/GPT.png"

                        } else {
                            responseclone.children[0].src = "./img/Saturnai.png"
                        }
                    }
                }
            }



            for (const x of document.getElementById("chats").children) {
                if (x.className === "room") {
                    x.animate([{
                        backgroundColor: "#2d2d2d"
                    }], {
                        duration: 250,
                        fill: "forwards"
                    })
                }
            }
            clone.animate([{
                backgroundColor: `${modelcolor[model]}`
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
                var touse = index && data["ROOMNAME"] ? data["ROOMNAME"] : "Untitled chat"
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

        }
    }
    const mbuttons = document.getElementsByClassName("modelswitch");
    mbuttons[0].addEventListener("click", () => {
        model = "gpt-3.5-turbo";

        animateProperty(mbuttons[0], "b", "#55e078")
        animateProperty(mbuttons[0], "b", "#55e078")
        animateProperty(mbuttons[1], "b", "#2d2d2d")
        animateProperty(mbuttons[2], "b", "#2d2d2d")

        aiturboicon.src = "./img/gptmint.png";
        document.querySelector("link[rel*='icon']").setAttribute("href", "./img/gptmint.png");




        document.getElementById("querycontainer").animate([{
            borderColor: "#55e078"
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
        model = 'gpt-4o';
        animateProperty(mbuttons[1], "b", "#bf95f0")
        animateProperty(mbuttons[0], "b", "#2d2d2d")
        animateProperty(mbuttons[2], "b", "#2d2d2d")
        document.getElementById("querycontainer").animate([{
            borderColor: "#bf95f0"
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
            document.getElementById("send").src = "./img/sendpurple.png"
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
        animateProperty(mbuttons[2], "b", modelcolor[model])
        animateProperty(mbuttons[1], "b", "#2d2d2d")
        animateProperty(mbuttons[0], "b", "#2d2d2d")


        document.getElementById("querycontainer").animate([{
            borderColor: modelcolor[model]
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
    const rmc = document.getElementById("roomcreate")
    const srch = document.getElementById("searchbarholder")

    srch.addEventListener("focusin", () => {
        srch.animate([{ "borderColor": "white" }], { duration: 250, "fill": "forwards" })
    })
    srch.addEventListener("focusout", () => {
        srch.animate([{ "borderColor": "#2d2d2d" }], { duration: 250, "fill": "forwards" })

    })


    rmc.addEventListener("mouseenter", () => {
        const rmc = document.getElementById("roomcreate")
        rmc.animate([{ "backgroundColor": "#454545" }], { duration: 250, "fill": "forwards" })
    })
    rmc.addEventListener("mouseleave", () => {
        const rmc = document.getElementById("roomcreate")
        rmc.animate([{ "backgroundColor": "#2d2d2d" }], { duration: 250, "fill": "forwards" })
    })



    //00. make it so the the dropdown for the selection buttons has animation and doesnt just suddenly appear
    //01. make it so when asking for html content it gives a preview of the site and the code, when it writes code into innerhtml it breaks the page.
    //02. implement streaming for chunked responses and faster replies
    //03. !!! make it so server requests are a lot more controlled, saving on site leave or refresh instead of on every event (optimization)
    //04. fix profile picture shape being weird
    //05. see line 68?
    //06. make it so when signing out refreshing isnt required, just signs out.
    //INFO. note if the send button changing on the mbuttons isnt working just make the animation asynchronous.


})()