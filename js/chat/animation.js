import * as utils from "../modules.js"
//opacity 1 = visible; opacity 0 = invisible
async function animation_close_chat_hover(object, value) {
    //hovering over close chat button

    if (value === 1) {
        const goal = {
            "color": "#c23e3e"
        }
        const animation = {
            duration: 250,
            fill: "forwards"
        }
        return object.animate([goal], animation)
    }
    else {
        const goal = {
            "color": "#FFFFFF"
        }
        const animation = {
            duration: 250,
            fill: "forwards"
        }

        return object.animate([goal], animation)
    }
}
async function animation_close_chat_visibility(object, value) {
    //making the close chat button fade in
    const animations = object.getAnimations();

    if (value === 1) {
        object.style.display = "block"

    }
    else {

            object.style.display = "none"

    }
}

async function animation_friend_hover(object, value) {
    //hovering over friend card
    if (value === 1) {
        const goal = {
            "borderColor": "#1693db"
        }
        const animation = {
            duration: 250,
            fill: "forwards"
        }
        return object.animate([goal], animation)
    }
    else {
        const goal = {
            "borderColor": "#2e2e2e"
        }
        const animation = {
            duration: 250,
            fill: "forwards"
        }

        return object.animate([goal], animation)
    }

}
export class setup_room_hover {
    constructor(obj) {
        const close_friend = obj.children[2]
        this.hover = false

        obj.addEventListener("mouseenter", (__hoveranim__) => {
            this.hover = true
            setTimeout(() => {
                animation_friend_hover(obj, 1)
                animation_close_chat_visibility(close_friend, 1)
            }, 10);
        })

        obj.addEventListener("mouseleave", (__hoveranim__) => {
            this.hover = false
            setTimeout(() => {
                animation_friend_hover(obj, 0)
                animation_close_chat_visibility(close_friend, 0)
            }, 10);


        })
    }


}

export class setup_closeroom_hover {
    constructor(obj) {
        this.hover = false
        obj.addEventListener("mouseenter", () => {
            this.hover = true
            animation_close_chat_hover(obj, 1)
        })
        obj.addEventListener("mouseleave", () => {
            this.hover = false
            animation_close_chat_hover(obj, 0)
        })
    
    }
}
