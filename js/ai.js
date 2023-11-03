// fix url
const links = document.querySelectorAll('a');

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    let href = link.href;
    if(href.includes('.html')) {
      href = href.replace(/\.html$/, ''); 
    }
    window.location.href = href; 
  });
});


    var model = "gpt-3.5-turbo";
    const gptresponse = document.getElementById("GPTMSG");
    const userresponse = document.getElementById("USERMSG");
    var token = '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';
    const modelcolor = {
    	"gpt-3.5-turbo": '#55e078',
    	"gpt-4": '#bf95f0',
    	'SATURN': "white"
    };

    const send = document.getElementById("send");
    var rooms = {};
    var currentroom = 0;

    function erasemsgs() {
    	const elements = [...document.getElementsByClassName('GPTMSG')];
    	for (const x of elements) {
    		if (x.parentNode.id !== "storage") {
    			x.remove();
    		}
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
    	//animate element to appear 
    	elem.animate([{
    		'opacity': 1
    	}], {
    		duration: 250,
    		"fill": "forwards"
    	});
    }


    async function LogTable(TB, reloop, v) {
    	//print debugging when no access to console
    	try {
    		for (let x in TB) {
    			var el = document.createElement("label");
    			if (reloop) {
    				el.innerHTML = `(table:${v} --> ${x}:${TB[x]}   )   `;
    			} else {
    				el.innerHTML = `(    ${x}:${TB[x]}   )   `;

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

    	//begin function for query.
    	const tstring = document.getElementById("query").value;
    	const hasLetters = /[a-zA-Z]/.test(tstring);
    	const hasNumbers = /\d/.test(tstring);

    	if (hasLetters || hasNumbers) {

    		if (currentroom === 0 || document.getElementById(currentroom).children[0].innerHTML === "Untitled room") {
    			erasemsgs();
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

    				clone.children[1].children[1].addEventListener("click", () => {
    					clone.remove();
    					currentroom = 0;
    					rooms[clone.id] = null;
    					erasemsgs();
    				});

    				clone.children[1].children[0].addEventListener("click", () => { //select

    					//code for created room here

    					erasemsgs();
    					for (let k of Object.keys(rooms[clone.id])) {
    						if (k.includes("user_")) {
    							var ucl = userresponse.cloneNode(true);
    							document.getElementById('gptresponse').appendChild(ucl);
    							ucl.children[1].innerHTML = rooms[clone.id][k];

    							tweenInElement(ucl);

    						} else {
    							const responseclone = gptresponse.cloneNode(true);
    							document.getElementById('gptresponse').appendChild(responseclone);
    							responseclone.children[1].innerHTML = rooms[clone.id][k];
    							responseclone.style.borderColor = modelcolor[k.split("_")[1]];
    							tweenInElement(responseclone);
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
    						document.getElementById(currentroom).children[0].innerHTML = str;

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
    		document.getElementById('gptresponse').scrollTop = document.getElementById('gptresponse').scrollHeight;


    		const gptresponsehex = genRanHex(8)
    		rooms[currentroom][`gpt_${model}_` + gptresponsehex] = "generating response\n\nif this takes too long api key may be expired or api connection is blocked";
    		var gptanswer = "";
    		
    		fetch('	https://api.openai.com/v1/chat/completions', {
    			method: ' ',
    			headers: {
    				'Content-Type': 'application/json',
    				'Authorization': 'Bearer ' + token
    			},
    			body: JSON.stringify({
    				"model": model,
    				"messages": [{
    					"role": "user",
    					"content": "ANSWER WITH A SHORT RESPONSE: " + document.getElementById("query").value
    				}]
    			})
    		}).then(response => {
    			return response.json();
    		}).then(data => {
    			gptanswer = data.choices[0].message.content;
    			alert(gptanswer)
    			async function r4() {
    				let str = ""
    				for (const x of data.choices[0].message.content) {
    					let p = new Promise((r) => {
    						setTimeout(function() {
    							r()
    						}, 2);
    					})

    					await p.then(() => {
    						str += x
    						responseclone.children[1].innerHTML = str
    					})
    				}
    				rooms[currentroom][`gpt_${model}_` + gptresponsehex] = gptanswer; //this saves the gpt reply etc
    				elem.scrollTop = elem.scrollHeight;
    			};
    			r4()


    		})


    		const responseclone = gptresponse.cloneNode(true);
    		document.getElementById('gptresponse').appendChild(responseclone);
    		responseclone.children[1].innerHTML = "generating response \n \nif this takes too long api key may be expired or api connection is blocked";
    		if (model === "gpt-3.5-turbo") {
    			responseclone.children[0].src = "./img/gptmint.png"
    		} else if (model === 'gpt-4') {
    			responseclone.children[0].src = "./img/GPT.png"

    		} else {
    			responseclone.children[0].src = './img/Saturnai.png'
    		}
    		elem = document.getElementById('gptresponse');



    		if (model === "gpt-3.5-turbo") {
    			responseclone.style.borderColor = "#55e078";
    		} else if (model === 'gpt-4') {
    			responseclone.style.borderColor = "#bf95f0";
    		} else {
    			responseclone.style.borderColor = "white"
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

    	}
    }

    document.getElementById("roomcreate").addEventListener("click", () => {

    	erasemsgs()

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
    	    
    	const  delbutton = clone.children[1].children[1]
    	const selbutton = clone.children[1].children[0]
    	const prnt = delbutton.parentNode
        //delbutton.offsetHeight + clone.offsetHeight
        //%#($#)
    	//animation
    	clone.addEventListener("mouseenter", ()=>{
    	    prnt.style.display = "flex"
    	})
    	clone.addEventListener("mouseleave", ()=>{
    	    prnt.style.display = "none"
    	})
    	delbutton.addEventListener("mouseenter", ()=>{//in
    	    delbutton.animate([{borderColor:"white"}], {duration:250, fill:"forwards"}) 
        })
        delbutton.addEventListener("mouseleave", ()=>{//out
    	    delbutton.animate([{borderColor:"#2e2e2e"}], {duration:250, fill:"forwards"}) 

        })
        
        
        selbutton.addEventListener("mouseenter", ()=>{
    	    selbutton.animate([{borderColor:"white"}], {duration:250, fill:"forwards"}) 
        })
        selbutton.addEventListener("mouseleave", ()=>{
    	    selbutton.animate([{borderColor:"#2e2e2e"}], {duration:250, fill:"forwards"}) 
        })
        
        
    	delbutton.addEventListener("click", () => {
    		clone.remove()
    		currentroom = 0
    		rooms[clone.id] = null;
    		erasemsgs()
    	})
    	
    	selbutton.addEventListener("click", () => { //select
    		//clicked on created room.
    		if (currentroom != clone.id) {

    			erasemsgs()


    			for (let k of Object.keys(rooms[clone.id])) {
    				if (k.includes("user_")) {
    					var ucl = userresponse.cloneNode(true);
    					document.getElementById('gptresponse').appendChild(ucl);
    					ucl.children[1].innerHTML = rooms[clone.id][k];
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

    					} else if (modelselector === "gpt-4") {
    						responseclone.children[0].src = "./img/GPT.png"

    					} else {
    						responseclone.children[0].src = "./img/Saturnai.png"
    					}
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
    				document.getElementById(currentroominternal).children[0].innerHTML = str

    			})
    		}
    	}
    	tx34()

    	var elem = document.getElementById('gptresponse');
    	elem.scrollTop = elem.scrollHeight;


    })
    var debounce = true

    function handle(e) {
    	if (e.keyCode === 13) {
    		if (debounce) {
    			debounce = false

    			setTimeout(function() {
    				debounce = true
    			}, 750);
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
    	mbuttons[2].style.color = "#d6d6d6"
    	mbuttons[2].style.backgroundColor = "#4d4d4d";
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
    	mbuttons[2].style.color = "#d6d6d6"
    	mbuttons[2].style.backgroundColor = "#4d4d4d";
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

    mbuttons[2].addEventListener("click", () => {
    	mbuttons[2].style.backgroundColor = "#6e6e6e";
    	mbuttons[2].style.color = "white"
    	mbuttons[1].style.color = "#d6d6d6"
    	mbuttons[1].style.backgroundColor = "#4d4d4d";
    	mbuttons[0].style.color = "#d6d6d6"
    	mbuttons[0].style.backgroundColor = "#4d4d4d";
    	document.getElementById("querycontainer").animate([{
    		borderColor: "white"
    	}], {
    		duration: 350,
    		fill: "forwards"
    	})
    	model = 'SATURN';

    	document.getElementById('send').animate([{
    		opacity: 0
    	}], {
    		duration: 250,
    		fill: "forwards"
    	})
    	setTimeout(function() {
    		document.getElementById("send").src = "./img/sendsaturn.png"
    		document.getElementById('send').animate([{
    			opacity: 1
    		}], {
    			duration: 250,
    			fill: "forwards"
    		})
    	}, 100);
    });


    //make search bar work
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
    			setTimeout(function() {
    				x.style.display = "none"
    			}, 250);
    		}
    	}
    });

    //settingsstuff
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
    document.getElementById('apikeyset').addEventListener("input", () => {
    	token = document.getElementById('apikeyset').value
    })
    document.getElementById("openSettings").addEventListener("click", openSettings)


    //room controls
    for (const x of [...document.getElementsByClassName("roomdelete")]) {
    	x.addEventListener("click", () => {
    		alert("deleterm")
    	})

    }

    //
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


    //make chat's saved messages compile into a string for the ai to have memory of the conversation for relevance questions and have a label under the sendbar that tells the user how many tokens/USD their query costs. should be model specific and can be found on openai's api page
    //when you're ready to go live use heroku for nodejs backend or digitalocean
    //search for %#($#) to find || TODO: make it so the dropdown for the selection buttons has animation and doesnt just suddenly appear
