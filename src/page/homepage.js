import {Intro} from "../animations/preloader/lib/intro.js";
import {startEleSurfaceSampling, stopEleSurfaceSampling} from "../animations/surface-sampling/elephant.js";


const beforeOnce = () => {
    const preloader = document.querySelector('.circles');
    const intro = new Intro(preloader);
    intro.start();

};

const beforeEnter = () => {
    startEleSurfaceSampling();
};

const beforeLeave = () => {
    stopEleSurfaceSampling();
};

export const homePage = {beforeLeave, beforeOnce, beforeEnter};
