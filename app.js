import gsap from "gsap"
import barba from "@barba/core"
import imagesLoaded from "imagesloaded";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {ScrollSmoother} from "gsap/ScrollSmoother";

import {closeTransitionFromTop, openTransitionFromTop} from "./src/animations/page-transitions.js";
import {generateMouseFollower} from "./src/components/custom-cursor/index.js";
import {Intro} from "./src/animations/preloader/lib/intro.js";
import {buildSlideShow} from "./src/components/slide-show/demo.js";
import {followMouse} from "./src/components/loading-percent/index.js";
import {handleContactClick, navLinkAnimation} from "./src/animations/socialLinks.js";
import {MagneticButton} from "./src/animations/magnetic-button.js";
import {addNavLinkAnimation} from "./src/animations/navlinks.js";
import {randomNumber} from "./src/utils/index.js";
import {counterAnimationTimeLine} from "./src/animations/counter-animation.js";
import {pageRevealAnimation} from "./src/animations/pageRevealAnimation.js";


gsap.registerPlugin(ScrollTrigger, ScrollSmoother);


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
    let smoothScroller;

    barba.init({
        views: [{
            namespace: "showcase", beforeLeave() {
                slideShow.deleteSlideShow();
                slideShow = null;
            }, beforeEnter() {
                slideShow = buildSlideShow(cursor);
            }
        }, {
            namespace: "home", beforeOnce() {
                const preloader = document.querySelector('.circles');
                const mbtns = document.querySelectorAll(".mag-btn");

                mbtns.forEach(btn => magneticButtons.push(new MagneticButton(btn)));

                const intro = new Intro(preloader);
                intro.start();


            },

            beforeEnter() {
                const mbtns = document.querySelectorAll(".mag-btn");
                mbtns.forEach(btn => magneticButtons.push(new MagneticButton(btn)));


            },

            beforeLeave() {
                magneticButtons.forEach(btn => btn.deleteEvents());
                magneticButtons = [];
            }
        },

            {
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
                }, beforeEnter() {
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
            },

            {
                namespace: "about", beforeEnter(data) {
                    body.classList.add("overflow");
                    smoothScroller = ScrollSmoother.create({
                        smooth: 1.5,               // how long (in seconds) it takes to "catch up" to the native scroll position
                        effects: true,           // looks for data-speed and data-lag attributes on elements
                        smoothTouch: 0.5,        // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
                    });
                }, afterLeave(data) {
                    body.classList.remove("overflow");
                    smoothScroller.kill();
                }
            }


        ], preventRunning: true, transitions: [{
            name: 'page-transition', async leave(data) {
                const done = this.async();
                openTransitionFromTop(overlayPath, done, count, cursor);
            },

            async after(data) {
                const done = this.async();
                const countEl = count.querySelector(".font-sec");
                let currentProgress = parseInt(countEl.innerText);
                let end = currentProgress + randomNumber(4, 7)
                if (data.next.namespace === "showcase") {
                    imagesLoaded(".slide__img", {background: true})
                        .on("progress", function (instance, image) {
                            counterAnimationTimeLine(count, {start: currentProgress, end: end}).play();
                            currentProgress = end;
                            end = currentProgress + randomNumber(4, 7);
                        }).on("done", function (instance) {
                        // const ttl = counterAnimationTimeLine(count, {start: currentProgress, end: 100, duration: 0.4}).play().play();
                        closeTransitionFromTop(overlayPath, done, count, cursor, false, currentProgress);
                    });
                } else {
                    closeTransitionFromTop(overlayPath, done, count, cursor);
                }

                pageRevealAnimation(data.next.namespace !== "showcase").play();

            }
        }, {
            name: "pre-loader", async beforeOnce() {
                gsap.to(body, {autoAlpha: 1})
            }, async once() {
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

