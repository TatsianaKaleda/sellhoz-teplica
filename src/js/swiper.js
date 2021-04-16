import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

$(document).ready(function() {
    let swiper = new Swiper('.swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: false,
        slidesPerView: 'auto',
        coverflowEffect: {
        rotate: 40,
        stretch: 1,
        depth: 100,
        modifier: 1,
        slideShadows: true,
        },
        pagination: {
        el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});    