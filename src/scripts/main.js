const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};

const openBurgerMenu = document.querySelector(".nav__menu-button"),
  closeBurgerMenu = document.querySelector(".burger-menu__close-button");

const burgerMenu = document.querySelector(".nav__burger-menu");

openBurgerMenu.addEventListener("click", () => burgerMenu.classList.add("burger-menu_active"));
closeBurgerMenu.addEventListener("click", () => burgerMenu.classList.remove("burger-menu_active"));

let burgerMenuLinks = document.querySelectorAll(".burger-menu__link");
for (let link of burgerMenuLinks) {
  link.addEventListener("click", () => burgerMenu.classList.remove("burger-menu_active"));
}


let primaryInputs = document.querySelectorAll(".auth-form .input_primary");
for (let input of primaryInputs) {
  input.classList.add("input_start");

  input.addEventListener("input", (e) => {
    let val = e.target.value,
      target = e.target;

    if (val !== "") {
      target.classList.add("input_active");
    } else {
      target.classList.remove("input_active");
    }
  });

  input.addEventListener("blur", (e) => {
    let target = e.target;
    if (target.value !== "") {
      target.classList.remove("input_start");
    } else {
      input.classList.add("input_start");
    }
  });
}

function ChatMove(){
  let button = document.querySelector('.chat__button');
  let chat = document.querySelector('#chat');
  let buf = getComputedStyle(button).right;
  button.style.right = getComputedStyle(chat).right;
  chat.style.right = buf;
}
