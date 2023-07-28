import {buildSlideShow} from "../components/slide-show/demo.js";

let slideShow;

const beforeLeave = () => {
    slideShow.deleteSlideShow();
    slideShow = null;
}

const beforeEnter = (cursor) => {
    slideShow = buildSlideShow(cursor);
}

export const showcasePage = {beforeEnter, beforeLeave};

