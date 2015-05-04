/*
Bones Scripts File
Author: Eddie Machado

This file should contain any js scripts you want to add to the site.
Instead of calling it in the header or throwing it inside wp_head()
this file will be called automatically in the footer so as not to
slow the page load.

*/

// IE8 ployfill for GetComputed Style (for Responsive Script below)
if (!window.getComputedStyle) {
    window.getComputedStyle = function(el, pseudo) {
        this.el = el;
        this.getPropertyValue = function(prop) {
            var re = /(\-([a-z]){1})/g;
            if (prop == 'float') prop = 'styleFloat';
            if (re.test(prop)) {
                prop = prop.replace(re, function () {
                    return arguments[2].toUpperCase();
                });
            }
            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
        }
        return this;
    }
}

// as the page loads, call these scripts
jQuery(document).ready(function($) {

    $('.entry-content, .sidebar').fitVids();
    $('.entry-content').fitVids({ customSelector: "iframe[src*='maps.google']" });

    $('.fa-bars').click(function(){
        $('.nav-wrapper').slideToggle();
    });

    $('.more-toggle').click(function(){
       
       var target = '#' + $(this).data('toggletarget');
        
       $(target).slideToggle( 'slow', function(){ 
            if(!$(this).hasClass('open')) {
                $(this).parent().find('.more-toggle').text('Weniger...');
                $(this).addClass('open');
            } else {
                $(this).parent().find('.more-toggle').text('Mehr...');
                $(this).removeClass('open');
            }
        });

    });

    $('.accordion').collapse(
        {
          show: function() {
            this.slideDown(300);
          },
          hide: function() {
            this.slideUp(300);
          },
          accordion: true,
          persist: false
        }
    ); 

    // FAQ Mixitup
    $('.mixitup-container').mixItUp();

    // Team Isotope
    var  $container = $('.isotope-container').isotope({
      masonry: {
        columnWidth: '.grid-sizer',
        gutter: '.gutter-sizer'
      },
      itemSelector: '.teaser-item',
      percentPosition: true
    });

    // filter items on button click
    $('#filters .filter').on( 'click', function() {
      var filterValue = $(this).attr('data-filter');
      $container.isotope({ filter: filterValue });
      $('#filters .filter').removeClass('active');
      $(this).addClass('active');
    });

    $container.isotope('stamp',  $('#filters'));



    /*
    Responsive jQuery is a tricky thing.
    There's a bunch of different ways to handle
    it, so be sure to research and find the one
    that works for you best.
    */
    

    /* getting viewport width */
    var responsive_viewport = $(window).width();
    
    /* if is below 481px */
    if (responsive_viewport < 481) {

    } /* end smallest screen */
    
    /* if is larger than 481px */
    if (responsive_viewport > 481) {

    } /* end larger than 481px */
    
    /* if is above or equal to 768px */
    if (responsive_viewport >= 768) {

        /* load gravatars */
        $('.comment img[data-gravatar]').each(function(){
            $(this).attr('src',$(this).attr('data-gravatar'));
        });


        /**
 * Author: gnomjogson
 * Date: 16.04.13
 * Created: 20:57
 **/

 var $content = $('#content');

 $(window).scroll(function(){

    var scrollTop = $(window).scrollTop();
    var speed = $content.data('speed')*(scrollTop/8000);
    var scrollTop = $(window).scrollTop();
    if(scrollTop > 800 ) scrollTop = 800;
    var yPos = -(scrollTop * speed);
    console.log("yPos -> " + yPos);
    var coords = '50% '+ yPos + 'px';
    $content.css("background-position", coords);

})

}

/* off the bat large screen actions */
if (responsive_viewport > 1030) {

}


	// add all your scripts here
	

}); /* end of as page load scripts */


/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT License.
 */
 (function(w){
	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1 ) ){ return; }
    var doc = w.document;
    if( !doc.querySelector ){ return; }
    var meta = doc.querySelector( "meta[name=viewport]" ),
    initialContent = meta && meta.getAttribute( "content" ),
    disabledZoom = initialContent + ",maximum-scale=1",
    enabledZoom = initialContent + ",maximum-scale=10",
    enabled = true,
    x, y, z, aig;
    if( !meta ){ return; }
    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true; }
        function disableZoom(){
            meta.setAttribute( "content", disabledZoom );
            enabled = false; }
            function checkTilt( e ){
              aig = e.accelerationIncludingGravity;
              x = Math.abs( aig.x );
              y = Math.abs( aig.y );
              z = Math.abs( aig.z );
		// If portrait orientation and in one of the danger zones
        if( !w.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
           if( enabled ){ disableZoom(); } }
           else if( !enabled ){ restoreZoom(); } }
           w.addEventListener( "orientationchange", restoreZoom, false );
           w.addEventListener( "devicemotion", checkTilt, false );
       })( this );