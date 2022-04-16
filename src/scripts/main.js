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

openBurgerMenu?.addEventListener("click", () => burgerMenu.classList.add("burger-menu_active"));
closeBurgerMenu?.addEventListener("click", () => burgerMenu.classList.remove("burger-menu_active"));

let burgerMenuLinks = document.querySelectorAll(".burger-menu__link");
for (let link of burgerMenuLinks) {
  link.addEventListener("click", () => burgerMenu.classList.remove("burger-menu_active"));
}


if(window.innerWidth < 800){
  document.querySelector('.auth-form').style.display = 'none';
  document.querySelector('.auth-form-mobile').style.display = 'block';
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

let primaryInputsMobile = document.querySelectorAll(".auth-form-mobile .input_primary");
for (let input of primaryInputsMobile) {
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

function SignUpMove(){
  let reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  if(document.forms[1].elements['Username'].value.length < 1) document.forms[1].elements['Username'].style.borderColor = '#F33E3E';
  else if(!reg.test(document.forms[1].elements['Email'].value.toLowerCase())) {
    document.forms[1].elements['Username'].style.borderColor = '#b6b6b6';
    document.forms[1].elements['Email'].style.borderColor = '#F33E3E';
  }
  else{
    document.forms[1].elements['Email'].style.borderColor = '#b6b6b6';
    document.querySelector('.sing_cont_two').style.transform = 'translate(-100%,0)';
    document.querySelector('.sing_cont_one').style.transform = 'translate(-220%,0)';
  }
}

window.addEventListener('resize', ()=>{
  if(window.innerWidth < 800){
    document.querySelector('.auth-form').style.display = 'none';
    document.querySelector('.auth-form-mobile').style.display = 'block';
  }
  else{
    document.querySelector('.auth-form').style.display = 'block';
    document.querySelector('.auth-form-mobile').style.display = 'none';
  }
});