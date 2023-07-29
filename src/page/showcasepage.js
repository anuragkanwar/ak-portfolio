import {buildSlideShow} from "../components/slide-show/demo.js";
import {handleContactClick, navLinkAnimation} from "../animations/socialLinks.js";

let slideShow;
let showcaseLinks;

const beforeLeave = () => {
    slideShow.deleteSlideShow();
    slideShow = null;
    showcaseLinks.forEach(link => {
        link.removeEventListener("mouseover", () => {
            navLinkAnimation(link.querySelector(".link"), true);
        })

        link.removeEventListener("mouseout", () => {
            navLinkAnimation(link.querySelector(".link"), false);
        })
    })
}

const beforeEnter = (cursor) => {
    showcaseLinks = document.querySelectorAll(".content__link");
    slideShow = buildSlideShow(cursor);
    showcaseLinks.forEach(link => {
        link.addEventListener("mouseover", () => {
            navLinkAnimation(link.querySelector(".link"), true);
        })

        link.addEventListener("mouseout", () => {
            navLinkAnimation(link.querySelector(".link"), false);
        })
    })
}

export const showcasePage = {beforeEnter, beforeLeave};

