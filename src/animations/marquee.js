import {Reeller, ScrollerPlugin} from 'reeller';
import gsap from 'gsap';

Reeller.registerGSAP(gsap);
Reeller.use(ScrollerPlugin);

let reeller = [];

export function generateMarquee() {
    reeller.push(new Reeller({
        container: '.reel-1',
        wrapper: '.reel-wrap-1',
        itemSelector: '.reel-item',
        paused: false,
        autoUpdate: true,
        autoStop: false,
        speed: 16,
        plugins: {
            scroller: {
                speed: 1,
                multiplier: 0.2,
                threshold: 1,
            },
        },
    }));

    reeller.push(new Reeller({
        container: '.reel-2',
        wrapper: '.reel-wrap-2',
        itemSelector: '.reel-item',
        paused: false,
        autoUpdate: true,
        autoStop: false,
        speed: 16,
        plugins: {
            scroller: {
                speed: 1,
                multiplier: 0.2,
                threshold: 1,
                reversed: true
            },
        },
    }));
}

export function removeMarquee() {
    reeller = null;
}
