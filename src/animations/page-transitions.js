import {gsap} from "gsap";

// const overlayPath = document.querySelector('.overlay__path');


let isAnimating = false;
export const openTransitionFromBottom = (overlayPath, onComplete) => {
    if (isAnimating) return;
    isAnimating = true;
    gsap.timeline({
        onComplete: () => {
            isAnimating = false;
            onComplete();
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

export const closeTransitionFromBottom = (overlayPath, onComplete) => {
    if (isAnimating) return;
    isAnimating = true;
    gsap.timeline({
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

export const openTransitionFromTop = (overlayPath, onComplete) => {

    if (isAnimating) return;
    isAnimating = true;
    gsap.timeline({
        onComplete: () => {
            isAnimating = false;
            onComplete();
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
export const closeTransitionFromTop = (overlayPath, onComplete) => {

    if (isAnimating) return;
    isAnimating = true;
    gsap.timeline({
        onComplete: () => {
            isAnimating = false;
            onComplete();
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






