////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// jQuery
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var $ = jQuery.noConflict();
var transitionDelay = .07;
var itemsInRow = 0;
var itemsInRowArray = [];
var activeCol;
var parentElement;
var documentHeight;
var lastScrollTop = 0;
var topOffset;
var lastTopOffset;
var headerMargin;
var promotionAreaPadding;
var value;

$(document).ready(function($) {
    "use strict";

    var $grid = $('.grid');
    var $masonry = $('.masonry');
    var $content = $('.content');
    var $contentLoader = $('.content-loader');

    $('.search-overlay').height( $(window).height() );

    rating();

    if ($(window).width() < 768) {
        $('.search.collapse').removeClass('in');
    }

    $('.toggle-nav').on('click', function(){
        $('nav.main ul').toggleClass('show-nav');
    });




//  Bootstrap Select ---------------------------------------------------------------------------------------------------

    bootstrapSelect();

//  Get Header and Promotion Area margin -------------------------------------------------------------------------------

    if( $('#header').length ){
        var headerElement = window.getComputedStyle( document.querySelector('#header'), null);
        headerMargin = parseInt((headerElement.marginBottom).replace(/[A-Za-z$-]/g, ""));
    }
    else {
        headerMargin = 0;
    }

    if( $('.promotion-area').length ){
        var promotionAreaElement = window.getComputedStyle( document.querySelector('.promotion-area'), null);
        promotionAreaPadding = parseInt((promotionAreaElement.paddingBottom).replace(/[A-Za-z$-]/g, ""));
    }
    else {
        promotionAreaPadding = 0;
    }

//  Masonry grid listing -----------------------------------------------------------------------------------------------

    if( $masonry.length ){
        var masonry;
        var container = $masonry;
        container.imagesLoaded( function() {
            container = document.querySelector('.masonry');
            masonry = new Masonry( container, {
                gutter: 30,
                itemSelector: '.item'
            });
            calculateItemsInRow();
            if( $('.masonry.full-width').length ){
                var windowWidth = $(window).width() / 2;
                var masonryWidth =  masonry.cols * masonry.columnWidth / 2;
                $('.masonry.full-width').css( 'margin-left', windowWidth - masonryWidth + masonry.gutter/2 );
            }
        });

    }

//  Checkbox -----------------------------------------------------------------------------------------------------------

    $('.switch').each(function(){
        var _this = $(this);
        $(this).append('<div class="track"><small></small></div>');

        if( $(this).find('input').prop('checked') ){
            $(this).addClass('checked');
        }
        else {
            $(this).removeClass('checked');
        }

        $(this).click(function(){
            if( $(this).find('input').prop('checked') ){
                _this.removeClass('checked');
                _this.find('input').prop('checked', false);
            }
            else {
                _this.addClass('checked');
                _this.find('input').prop('checked', true);
                showAdminTools(masonry);
            }
        });
    });

    $('.background').each(function(){
        var imagePath = $(this).children().attr('src');
        $(this).css( 'background', 'url("'+ imagePath +'") 50% 50%' );
        $(this).children().remove();
    });

//  Click Events -------------------------------------------------------------------------------------------------------

    $('.counter .plus').click(function(){
        if( !$(this).parent().parent().find('input').val() ){
            value = 1;
            $(this).parent().parent().find('input').val(value);
        }
        else {
            value++;
            $(this).parent().parent().find('input').val(value);
        }
    });

    $('.counter .minus').click(function(){
        if( $(this).parent().parent().find('input').val() == 1 || $(this).parent().parent().find('input').val() == '' ){
            value = '';
            $(this).parent().parent().find('input').val(value);
        }
        else {
            value--;
            $(this).parent().parent().find('input').val(value);
        }
    });

    $('.close').click(function(){
        if( $(this).attr('data-close-parent') ){
            var element = $(this).attr('data-close-parent');
            $('a[href="' +element+ '"]').trigger('click');
            removeAnimation(element);
            //console.log("if");
        }
        else {
            //console.log("else");
            removeAnimation($content);
            $('.submit-button').removeClass('submit-page-open');
            $grid.removeClass('idle offset-' + activeCol );
            $content.removeClass('idle');
            $('#page-wrapper').css('height','');

            if( !$('.grid').hasClass('idle') ) {
                setTimeout(function(){
                    $contentLoader.removeClass( 'idle' );
                    $contentLoader.removeClass( activeCol );
                    $('.content #loader').remove();
                    activeCol = '';
                }, 800);
            }

            var b = 0;
            $.each( itemsInRowArray, function (i) {
                setTimeout(function(){
                    b++;
                    var referenceItemOffset = $('.item:nth-child(' + b + 'n)').css('left');
                    $('.item').each(function() {
                        if( $(this).css('left') == referenceItemOffset ){
                            $(this).removeClass('stretch');
                        }
                    });
                }, i * 100);
            });
        }
        removeOffsetLeft();
    });

    $('a, button, .btn-group, .btn, .item a').click(function(){
        clickEvents(this);
/*
        var b = itemsInRow + 1;
        if( $(this).hasClass('item') ){
            var _this = $(this).children('a');
        }
        else {
            _this = $(this);
        }

        if( $(this).attr('data-transition-parent') && !$(this).hasClass('close') ){
            if( $(this).attr('data-transition-parent') == '.content-loader' ){
                if( !$contentLoader.hasClass('idle') || !$grid.hasClass('idle') ){
                    setTimeout(function(){
                        $grid.addClass('idle');
                    }, 700);
                    $.each( itemsInRowArray, function (i) {
                        setTimeout(function(){
                            b--;
                            var referenceItemOffset = $('.item:nth-child(' + b + 'n)').css('left');
                            $('.item').each(function() {
                                if( $(this).css('left') == referenceItemOffset ){
                                    $(this).addClass('stretch');
                                }
                            });
                        }, i * 100);
                    });
//                    $('.grid.idle').udraggable({
//                        axis: "x",
//                        start: dragStarted,
//                        stop: dragStopped
//                    });
                }

                if( $(this).attr('data-expand-width') ){

                    var oldActiveCol = activeCol;
                    activeCol = $(this).attr('data-expand-width');

                    if( oldActiveCol && oldActiveCol != activeCol  ){
                        $('.content').addClass('fade_out');
                        removeAnimation($content);
                        if( $contentLoader.hasClass('idle') ){
                            setTimeout(function(){
                                $grid.removeClass('offset-' + oldActiveCol );
                                $contentLoader.removeClass( oldActiveCol );
                                $grid.addClass('offset-' + activeCol );
                                $contentLoader.addClass( activeCol );
                                loadPage(_this);
                            }, 700);
                        }
                        else {
                            $grid.removeClass('offset-' + oldActiveCol );
                            $contentLoader.removeClass( oldActiveCol );
                            $grid.addClass('offset-' + activeCol );
                            $contentLoader.addClass( activeCol );
                            loadPage(_this);
                        }
                    }
                    else if ( oldActiveCol ) {
                        $($content).addClass('fade_out');
                        setTimeout(function(){
                            loadPage(_this);
                        }, 700);
                        $('.grid').addClass('offset-' + activeCol );
                        $contentLoader.addClass( activeCol );
                    }
                    else {
                        loadPage(_this);
                        $grid.addClass('offset-' + activeCol );
                        gridOffsetLeft();
                        $contentLoader.addClass( activeCol );
                    }
//                    console.log( $grid.offset().left );
//                    setTimeout(function(){
//                        console.log( $grid.offset().left );
//                    }, 700);

                }
            }

            parentElement = $(this).attr('data-transition-parent');
            animateElement(parentElement);
        }
*/
    });

    //hoverOnGrid();

    //clickOnGrid();

//    function dragStarted(){
//        $('.page-content').toggleClass('dragging');
//    }
//    function dragStopped(){
//        $('.page-content').toggleClass('dragging');
//    }

    $('form').on('submit', function(e){
        e.preventDefault();
        var _this = $(this);
        if( $('.search-overlay').length ){
            $('.search-overlay').removeClass('idle');
            removeAnimation('.search-overlay');
            setTimeout(function(){
                $('.search-overlay').remove();
                //window.location.replace( _this.attr('action') );
                window.location.href = _this.attr('action') ;
            }, 1000);
        }

    });

//  Disable page reloading if href is #

    $('a[href="#"], a[data-external]').click(function (e) {
        e.preventDefault();
    });

//  Average color of image

    averageColor( $('.item .inner') );

    $('.item').live('inview', function(event, isInView, visiblePartX, visiblePartY) {
        if (isInView) {
            if (visiblePartY == 'top') {
                // top of element
                $(this).addClass('idle');
            } else if (visiblePartY == 'bottom') {
                // bottom of element
            } else {
                // whole element
                $(this).addClass('idle');
            }
        } else {
            // element has gone out of viewport
        }
    });

    $(window).scroll(function(){
//        $('.item').each(function() {
//            $(this).css('background-color', 'red');
//        });
    });

    /*
    function checkScrollSpeed(){
        var newPos = window.scrollY;
        if ( lastPos != null ){ // && newPos < maxScroll
            var delta = newPos -  lastPos;
            $('.item').css('margin-top',-delta*2);
            console.log(delta); // this is the result
        }
        lastPos = newPos;
        timer && clearTimeout(timer);
        timer = setTimeout(clear, 30);
    }

    $.fn.scrollStopped = function(callback) {
        var $this = $(this), self = this;
        $this.scroll(function(){
            if ($this.data('scrollTimeout')) {
                clearTimeout($this.data('scrollTimeout'));
            }
            $this.data('scrollTimeout', setTimeout(callback,100,self));
        });
    };

    $(window).scrollStopped(function(){
        $('.item').css('margin-top',0);
    });


    */



    $('.dropdown-menu').bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
        //console.log( 'finish' )
    });

