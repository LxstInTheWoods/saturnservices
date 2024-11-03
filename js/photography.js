window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY; // Current scroll position
    const windowHeight = window.innerHeight; // Full height of the viewport
    const sectionHeight = document.querySelector('.s01').offsetHeight; // Height of the second section

    // Calculate the translate value for the sliding effect
    const translateY = Math.max(0, Math.min(scrollTop, sectionHeight));

    // Apply the translation to the second section
    document.querySelector('.s01').style.transform = `translateY(${100 - (translateY / windowHeight) * 100}%)`;

    // Prevent scrolling past the total height of both sections
    console.log(scrollTop, sectionHeight)
    if (scrollTop >= sectionHeight / 2) {
        window.scrollTo(0, sectionHeight / 2); // Keep at the last section
    }
});

(async ()=>{
    const viewframe = document.getElementById('viewframe');
    let selected;
    
    async function run_anim_queue(object, keyframes, options) {
        const activeAnimations = object.getAnimations();
        if (activeAnimations.length > 0) {
            await Promise.all(activeAnimations.map(animation => animation.finished));
        }
    
        return object.animate(keyframes, options);
    } 
    
    function updateVF(path) {
        console.log(path);
    
        const animation = run_anim_queue(viewframe, [{ 'opacity': 0 }], { "duration": 150, "fill": "forwards" });
        animation.then(anim => {
            anim.onfinish = () => {
                viewframe.src = path;
                run_anim_queue(viewframe, [{ 'opacity': 1 }], { "duration": 150, "fill": "forwards" });
            };
        }).catch(error => console.error("Animation error:", error));
    }

    const fileNames_raw = await fetch("https://terminalsaturn.com/getphotodir", {
        method:"GET",
        headers:{"Content-Type":"application/json"},
        mode:"cors"
    })
    const done = await fileNames_raw.json()
    done.forEach((path, index) => {
        if (path === ".DS_Store") {return}
        index += 1
        const selector = document.getElementById("selectorholder")
        const img_span = document.getElementsByClassName("cloneimg-select")[0].cloneNode(true);
        const label = img_span.children[1]
        const img = img_span.children[0]

        label.textContent = index > 9 ? `${index}.` : `0${index}.` 
        selector.appendChild(img_span)

        const updatedPath = "./img/photographyassets/" + path


        img.src = updatedPath
        img_span.style.display = "block"

        function blur(obj) {
            run_anim_queue(obj, [{"filter":"blur(2px)"}], {"fill":"forwards", duration:250})
        }
        function unBlur(obj) {
            run_anim_queue(obj, [{"filter":"blur(0px)"}], {"fill":"forwards", duration:250})

        }
        function focusLabel(obj) {
            run_anim_queue(obj, [{"color":"white"}], {"fill":"forwards", duration:250})
        }
        function unFocusLabel(obj) {
            run_anim_queue(obj, [{"color":"#4b4b4b"}], {"fill":"forwards", duration:250})
        }

        async function blurAll(){
            for (const x of document.getElementById("selectorholder").children) {
                blur(x.children[0])
                unFocusLabel(x.children[1])
            }
            console.log("done")
        }

        if (index === 1) {
            focusLabel(label)
            unBlur(img)
            updateVF(updatedPath)
        }
        img.addEventListener("mouseenter", () =>{
            if (!selected || selected != img){
                unBlur(img)
            }
        })
        img.addEventListener("mouseleave", ()=>{
            if (!selected || selected != img){
                blur(img)
            }
        })


        img.addEventListener("click", async () =>{
            blurAll()
            focusLabel(label)
            selected = img
            unBlur(img)
            updateVF(updatedPath)

        })

    });
})()