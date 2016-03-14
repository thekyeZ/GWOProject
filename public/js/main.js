/**
 * Created by Przemek on 10.12.2015.
 */
(function(){

//    slider code

    var wH = $(window).height();
    var wW = $(window).width();

    var sliderH = $('.slider').height(); //400 by default
    var imageContainer = $('.slider-images li');

   // $('.slider-images li img').css('width', imageContainer.width());
   //
   //$(window).resize(function(){
   //    $('.slider-images li img').css('width', imageContainer.width());
   //});

    //$(".slider-images li").each(function(i){
    //
    //
    //});
    //


//    ./slider code



        var burger = document.querySelector('.burger');
        var menu = document.querySelector('.main-header');
        burger.addEventListener("click", function(){
            menu.classList.toggle('active');

        });

        //var dd = document.querySelector('.menu-option');
        //var menu = document.querySelector('.main-header');
        //dd.addEventListener("click", function(){
        //    menu.classList.add('dropdown');
        //
        //});
        //




        //console.log(burger);





})();