//  Smooth Navigation Scrolling ----------------------------------------------------------------------------------------

    $('.navigation .nav a[href^="#"], a[href^="#"].roll').on('click',function (e) {
        e.preventDefault();
        var target = this.hash,
            $target = $(target);
        if ($(window).width() > 768) {
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - $('.navigation').height()
            }, 2000)
        } else {
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, 2000)
        }
    });

//  iCheck -------------------------------------------------------------------------------------------------------------

    if ($('.checkbox').length > 0) {
        $('input').iCheck();
    }

    if ($('.radio').length > 0) {
        $('input').iCheck();
    }

//  Dropzone -----------------------------------------------------------------------------------------------------------

    if( $('.dropzone').length > 0 ) {
        Dropzone.autoDiscover = false;
        $("#file-submit").dropzone({
            url: "upload",
            addRemoveLinks: true
        });

        $("#profile-picture").dropzone({
            url: "upload",
            addRemoveLinks: true
        });
    }

//  No UI Slider -------------------------------------------------------------------------------------------------------

    if( $('.ui-slider').length > 0 ){
        $('.ui-slider').each(function() {
            var step;
            if( $(this).attr('data-step') ) {
                step = parseInt( $(this).attr('data-step') );
            }
            else {
                step = 10;
            }
            var sliderElement = $(this).attr('id');
            var element = $( '#' + sliderElement);
            var valueMin = parseInt( $(this).attr('data-value-min') );
            var valueMax = parseInt( $(this).attr('data-value-max') );
            $(this).noUiSlider({
                start: [ valueMin, valueMax ],
                connect: true,
                range: {
                    'min': valueMin,
                    'max': valueMax
                },
                step: step
            });
            if( $(this).attr('data-value-type') == 'price' ) {
                if( $(this).attr('data-currency-placement') == 'before' ) {
                    $(this).Link('lower').to( $(this).children('.values').children('.value-min'), null, wNumb({ prefix: $(this).attr('data-currency'), decimals: 0, thousand: '.' }));
                    $(this).Link('upper').to( $(this).children('.values').children('.value-max'), null, wNumb({ prefix: $(this).attr('data-currency'), decimals: 0, thousand: '.' }));
                }
                else if( $(this).attr('data-currency-placement') == 'after' ){
                    $(this).Link('lower').to( $(this).children('.values').children('.value-min'), null, wNumb({ postfix: $(this).attr('data-currency'), decimals: 0, thousand: ' ' }));
                    $(this).Link('upper').to( $(this).children('.values').children('.value-max'), null, wNumb({ postfix: $(this).attr('data-currency'), decimals: 0, thousand: ' ' }));
                }
            }
            else {
                $(this).Link('lower').to( $(this).children('.values').children('.value-min'), null, wNumb({ decimals: 0 }));
                $(this).Link('upper').to( $(this).children('.values').children('.value-max'), null, wNumb({ decimals: 0 }));
            }
        });
    }

