const menuButton = document.querySelector(".burguer");
const menu = document.getElementById("menu");
const nav = document.getElementById("navBar");

let posicionY = 0;

document.addEventListener("click", (e) => {
  if (e.target.matches(".menu__item")) {
    menuButton.classList.remove("open");
    menu.classList.remove("menu--visible");
    nav.classList.remove("navBar--fixed");
    document.body.classList.remove("navbarPlaceholder");
  }
  if (e.target.matches('.burguer') || e.target.matches('.burguer *')) {
    menuButton.classList.toggle("open");
    menu.classList.toggle("menu--visible");
    nav.classList.toggle("navBar--fixed");
    document.body.classList.toggle("navbarPlaceholder");
  }
})

document.addEventListener('scroll', () => {
  if (posicionY > scrollY) {
    nav.classList.add('navBar--sticky');
  } else {
    nav.classList.remove('navBar--sticky');
  }
  posicionY = scrollY;
})