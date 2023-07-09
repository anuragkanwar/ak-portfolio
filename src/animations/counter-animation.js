import gsap from "gsap";

export function counterAnimationTimeLine(targets, options) {
    const config = {
        end: 100, start: 1, duration: 0.2, ease: "power1", increment: 1, ...options
    }
    const tween = gsap.to(targets, {
        onUpdate: () => {
            targets.innerHTML = `<span> Loading </span> - <span class="font-sec"> ${config.start + (Math.floor(tween.progress() * ((config.end - config.start))))}% </span>`;
        }, duration: config.duration
    }).pause();
    return tween;
}