// Autocomplete address ------------------------------------------------------------------------------------------------

    var input = document.getElementById('location') ;
    var autocomplete = new google.maps.places.Autocomplete(input, {
        types: ["geocode"]
    });
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            return;
        }

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }
    });

// Bootstrap Animated Tabs ---------------------------------------------------------------------------------------------

    var activeTab;
    var transitionParent;

    $('body').find('a[data-toggle="collapse"]').click(function(){
        var where = $(this).attr('href');
        activeTab = $(this).attr('data-tab');
        $(activeTab).addClass('active');
        $(where + ' a[href="' + activeTab + '"]').tab('show');
        transitionParent = $(this).attr('data-transition-parent');
    });

    $('.has-tabs').each(function(){
        var _this = $(this);
        var thisHeight;
        var padding;

        $(this).on('shown.bs.collapse', function (e) {
            if ($(window).width() > 768) {
                thisHeight = $(this).height();
                $(this).find('.inner:first').css('height', $(this).height() );
                padding = thisHeight - $(activeTab).height();
            }
        });
        $(this).on('show.bs.collapse', function (e) {
            $(this).find('.animate').addClass('idle');
        });
        $(this).on('hide.bs.collapse', function () {
            $(this).find('.animate').removeClass('idle');
        });
        $(this).on('hidden.bs.collapse', function () {
            $(transitionParent).removeClass('idle');
            $(activeTab).removeClass('active');
            _this.find('.inner:first').css('height', '');
        });

        $(this).find('a[data-toggle="tab"]').click(function(){
            var element = $(this).attr('href');
            removeAnimation(element);
            _this.find('.inner:first').css('height', $(element).height() + padding );
        });

    });

    $('.fullscreen-map #search-collapse').on('hidden.bs.collapse shown.bs.collapse', function () {
        $('.map-wrapper #map').height( $(window).height() - $('header:first').height() - 1 - $('.page-content .search').height() );
    });

    if ($(window).width() > 768) {
        $(window).on('scroll', function(){
            if( $contentLoader.length ){
                topOffset = $contentLoader.offset().top;
                var st = $(this).scrollTop();
                if (st < lastScrollTop){
                    //up
                    if( (st + headerMargin  ) <= topOffset ){
                        $contentLoader.css('top', headerMargin  );
                        $contentLoader.css('position','fixed');
                        //$contentLoader.addClass('scrolling-up');
                        lastTopOffset = topOffset;
                        //$contentLoader.css('background-color','red');
                    }
                    if ( st <= ( $('body header:first').height() + headerMargin + $('.promotion-area').height() + $('.page-content .search').height() )  ) {
                        //$contentLoader.removeClass('scrolling-up');
                        $contentLoader.css('position','relative');
                        $contentLoader.css('top',0);
                        //$contentLoader.css('background-color','black');
                    }
                }
                else {
                    // down
                    //$contentLoader.removeClass('scrolling-up');
                    $contentLoader.css('position','');
                    $contentLoader.css('top',lastTopOffset - ( $('body header:first').height() + headerMargin + $('.promotion-area').height() + promotionAreaPadding + $('.page-content .search').height() ) );
                    //console.log( ( $('body header:first').height() + " " + headerMargin + " " + $('.promotion-area').height() + " " + promotionAreaPadding + " " + $('.page-content .search').height() ) );
                }
                lastScrollTop = st;
            }
        });
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// On Load
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(window).load(function(){
    documentHeight = $(document).height();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
// Display Admin Tools -------------------------------------------------------------------------------------------------

function showAdminTools(masonry){
    $('.item').each(function(){
    var adminToolHtml =
        '<div class="admin-tools">'+
            '<div class="top">'+
                '<figure class="confirm-delete"><i class="fa fa-check"></i></figure>'+
                '<figure class="edit"><i class="fa fa-pencil"></i></figure>'+
            '</div>'+
            '<div class="bottom">'+
                '<figure class="cancel-delete"><i class="fa fa-times"></i></figure>'+
                '<figure class="delete"><i class="fa fa-trash"></i></figure>'+
            '</div>'+
        '</div>';
        $(this).append(adminToolHtml);
    });
    $('.delete, .cancel-delete').click(function(){
        $(this).parent().parent().parent().toggleClass('delete-clicked');
    });

    $('.confirm-delete').click(function(){
        masonry.remove( $(this).parent().parent().parent() );
        masonry.layout();
    });
}

function clickOnGrid(){
    var $grid = $('.grid');
    var $pageContent = $('.page-content');
    var offset;

    $grid.click(function(){
        if( $grid.hasClass('idle') && !$pageContent.hasClass('item-clicked') ) {
            offset =  ($grid.width() +  $grid.offset().left) - $(window).width();
            $grid.removeClass('offset-'+activeCol);
            //$grid.addClass('offset-'+activeCol);
            //alert( $grid.css('transform') );
            $grid.css('transform','translateX('+ (offset) +'px)');
            $('.page-content').addClass('grid-clicked');
        }
    });

    $('.grid .item').click(function(){
        if( $pageContent.hasClass('grid-clicked') ){
            $pageContent.addClass('item-clicked');
            $grid.css('transform','');
            $pageContent.removeClass('grid-clicked');
            $grid.addClass('offset-'+activeCol);
        }
    });

    $grid.on('mouseenter', function () {
//        $('.grid-message').css('top', $(window).height() / 2 );
//        $('.grid-message').css('left', $grid.offset().left+300 );
//        $('.grid-message').css('position', 'fixed' );
    });

    $grid.on('mouseleave', function () {
        if( $grid.hasClass('idle') ) {
            $pageContent.removeClass('item-clicked');
            $pageContent.removeClass('grid-clicked');
            $grid.css('transform','');
            $grid.addClass('offset-'+activeCol);
        }
    });
}

function hoverOnGrid(){
    var waitOnHover;
    var $grid = $('.grid');
    $grid.hover(function(){
        clearInterval(waitOnHover);
        if( $(this).hasClass('idle') ) {
            //console.log("has");
            var time = 0;
            waitOnHover = setInterval(function() {
                time++;
                console.log(time);
                if( time >= 20 ){
                    clearInterval(waitOnHover);
                    $grid.removeClass('offset-'+activeCol);
                    $grid.addClass('offset-col-2');
                    $('.page-content').addClass('grid-hovered');
                }
            }, 100);
        }
        else {
            clearInterval(waitOnHover)
        }
    },function () {
        if( $('.page-content').hasClass('grid-hovered') ) {
            $('.page-content').removeClass('grid-hovered');
            $grid.removeClass('offset-col-2');
            $grid.addClass('offset-'+activeCol);
            clearInterval(waitOnHover);
        }
        clearInterval(waitOnHover);
    });
}

// Load Page -----------------------------------------------------------------------------------------------------------

function loadPage(_this){
    var $contentLoader = $('.content-loader');
    if( $(_this).attr('data-external') ){
        $('.content').removeClass('fade_out');
        var parentElement = $(_this).attr('data-transition-parent');
        if( $('#loader').length == 0 ){
            $('.content').append('<div id="loader"></div>');
        }
        $('.content #loader').load( $(_this).attr('href'), function(response, status, xhr) {
            bootstrapSelect();
            animateElement(parentElement);

            if( $(window).scrollTop() > $('body header:first').height() ){
                $('.content-loader').css('top', $(window).scrollTop() - ( $('body header:first').height() + $('.promotion-area').height() + headerMargin ) );
                lastTopOffset = $contentLoader.offset().top;
                var contentLoaderHeight = $('.content-loader').height();
                var headerHeight = $('body header:first').height();
                var offsetFromTop = $(window).scrollTop();
                var heightDifference = ( contentLoaderHeight + headerHeight + offsetFromTop ) - documentHeight;

                if( heightDifference > 0 ){
                    $('#page-wrapper').height( contentLoaderHeight + headerHeight + offsetFromTop );
                }
            }
            else {
                $('.content-loader').css('top', 0 );
            }

            if( status == 'error' ){
                console.log(status)
            }
        });
    }
}

// Bootstrap select ----------------------------------------------------------------------------------------------------

function bootstrapSelect(){
    var select = $('select');
    if (select.length > 0 ){
        select.selectpicker();
    }
    var bootstrapSelect = $('.bootstrap-select');
    var dropDownMenu = $('div.dropdown-menu');

    bootstrapSelect.on('shown.bs.dropdown', function () {
        $(this).find(dropDownMenu).removeClass('slide_out');
        $(this).find(dropDownMenu).addClass('slide_in');
    });
    bootstrapSelect.on('hide.bs.dropdown', function () {
        $(this).find(dropDownMenu).removeClass('slide_in idle');
        $(this).find(dropDownMenu).addClass('slide_out');
        //dropDownMenu.removeClass('slide_in idle');
        //dropDownMenu.addClass('slide_out');
    });
    bootstrapSelect.on('hidden.bs.dropdown', function () {
        var _this = $(this);
        $(_this).addClass('open');
        setTimeout(function() {
            $(_this).removeClass('open');
        }, 300);
    });
}

// Get average color from image and set as background color ------------------------------------------------------------

function averageColor(element){
    $(element).each(function() {
        var _this = $(this);
        var image = $(this).find('.image').children('img');
        imagesLoaded( image, function( instance ) {
            var averageColor = image.averageColorAsString();
            var saturatedColor = $.Color(averageColor).hsla(null, .04, null, null);
            $(_this).find('.average-color').css('background-color', saturatedColor);
        });
    });
}

// Animate the element -------------------------------------------------------------------------------------------------

function animateElement(parentElement){
    $(parentElement).addClass('idle');
    setTimeout(function() {
        $(parentElement).find('.animate').each(function(i){
            if( $(parentElement).hasClass('idle') ){
                $(this).addClass('idle');
                $(this).css('transition-delay',(i*transitionDelay)+'s');
                $(this).css('-webkit-transition-delay',(i*transitionDelay)+'s');
            }
        });
    }, transitionDelay);
}

// Remove animation class when element is being hidden -----------------------------------------------------------------

function removeAnimation(parentElement){
    $(parentElement).find('.animate').each(function(){
        $(this).removeClass('idle');
    });
}

// Calculate how many item are in one row ------------------------------------------------------------------------------

function calculateItemsInRow() {
    itemsInRow = 0;
    $('.grid .item').each(function(i) {
        if( $(this).css('top') == '0px' ) {
            itemsInRow++;
            itemsInRowArray.push(i);
        }
    });
}

// Rating --------------------------------------------------------------------------------------------------------------

function rating(element){
    var ratingElement =
            '<span class="stars">'+
                '<i class="fa fa-star s1" data-score="1"></i>'+
                '<i class="fa fa-star s2" data-score="2"></i>'+
                '<i class="fa fa-star s3" data-score="3"></i>'+
                '<i class="fa fa-star s4" data-score="4"></i>'+
                '<i class="fa fa-star s5" data-score="5"></i>'+
            '</span>'
        ;
    if( !element ) { element = ''; }
    $.each( $(element + ' .rating'), function(i) {
        $(this).append(ratingElement);
        if( $(this).hasClass('active') ){
            $(this).append('<input readonly hidden="" name="score_' + $(this).attr('data-name') +'" id="score_' + $(this).attr('data-name') +'">');
        }
        var rating = $(this).attr('data-rating');
        for( var e = 0; e < rating; e++ ){
            var rate = e+1;
            $(this).children('.stars').children( '.s' + rate ).addClass('active');
        }
    });

    var ratingActive = $('.rating.active i');
    ratingActive.hover(function(){
            for( var i=0; i<$(this).attr('data-score'); i++ ){
                var a = i+1;
                $(this).parent().children('.s'+a).addClass('hover');
            }
        },
        function(){
            for( var i=0; i<$(this).attr('data-score'); i++ ){
                var a = i+1;
                $(this).parent().children('.s'+a).removeClass('hover');
            }
        });
    ratingActive.on('click', function(){
        $(this).parent().parent().children('input').val( $(this).attr('data-score') );
        $(this).parent().children('.fa').removeClass('active');
        for( var i=0; i<$(this).attr('data-score'); i++ ){
            var a = i+1;
            $(this).parent().children('.s'+a).addClass('active');
        }
    });
}

// Simple Map ----------------------------------------------------------------------------------------------------------

var mapStyles = [{"featureType":"administrative.locality","elementType":"all","stylers":[{"hue":"#2c2e33"},{"saturation":7},{"lightness":19},{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":-2},{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"hue":"#e9ebed"},{"saturation":-90},{"lightness":-8},{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":10},{"lightness":69},{"visibility":"on"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":-78},{"lightness":67},{"visibility":"simplified"}]}];

function simpleMap(_latitude, _longitude, draggableMarker, scrollwheel){
    var mapCenter = new google.maps.LatLng(_latitude, _longitude);
    var mapOptions = {
        zoom: 12,
        center: mapCenter,
        disableDefaultUI: true,
        scrollwheel: scrollwheel,
        styles: mapStyles,
        panControl: false,
        zoomControl: false,
        draggable: true
    };
    var mapElement = document.getElementById('map-simple');
    var map = new google.maps.Map(mapElement, mapOptions);

    google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
        $('#map-simple').addClass('idle');
        google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
            $('#map-simple').addClass('idle');
        });
    });

    // Google map marker content -----------------------------------------------------------------------------------

    var markerContent = document.createElement('DIV');
    markerContent.innerHTML =
        '<div class="map-marker">' +
            '<div class="icon"><img src="assets/img/marker.png"></div>' +
        '</div>';

    // Create marker on the map ------------------------------------------------------------------------------------

    var marker = new RichMarker({
        position: mapCenter,
        //position: new google.maps.LatLng( _latitude, _longitude ),
        map: map,
        draggable: draggableMarker,
        content: markerContent,
        flat: true,
        icon: 'assets/img/marker.png'
    });

    marker.content.className = 'marker-loaded';
}
    */
