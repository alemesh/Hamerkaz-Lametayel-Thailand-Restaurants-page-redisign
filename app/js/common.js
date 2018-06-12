$(function() {

    (function($) {
        $(function() {

            $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
                $(this)
                    .addClass('active').siblings().removeClass('active')
                    .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
            });

        });
    })(jQuery);

    //slick slider

    (function($) {
            $('.variable-width').slick({
                dots: false,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                centerMode: true,
                variableWidth: true,
                autoplay: true,
                autoplaySpeed: 3000
            });
    })(jQuery);


    // $(".toggle-mnu").click(function() {
    $(".menu-lisy").click(function() {
        // $(".tabs__caption").slideToggle();
        $(".menu-lisy").toggleClass('menu-active');
    });
    //google map init
    checkLocationOnLoad();

    // $(".toggle-mnu").click(function() {
    //     // $(".tabs__caption").slideToggle();
    //     $(".menu-lisy").toggleClass('menu-active');
    // });
});


    if ($(window).width() < 901) {
        $(".g-map-mobile").append("<div id='map'></div>");
        $(".g-map div").remove();


        $('.togle-title').html($('.tabs__caption .active').html());

        $('.tabs__caption').on('click', 'li', function () {
            var togleTitle = $(this).html();
            console.log(togleTitle);
            $('.togle-title').html(togleTitle);

        });

    } else {
        $(".g-map").append("<div id='map'></div>");
        $(".g-map-mobile div").remove();

        // $('.togle-title').html();
        $('.togle-title').hide();
    }

$( window ).resize(function() {
    if ($(window).width() < 901) {
        $(".g-map-mobile").append("<div id='map'></div>");
        $(".g-map div").remove();
        $('.togle-title').html($('.tabs__caption .active').html());
        checkLocationOnLoad()
    } else {
        $(".g-map").append("<div id='map'></div>");
        $(".g-map-mobile div").remove();
        // $('.togle-title').html('');
        $('.togle-title').hide();
        checkLocationOnLoad()
    }

});


// google maps settings

function checkLocationOnLoad() {
    position = {lat: 13.762134, lng: 100.494070};
    initMap();
}


var pos;

$('.tabs__caption').on('click', 'li', function () {
    var tlan = $(this).data('lat');
    var tlng = $(this).data('lng');
    pos = {lat: Number(tlan), lng: Number(tlng)};
    //return pos;
    position = pos;
    initMap();
});


var map;
var iconmap;


var position;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: position,
        zoom: 15
    });

    var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: ''
    });

    // var icon = {
    //
    //     path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
    //     fillColor: '#FF0000',
    //     fillOpacity: .6,
    //     anchor: new google.maps.Point(0,0),
    //     strokeWeight: 0,
    //     scale: 1
    // };
    //
    // var marker = new google.maps.Marker({
    //     position: position,
    //     map: map,
    //     draggable: false,
    //     icon: icon
    // });
}


/* Article FructCode.com */
$( document ).ready(function() {
    $("#ajax_form").submit(
        function(){
            sendAjaxForm('result_form', 'ajax_form', 'action_ajax_form.php');
            return false;
        }
    );
});
function sendAjaxForm(result_form, ajax_form, url) {
    $.ajax({
        url:     url, //url страницы (action_ajax_form.php)
        type:     "POST", //метод отправки
        dataType: "html", //формат данных
        data: $("#"+ajax_form).serialize(),  // Сеарилизуем объект
        success: function(response) { //Данные отправлены успешно
            result = $.parseJSON(response);
            // $('.succes-nsg').html('Имя: '+result.name+'<br>Телефон: '+result.tel+'<br>Email: '+result.email);



            $(".contact-form").hide(300);
            $(".succes-nsg").show(500);
        },
        error: function(response) { // Данные не отправлены
            $('.succes-nsg').html('Error');
            $(".succes-nsg").show(500);
        }
    });
}