/*
* ----------------------------------------------------------------------------------------
Author       : Themepoke
Template Name: Dreamer - Personal Portfolio Template.
Version      : 1.0
* ----------------------------------------------------------------------------------------
*/

(function($) {
    'use strict';

    jQuery(document).ready(function() {

	   /*start preloader*/
        $(window).on('load', function() {
            $('.preloader').fadeOut();
            $('.preloader-area').delay(350).fadeOut('slow');
        });
        /*end preloader*/
		
	    /*Start Work JS*/
        $('.portfolio-inner').mixItUp();
        /*End Work JS*/
		
	    /*Start parallax JS*/
        var parallaxeffect = $(window);
        parallaxeffect.stellar({
            responsive: true,
            positionProperty: 'position',
            horizontalScrolling: false
        });
        /*End parallax JS*/
		
        /*start menu background change*/
        $(window).on('scroll', function () {
            if ($(window).scrollTop() > 150) {
                $('.header-top-area').addClass('fixed-menu-bg');
            } else {
                $('.header-top-area').removeClass('fixed-menu-bg');
            }
        });
		/*end menu background change*/
		
	   /*COUNTER UP ACTIVATION JS*/
		$(".project-number").counterUp({
			time: 2000,
			delay: 10
		});
		/*COUNTER UP ACTIVATION JS*/
			    
	    /*start smooth scroll*/
        $('a.smooth-scroll').on("click", function (e) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top - 60
            }, 1000);
            e.preventDefault();
        });
        /*end smooth scroll*/
	
	    /*Start testimonial*/		
        $(".testimonial-list").owlCarousel({
            items: 1,
            autoPlay: true,
            navigation: false,
            itemsDesktop: [1199, 1],
            itemsDesktopSmall: [980, 1],
            itemsTablet: [768, 1],
            itemsTabletSmall: false,
            itemsMobile: [479, 1],
            autoHeight: true,
            pagination: true,
        }); 
        /*end testimonial*/	
		
		 /*start magnificent popup*/
        var magnifPopup = function () {
            $('.portfolio-popup').magnificPopup({
                type: 'image',
                removalDelay: 300,
                mainClass: 'mfp-with-zoom',
                gallery: {
                    enabled: true
                },
                zoom: {
                    enabled: true, // By default it's false, so don't forget to enable it

                    duration: 300, // duration of the effect, in milliseconds
                    easing: 'ease-in-out', // CSS transition easing function

                    // The "opener" function should return the element from which popup will be zoomed in
                    // and to which popup will be scaled down
                    // By defailt it looks for an image tag:
                    opener: function (openerElement) {
                        // openerElement is the element on which popup was initialized, in this case its <a> tag
                        // you don't need to add "opener" option if this code matches your needs, it's defailt one.
                        return openerElement.is('img') ? openerElement : openerElement.find('img');
                    }
                }
            });
        };
        // Call the functions 
        magnifPopup();

		/*end magnificent popup*/
		
	   
		/*start scroll to top*/
        $(window).scroll(function () {
            if ($(this).scrollTop() > 250) {
                $('.scroll-up').fadeIn();
            } else {
                $('.scroll-up').fadeOut();
            }
        });
        $('.scroll-up').on("click", function () {
            $("html, body").animate({
                scrollTop: 0
            }, 800);
            return false;
        });
		/*end scroll to top*/
		
		/*start menu hide*/
        $(document).on('click', '.navbar-collapse.in', function (e) {
            if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
                $(this).collapse('hide');
            }
        }); 
		/*end menu hide*/
		
		/*start scroll spy*/
	    $('body').scrollspy({
        target: '.navbar-collapse',
        offset: 195
        });
		/*end scroll spy*/
		
        /*start Type Effect js*/
        var TxtType = function (el, toRotate, period) {
            this.toRotate = toRotate;
            this.el = el;
            this.loopNum = 0;
            this.period = parseInt(period, 10) || 1000;
            this.txt = '';
            this.tick();
            this.isDeleting = false;
        };

        TxtType.prototype.tick = function () {
            var i = this.loopNum % this.toRotate.length;
            var fullTxt = this.toRotate[i];

            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

            var that = this;
            var delta = 150 - Math.random() * 100;

            if (this.isDeleting) {
                delta /= 2;
            }

            if (!this.isDeleting && this.txt === fullTxt) {
                delta = this.period;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.loopNum++;
                delta = 500;
            }

            setTimeout(function () {
                that.tick();
            }, delta);
        };

        window.onload = function () {
            var elements = document.getElementsByClassName('typewrite');
            for (var i = 0; i < elements.length; i++) {
                var toRotate = elements[i].getAttribute('data-type');
                var period = elements[i].getAttribute('data-period');
                if (toRotate) {
                    new TxtType(elements[i], JSON.parse(toRotate), period);
                }
            }
            // INJECT CSS
            var css = document.createElement("style");
            css.type = "text/css";
            css.innerHTML = ".typewrite > .wrap { border-right: 0.02em solid #fff}";
            document.body.appendChild(css);
        };

	   /*end type effect js*/	
	   
		/*start countdown js*/
		   $('#clock').countdown('2020/10/10', function(event) {
		  var $this = $(this).html(event.strftime(''
			+ '<span>%d</span> days '
			+ '<span>%H</span> hr '
			+ '<span>%M</span> min '
			+ '<span>%S</span> sec'));
		});
	    /*end countdown js*/
		
    });

})(jQuery);