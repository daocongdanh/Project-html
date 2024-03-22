$(document).ready(function () {

  // Slider -- https://kenwheeler.github.io/slick/
  $('.slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    prevArrow: '<button type="button" class="slick-prev bg-transparent border-0 text-secondary fs-4"><i class="fa-solid fa-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next bg-transparent border-0 text-secondary fs-4"><i class="fa-solid fa-chevron-right"></i></button>'
  });
});