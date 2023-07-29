import gsap from "gsap"
import barba from "@barba/core"
import imagesLoaded from "imagesloaded";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {ScrollSmoother} from "gsap/ScrollSmoother";
import SplitText from "gsap/SplitText";

import {closeTransitionFromTop, openTransitionFromTop} from "./src/animations/page-transitions.js";
import {generateMouseFollower} from "./src/components/custom-cursor/index.js";
import {Intro} from "./src/animations/preloader/lib/intro.js";
import {followMouse} from "./src/components/loading-percent/index.js";
import {addNavLinkAnimation} from "./src/animations/navlinks.js";
import {randomNumber, setNavLinkActive} from "./src/utils/index.js";
import {counterAnimationTimeLine} from "./src/animations/counter-animation.js";
import {pageLeaveAnimation, pageRevealAnimation} from "./src/animations/pageRevealAnimation.js";
import {showcasePage} from "./src/page/showcasepage.js";
import {homePage} from "./src/page/homepage.js";
import {contactPage} from "./src/page/contactpage.js";
import {aboutPage} from "./src/page/aboutpage.js";


gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);


const body = document.querySelector("body");
const html = document.querySelector("html");
const count = document.getElementById("progress");
gsap.to(body, {autoAlpha: 0, duration: 0});

function init() {

    followMouse(document.querySelector("#progress"));
    const overlayPath = document.querySelector(".overlay__path");
    const cursor = generateMouseFollower();
    cursor.removeState("-hidden");
    addNavLinkAnimation(cursor);


    let intro;

    const loc = document.location;
    setNavLinkActive(loc.pathname);


    barba.init({
        views: [{
            namespace: "showcase", beforeLeave() {
                showcasePage.beforeLeave();
            }, beforeEnter() {
                showcasePage.beforeEnter(cursor);
            }
        }, {
            namespace: "home", beforeOnce() {
                homePage.beforeOnce();
            }, beforeEnter() {
                homePage.beforeEnter();
            }, beforeLeave() {
                homePage.beforeLeave();
            }
        }, {
            namespace: "contact", beforeLeave(data) {
                contactPage.beforeLeave();
            }, beforeEnter() {
                contactPage.beforeEnter();
            }
        },

            {
                namespace: "about", beforeEnter(data) {
                    aboutPage.beforeEnter(body, html, cursor, count);
                }, afterLeave(data) {
                    aboutPage.afterLeave(body);
                }
            }


        ], preventRunning: true, transitions: [{
            name: 'page-transition', async leave(data) {
                const done = this.async();
                pageLeaveAnimation().play();
                openTransitionFromTop(overlayPath, done, count, cursor);
            },

            async after(data) {
                const done = this.async();
                cursor.removeState("-active -opaque");
                cursor.removeText();
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
                } else if (data.next.namespace === "about") {
                    imagesLoaded(".grid__item-img", {background: true})
                        .on("progress", function (instance, image) {
                            counterAnimationTimeLine(count, {start: currentProgress, end: end}).play();
                            currentProgress = end;
                            end = currentProgress + randomNumber(1, 3);
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

