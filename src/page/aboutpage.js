import gsap from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {ScrollSmoother} from "gsap/ScrollSmoother";
import SplitText from "gsap/SplitText";
import {generateMarquee} from "../animations/marquee.js";
import {deleteSpreadGrid, generateSpreadGrid} from "../animations/bouncy-grid/grid.js";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

let smoothScroller;

const beforeOnce = () => {

};

const beforeEnter = (body, html, cursor, count) => {
    body.classList.add("overflow");
    generateMarquee();
    const panels = document.querySelectorAll(".about");
    ScrollTrigger.create({
        trigger: panels[0], start: "top top", end: "bottom top", pin: true, pinSpacing: false
    });
    ScrollTrigger.create({
        trigger: panels[1], start: "top top", end: "top top", pin: true, pinSpacing: false
    });

    smoothScroller = ScrollSmoother.create({
        smooth: 1.5,               // how long (in seconds) it takes to "catch up" to the native scroll position
        effects: true,           // looks for data-speed and data-lag attributes on elements
        smoothTouch: 0.5,        // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
    });

    const extraLink = document.querySelector(".meet-me-container a");
    const navLinks = [...document.querySelectorAll(".nav-link")];
    extraLink.addEventListener("click", () => {
        html.classList.add("page-transition");
        cursor.addState("-hidden");
        gsap.to(count, {autoAlpha: 1});
        setTimeout(() => {
            navLinks.forEach(link2 => {
                link2.classList.remove("active");
            })
            navLinks.at(-1).classList.add("active");
        }, 1000)
    })

    extraLink.addEventListener("mouseenter", () => {
        cursor.addState("-active -opaque");
    });

    extraLink.addEventListener("mouseout", () => {
        cursor.removeState("-active -opaque");
    });
    generateSpreadGrid(cursor);
};

const beforeLeave = () => {

};

const afterLeave = (body) => {
    body.classList.remove("overflow");
    smoothScroller.kill();
    deleteSpreadGrid();
}

export const aboutPage = {beforeLeave, beforeOnce, beforeEnter, afterLeave};