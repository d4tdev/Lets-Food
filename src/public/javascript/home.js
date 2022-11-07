// đóng/mở menu

const menu = document.querySelector('.navbar__list');

const menuToggle = document.querySelector('.navbar__toggle__mb');

let isMenuOpen = false;

menuToggle.addEventListener('click', () => {
   if (!isMenuOpen) {
      menu.classList.add('active');
      menuToggle.classList.add('active');
      isMenuOpen = true;
   } else {
      menu.classList.remove('active');
      menuToggle.classList.remove('active');
      isMenuOpen = false;
   }
});

// hiển thị shadow cho navbar khi scroll

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
   if (window.pageYOffset > 0) {
      header.classList.add('active');
   } else {
      header.classList.remove('active');
   }
});

// hiển thị slide
$(document).ready(function () {
   $('.about__content-comment').slick({
      dots: true,
      slidesToShow: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000,
      infinite: true,
      variableWidth: true,
      focusOnSelect: true,
      swipeToSlide: true,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               arrows: false,
               slidesToShow: 1,
               variableWidth: false,
            },
         },
         {
            breakpoint: 768,
            settings: {
               arrows: false,
               slidesToShow: 1,
               variableWidth: false,
            },
         },
         {
            breakpoint: 480,
            settings: {
               arrows: false,

               slidesToShow: 1,
            },
         },
      ],
   });
});
