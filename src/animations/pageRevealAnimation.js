import gsap from "gsap";

export function pageRevealAnimation(deep = true) {

    return gsap.timeline()
        .from("nav > ul > li > a > *", {
            opacity: 0, xPercent: 5, stagger: {each: 0.08, from: "end"}, ease: "power3.Out", delay: 0.4
        })
        .from(`${deep ? "main > * > *" : "main > *"}`, {
            opacity: 0, yPercent: -5, stagger: 0.08, ease: "expo.Out", duration: 1
        }, "<").pause();
}