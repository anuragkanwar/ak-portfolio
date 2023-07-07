import gsap from "gsap";

export const followMouse = (ele) => {
    gsap.set(ele, {
        xPercent: -50, yPercent: -50,
    });

    window.addEventListener("mousemove", (e) => {
        gsap.to(ele, {
            duration: 0.5, x: e.clientX, y: e.clientY, ease: "power4.out"
        });
    })
}
