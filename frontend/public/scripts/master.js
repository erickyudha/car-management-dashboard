const navBurgerBtn = document.querySelector(".right-nav > img");
const leftNavElement = document.querySelector(".left-nav");
const navElement = document.querySelector("nav");
const rightSidebarElement = document.querySelector(".right-sidebar");
const bodyElement = document.querySelector("body")

const toggleNavMenu = () => {
    navElement.classList.toggle("active");
    leftNavElement.classList.toggle("active");
    rightSidebarElement.classList.toggle("active");
    bodyElement.classList.toggle("nav-active")
}
navBurgerBtn.addEventListener("click", toggleNavMenu)