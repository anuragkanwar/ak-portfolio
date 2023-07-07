import barba from "@barba/core"
import Router from "@barba/router"
import {closeTransitionFromTop, openTransitionFromTop} from "./src/animations/page-transitions.js";
import MouseFollower from "./src/components/custom-cursor/index.js";
import {gsap} from "gsap";
import "/src/animations";
import "./src/components/slide-show/demo.js";
import {Intro} from "./src/animations/preloader/lib/intro.js";
import {buildSlideShow} from "./src/components/slide-show/demo.js";
import {followMouse} from "./src/components/loading-percent/index.js";
import {handleContactClick, navLinkAnimation} from "./src/animations/socialLinks.js";
import MagneticBehaviour from "./src/animations/magnetic-behaviour.js";


let slideShow;
followMouse(document.querySelector("#progress"));

function init() {

    const overlayPath = document.querySelector(".overlay__path");

    function delay(n) {
        n = n || 2000;
        return new Promise((done) => {
            setTimeout(() => {
                done();
            }, n);
        });
    }


    let intro;
    let magbtns = [];
    let magbtnaAnimationRequest = [];
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
                const intro = new Intro(preloader);
                intro.start();
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
                    magbtnaAnimationRequest.forEach(rqst => cancelAnimationFrame(rqst));
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

                mbtns.forEach(btn => magbtns.push(new MagneticBehaviour(btn)));
                magbtns.forEach(btn => magbtnaAnimationRequest.push(requestAnimationFrame(() => {
                    btn.render();
                })))
            }
        }

        ], preventRunning: true, transitions: [{
            name: 'page-transition', async leave(data) {
                const done = this.async();
                openTransitionFromTop(overlayPath, done, followMouse);
            },

            async after(data) {
                const done = this.async();
                closeTransitionFromTop(overlayPath, done, followMouse);
            }
        }, {
            name: "pre-loader", async once() {
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

