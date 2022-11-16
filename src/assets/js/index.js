$(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) $('.lentop').fadeIn();
    else $('.lentop').fadeOut();
    if ($(this).scrollTop() > 100) $('.lentop-cart').fadeIn();
    else $('.lentop-cart').fadeOut();
  });
  $('.lentop').click(function () {
    $('body,html').animate({ scrollTop: 0 }, 'slow');
  });
});