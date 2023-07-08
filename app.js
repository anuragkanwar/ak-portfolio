import gsap from "gsap"
import barba from "@barba/core"
import {closeTransitionFromTop, openTransitionFromTop} from "./src/animations/page-transitions.js";
import {generateMouseFollower} from "./src/components/custom-cursor/index.js";
import {Intro} from "./src/animations/preloader/lib/intro.js";
import {buildSlideShow} from "./src/components/slide-show/demo.js";
import {followMouse} from "./src/components/loading-percent/index.js";
import {handleContactClick, navLinkAnimation} from "./src/animations/socialLinks.js";
import {MagneticButton} from "./src/animations/magnetic-button.js";
import {addNavLinkAnimation} from "./src/animations/navlinks.js";
import {randomNumber} from "./src/utils/index.js";


const body = document.querySelector("body");
gsap.to(body, {autoAlpha: 0, duration: 0});

function init() {
    let slideShow;
    followMouse(document.querySelector("#progress"));

    const overlayPath = document.querySelector(".overlay__path");
    const count = document.getElementById("progress");
    const cursor = generateMouseFollower();
    cursor.removeState("-hidden");
    addNavLinkAnimation(cursor);

    function delay(n) {
        n = n || 2000;
        return new Promise((done) => {
            setTimeout(() => {
                done();
            }, n);
        });
    }


    let intro;
    let magneticButtons = [];
    let socialLinks;
    barba.init({
        views: [{
            namespace: "showcase", beforeLeave(data) {
                slideShow.deleteSlideShow();
                slideShow = null;
            }, beforeEnter() {
                slideShow = buildSlideShow();
            }
        }, {
            namespace: "home", beforeOnce(data) {
                const preloader = document.querySelector('.circles');
                const mbtns = document.querySelectorAll(".mag-btn");
                mbtns.forEach(btn => magneticButtons.push(new MagneticButton(btn)));
                const intro = new Intro(preloader);
                intro.start();
            },

            beforeEnter(data) {
                const mbtns = document.querySelectorAll(".mag-btn");
                mbtns.forEach(btn => magneticButtons.push(new MagneticButton(btn)));
            },

            beforeLeave(data) {
                magneticButtons.forEach(btn => btn.deleteEvents());
                magneticButtons = [];
            }
        }, {
            namespace: "contact", beforeLeave(data) {
                socialLinks.forEach(link => {
                    link.removeEventListener("mouseover", (ev) => {
                        navLinkAnimation(link.querySelector(".link"), true);
                    })

                    link.removeEventListener("mouseout", () => {
                        navLinkAnimation(link.querySelector(".link"), false);
                    })
                    magneticButtons.forEach(btn => btn.deleteEvents());
                    magneticButtons = [];
                })
            }, beforeEnter(data) {
                socialLinks = document.querySelectorAll(".social_links");
                const mbtns = document.querySelectorAll(".mag-btn")
                socialLinks.forEach(link => {
                    link.addEventListener("mouseover", (ev) => {
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
            }
        }

        ], preventRunning: true, transitions: [{
            name: 'page-transition', async leave(data) {
                const done = this.async();
                openTransitionFromTop(overlayPath, done, count, cursor);
            },

            async after(data) {
                const done = this.async();
                setTimeout(closeTransitionFromTop, randomNumber(0, 500), overlayPath, done, count, cursor);
            }
        }, {
            name: "pre-loader",
            async beforeOnce() {
                gsap.to(body, {autoAlpha: 1})
            }
            , async once() {
                const preloader = document.querySelector('.circles');
                intro = new Intro(preloader);
                intro.start();
            }, async afterOnce() {
                intro = null;
            }
        }]
    });
}

window.addEventListener("DOMContentLoaded", init);

