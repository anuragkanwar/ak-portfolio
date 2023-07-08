import {gsap} from "gsap";


let isAnimating = false;
export const openTransitionFromBottom = (overlayPath, onComplete, count, cursor) => {
    if (isAnimating) return;
    isAnimating = true;
    const tl = gsap.timeline({
        onComplete: () => {
            isAnimating = false;
            gsap.to(count, {autoAlpha: 0, delay: 0.1});
            count.innerHTML = `<span> Loading </span>  - <span class="font-sec"> ${100}% </span>`;
            onComplete();
        }, onUpdate: () => {
            let countNumber = Math.round(tl.progress() * 50);
            count.innerHTML = `<span> Loading </span>  - <span class="font-sec"> ${50 + countNumber}% </span>`;
        }
    })
        .set(overlayPath, {
            attr: {d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z'}
        })
        .to(overlayPath, {
            duration: 0.65, ease: 'power4.in', attr: {d: 'M 0 100 V 50 Q 50 0 100 50 V 100 z'}
        }, 0)
        .to(overlayPath, {
            duration: 0.3, ease: 'power2', attr: {d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z'},
        })
};

export const openTransitionFromTop = (overlayPath, onComplete, count) => {

    if (isAnimating) return;
    isAnimating = true;
    const tl = gsap.timeline({
        onComplete: () => {
            isAnimating = false;
            count.innerHTML = `<span> Loading </span>  - <span class="font-sec"> ${50}% </span>`;
            onComplete();
        }, onUpdate: () => {
            let countNumber = Math.round(tl.progress() * 50);
            count.innerHTML = `<span> Loading </span>  - <span class="font-sec"> ${countNumber}% </span>`;
        }
    })
        .set(overlayPath, {
            attr: {d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z'}
        })
        .to(overlayPath, {
            duration: 0.65, ease: 'power4.in', attr: {d: 'M 0 0 V 50 Q 50 100 100 50 V 0 z'}
        }, 0)
        .to(overlayPath, {
            duration: 0.3, ease: 'power2', attr: {d: 'M 0 0 V 100 Q 50 100 100 100 V 0 z'},
        })

};

export const closeTransitionFromBottom = (overlayPath, onComplete) => {
    if (isAnimating) return;
    isAnimating = true;
    console.log(count);
    const tl = gsap.timeline({
        onComplete: () => {
            isAnimating = false;
            onComplete();
        }
    })
        .set(overlayPath, {
            attr: {d: 'M 0 0 V 100 Q 50 100 100 100 V 0 z'}
        })
        .to(overlayPath, {
            duration: 0.3, ease: 'power2.in', attr: {d: 'M 0 0 V 50 Q 50 0 100 50 V 0 z'}
        })
        .to(overlayPath, {
            duration: 0.65, ease: 'power4', attr: {d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z'}
        });
};


export const closeTransitionFromTop = (overlayPath, onComplete, count, cursor) => {

    if (isAnimating) return;
    isAnimating = true;
    const tl = gsap.timeline({
        onComplete: () => {
            isAnimating = false;
            gsap.to(count, {autoAlpha: 0, delay: 0.1});
            cursor.removeState("-hidden");
            count.innerHTML = `<span> Loading </span>  - <span class="font-sec"> ${100}% </span>`;
            const html = document.querySelector("html");
            html.classList.remove("page-transition");
            setTimeout(() => {
                count.innerHTML = ``;
            }, 500);
            onComplete();
        }, onUpdate: () => {
            let countNumber = Math.round(tl.progress() * 50);
            count.innerHTML = `<span> Loading </span>  - <span class="font-sec"> ${50 + countNumber}% </span>`;
        }
    })
        // now reveal
        .set(overlayPath, {
            attr: {d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z'}
        })
        .to(overlayPath, {
            duration: 0.3, ease: 'power2.in', attr: {d: 'M 0 100 V 50 Q 50 100 100 50 V 100 z'}
        })
        .to(overlayPath, {
            duration: 0.65, ease: 'power4', attr: {d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z'}
        });
};






