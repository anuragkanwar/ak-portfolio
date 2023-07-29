import {handleContactClick, navLinkAnimation} from "../animations/socialLinks.js";
import {MagneticButton} from "../animations/magnetic-button.js";

let socialLinks;
let magneticButtons = [];
const beforeOnce = () => {

};

const beforeEnter = () => {
    socialLinks = document.querySelectorAll(".social_links");
    const mbtns = document.querySelectorAll(".mag-btn")
    socialLinks.forEach(link => {
        link.addEventListener("mouseover", () => {
            navLinkAnimation(link.querySelector(".link"), true);
        })

        link.addEventListener("mouseout", () => {
            navLinkAnimation(link.querySelector(".link"), false);
        })

        link.addEventListener("click", (ev) => {
            handleContactClick(ev);
        })
    })

    mbtns.forEach(btn => magneticButtons.push(new MagneticButton(btn)));
};

const beforeLeave = () => {
    socialLinks.forEach(link => {
        link.removeEventListener("mouseover", () => {
            navLinkAnimation(link.querySelector(".link"), true);
        })

        link.removeEventListener("mouseout", () => {
            navLinkAnimation(link.querySelector(".link"), false);
        })
    })
    magneticButtons.forEach(btn => btn.deleteEvents());
    magneticButtons = [];
};

export const contactPage = {beforeLeave, beforeOnce, beforeEnter};