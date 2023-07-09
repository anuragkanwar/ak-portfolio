import {gsap} from 'gsap';
import {EventEmitter} from 'events';
import {mousepos} from "../utils/index.js";

export class MagneticButton extends EventEmitter {
    constructor(el, onClick) {
        super();
        this.DOM = {el: el};
        this.DOM.parentNode = el.parentNode;
        this.DOM.cloneNode = el.cloneNode(true);
        this.DOM.activator = document.createElement("div");
        this.DOM.el = null;
        this.DOM.onClick = onClick;

        this.DOM.parentNode.removeChild(el);
        if (this.DOM.parentNode.classList.contains("mag-btn-wrapper")) {
            this.DOM.parentNode.appendChild(this.DOM.cloneNode);
        } else {
            this.DOM.wrapper = document.createElement("div");
            this.DOM.filler = document.createElement("div");
            this.DOM.text = document.createElement("span");
            this.DOM.textInner = document.createElement("span");
            this.DOM.textContent = this.DOM.cloneNode.innerText;


            this.DOM.wrapper.classList.add("mag-btn-wrapper");
            this.DOM.activator.classList.add("activator");
            this.DOM.filler.classList.add("button__filler");
            this.DOM.text.classList.add('button__text');
            this.DOM.textInner.classList.add('button__text-inner');

            this.DOM.cloneNode.innerHTML = "";

            this.DOM.textInner.innerText = this.DOM.textContent;
            this.DOM.text.appendChild(this.DOM.textInner);
            this.DOM.cloneNode.appendChild(this.DOM.filler);
            this.DOM.cloneNode.appendChild(this.DOM.text);
            this.DOM.wrapper.appendChild(this.DOM.cloneNode);
            this.DOM.wrapper.appendChild(this.DOM.activator);
            this.DOM.parentNode.appendChild(this.DOM.wrapper);


            this.rect = this.DOM.cloneNode.getBoundingClientRect();
            this.DOM.activator.style.width = `${(this.rect.width) * 1.5}px`;
            this.DOM.activator.style.height = `${(this.rect.height) * 2}px`;

        }

        this.initEvents();
    }

    startMagnetism(ev) {
        function applyAnimation(node, repel = false) {
            if (node) {
                gsap.killTweensOf(node);
                if (repel) {
                    gsap.to(node, {x: `-${x * 0.4}px`, y: `-${y * 0.4}px`, duration: 0.4})
                } else {
                    gsap.to(node, {x: `${x}px`, y: `${y}px`, duration: 0.4})
                }
            }
        }

        const parentNode = ev.target.parentNode;
        this.rect = ev.target.getBoundingClientRect();
        let x = (mousepos.x + window.scrollX - (this.rect.left + this.rect.width / 2)) * .4;
        let y = (mousepos.y + window.scrollY - (this.rect.top + this.rect.height / 2)) * .4;
        applyAnimation(parentNode);

    }

    resetBtn(ev) {
        function applyAnimation(node,) {
            if (node) {
                gsap.killTweensOf(node);
                gsap.to(parentNode, {x: `0`, y: `0`, duration: 0.2});
            }
        }

        const parentNode = ev.target.parentNode;
        const filler = parentNode.querySelector('.button__filler');
        const text = parentNode.querySelector('.button__text');
        applyAnimation(parentNode);

    }

    onHover(ev) {
        const parentNode = ev.target.parentNode;
        const btn = parentNode.querySelector(".mag-btn");
        const filler = parentNode.querySelector('.button__filler');
        const textInner = parentNode.querySelector('.button__text-inner');
        btn.classList.add("btn--hover");
        gsap.killTweensOf(textInner);
        gsap.killTweensOf(filler);
        gsap
            .timeline()
            .fromTo(filler, {y: '75%'}, {
                ease: 'Power3.easeOut', y: '0%', duration: 0.5
            })
            .to(textInner, {
                ease: 'Power3.easeOut', opacity: 0, duration: 0.1, y: '-10%'
            }, 0)
            .fromTo(textInner, {y: '30%', opacity: 1}, {
                ease: 'Power3.easeOut', opacity: 1, duration: 0.25, y: '0%',
            }, 0.1);

    }

    onLeave(ev) {
        const parentNode = ev.target.parentNode;
        const btn = parentNode.querySelector(".mag-btn");
        const filler = parentNode.querySelector('.button__filler');
        const textInner = parentNode.querySelector('.button__text-inner');
        btn.classList.remove("btn--hover");
        gsap.killTweensOf(textInner);
        gsap.killTweensOf(filler);
        gsap
            .timeline()
            .to(filler, {
                ease: 'Power3.easeOut', y: '-75%', duration: 0.4,
            })
            .to(textInner, {
                ease: 'Power3.easeOut', opacity: 0, y: '10%', duration: 0.1,
            }, 0)
            .fromTo(textInner, {y: '-30%', opacity: 1}, {
                ease: 'Power3.easeOut', opacity: 1, y: '0%', duration: 0.25,
            }, 0.1);
    }

    handleClick(ev, onClick) {
        const parentNode = ev.target.parentNode;
        const btn = parentNode.querySelector(".mag-btn");
        console.log("inside clicked", onClick);
        if (onClick) {
            onClick();
        } else {
            btn.click();
        }
    }

    initEvents() {
        this.DOM.activator.addEventListener("mousemove", this.startMagnetism);
        this.DOM.activator.addEventListener("mouseleave", this.resetBtn);
        this.DOM.activator.addEventListener("mouseleave", this.onLeave);
        this.DOM.activator.addEventListener("mouseenter", this.onHover);
        this.DOM.activator.addEventListener("click", this.handleClick);
    }

    deleteEvents() {
        this.DOM.activator.removeEventListener("mousemove", this.startMagnetism);
        this.DOM.activator.removeEventListener("mouseleave", this.resetBtn);
        this.DOM.activator.removeEventListener("mouseleave", this.onLeave);
        this.DOM.activator.removeEventListener("mouseenter", this.onHover);
        this.DOM.activator.removeEventListener("click", this.DOM.handleClick);
    }

    enter() {
        this.emit('enter');
    }

    leave() {
        this.emit('leave');
    }
}