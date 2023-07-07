import {gsap} from "gsap";


export const getMousePos = e => {
    return {
        x: e.clientX, y: e.clientY
    };
};

// Returns the window width and height
export const getWinSize = () => {
    return {
        width: window.innerWidth, height: window.innerHeight
    };
};

export const dist = (x1, y1, x2, y2) => {
    const a = x1 - x2;
    const b = y1 - y2;
    return Math.hypot(a, b);
};

export const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const isFirefox = () => navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
export let winsize = getWinSize();
window.addEventListener('resize', () => winsize = getWinSize());

export let mousepos = {x: 0, y: 0};
window.addEventListener('mousemove', ev => mousepos = getMousePos(ev));