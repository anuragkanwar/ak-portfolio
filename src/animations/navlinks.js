import gsap from "gsap";
import {cursor} from "../components/custom-cursor/index.js";

const navLinks = document.querySelectorAll(".nav-link");

function navLinkAnimation(link, forw) {
    return gsap.to(link, {
        y: forw ? "-100%" : "0%", duration: 0.5, ease: "Power3.easeOut"
    })
}

navLinks.forEach(link => {

    link.addEventListener("click", (ev) => {
        setTimeout(() => {
            navLinks.forEach(link2 => {
                link2.classList.remove("active");
            })
            ev.target.classList.add("active");
        }, 1000)
    })

    link.addEventListener("mouseover", (ev) => {
        cursor.addState("-active -opaque");
        cursor.setStick(ev.target);
        navLinkAnimation(link.querySelector(".n__link"), true);
    })

    link.addEventListener("mouseout", () => {
        cursor.removeStick();
        cursor.removeState("-active -opaque");
        navLinkAnimation(link.querySelector(".n__link"), false);
    })
})
