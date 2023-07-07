import {Intro} from './intro';

const preloader = document.querySelector('.circles');
if (preloader) {
    const intro = new Intro(preloader);
    intro.start();
}
