import gsap from "gsap";

const socialLinks = document.querySelectorAll(".social_links");

export function navLinkAnimation(link, forw) {
    return gsap.to(link, {
        y: forw ? "-100%" : "0%", duration: 0.5, ease: "Power3.easeOut"
    })
}

export function handleContactClick(ev) {
    switch (ev.target.dataset.type) {
        case "mail":
            location.href = "mailto:anurag.kanwar.gg@gmail.com";
            break;
        case "phone":
            location.href = "tel:+919882635115";
            break;
        default:
    }
}
