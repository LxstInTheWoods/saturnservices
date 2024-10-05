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
            "backgroundColor": "#303030"
        }
        const animation = {
            duration: 250,
            fill: "forwards"
        }
        return object.animate([goal], animation)
    }
    else {
        const goal = {
            "backgroundColor": "#3c4043"
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

    get_close_hover_state() {
        return this.hover
    }

}

export async function setup_closebutton_hover(obj) {
    obj.addEventListener("mouseenter", () => {
        animation_close_chat_hover(obj, 1)
    })
    obj.addEventListener("mouseleave", () => {
        animation_close_chat_hover(obj, 0)
    })


}
