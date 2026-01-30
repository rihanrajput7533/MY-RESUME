/* =============================
   MENU TOGGLE (MOBILE)
============================= */
const menuBtn = document.getElementById("menuBtn");
const slideNav = document.getElementById("slideNav");

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    slideNav.classList.toggle("active");
});

/* =============================
   PAGE SLIDER
============================= */
const pageSlider = document.getElementById("pageSlider");
const pages = ["home", "about", "services", "projects", "contact"];
let currentIndex = 0;
let isScrolling = false;
const scrollDelay = 1000;

function goToPage(index) {
    if (index < 0 || index >= pages.length || isScrolling) return;

    isScrolling = true;
    currentIndex = index;

    // Reset classes
    pageSlider.className = "page-slider";
    if (pages[index] !== "home") {
        pageSlider.classList.add(`show-${pages[index]}`);
    }

    // Animate skills on services page
    if (pages[index] === "services") animateSkills();

    setTimeout(() => {
        isScrolling = false;
    }, scrollDelay);
}

/* =============================
   NAV CLICK
============================= */
document.querySelectorAll(".slide-nav a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const targetPage = link.dataset.target;
        const index = pages.indexOf(targetPage);

        // Close mobile menu
        menuBtn.classList.remove("active");
        slideNav.classList.remove("active");

        // Mobile smooth scroll
        if (window.innerWidth <= 480) {
            const section = document.getElementById(targetPage);
            if (section) {
                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
            return;
        }

        // Desktop slider
        goToPage(index);
    });
});

/* =============================
   DESKTOP SCROLL
============================= */
window.addEventListener("wheel", e => {
    if (isScrolling) return;

    if (e.deltaY > 0) goToPage(currentIndex + 1);
    else goToPage(currentIndex - 1);
}, { passive: true });

/* =============================
   MOBILE SWIPE
============================= */
let startY = 0;

window.addEventListener("touchstart", e => {
    startY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener("touchend", e => {
    const endY = e.changedTouches[0].clientY;
    const diff = startY - endY;

    if (Math.abs(diff) > 60) {
        if (diff > 0) goToPage(currentIndex + 1);
        else goToPage(currentIndex - 1);
    }
}, { passive: true });

/* =============================
   SKILLS ANIMATION
============================= */
function animateSkills() {
    document.querySelectorAll(".progress").forEach(bar => {
        bar.style.width = "0%";
        setTimeout(() => {
            bar.style.width = bar.dataset.width + "%";
        }, 200);
    });
}

/* =============================
   PROJECT MODAL
============================= */
const projects = [
    { title:"E-Commerce Website", desc:"Complete e-commerce platform with cart, checkout and admin dashboard.", link:"#"},
    { title:"Task Manager App", desc:"Modern to-do app with task tracking and productivity features.", link:"#"},
    { title:"Social Media App", desc:"Full social platform with posts, likes, comments and profiles.", link:"#"},
    { title:"Learning Management System", desc:"Online LMS with courses, videos and student management.", link:"#"},
    { title:"Job Portal", desc:"Job search platform for recruiters and candidates.", link:"#"},
    { title:"Admin Dashboard", desc:"Powerful analytics dashboard with charts and controls.", link:"#"},
    { title:"Banking App", desc:"Finance app with transactions and secure features.", link:"#"},
    { title:"Samsung Clone", desc:"Samsung website UI clone with animations and transitions.", link:"https://rihanrajput7533.github.io/Samsung-Clone/"}
];

const modal = document.getElementById("projectModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalLink = document.getElementById("modalLink");

function openProject(index){
    modal.classList.add("active");
    modalImg.src = document.querySelectorAll(".project-card img")[index].src;
    modalTitle.textContent = projects[index].title;
    modalDesc.textContent = projects[index].desc;
    modalLink.href = projects[index].link;
}

function closeProject(){
    modal.classList.remove("active");
}

document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeProject();
});

/* =============================
   SOCIAL LINKS
============================= */
const socialLinks = [
    { name:"Instagram", link:"https://www.instagram.com/rihan.techlab/" },
    { name:"LinkedIn", link:"https://www.linkedin.com/in/rihan-rajput-1b276036b/" },
    { name:"GitHub", link:"https://github.com/rihanrajput7533/" }
];

function openSocial(index){
    window.open(socialLinks[index].link, "_blank");
}

/* =============================
   AVATAR 3D HOVER
============================= */
const card = document.getElementById("avatar");
card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.07)`;
});

card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
});
