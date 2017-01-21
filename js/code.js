"use strict";

jQuery(document).ready(function($) {

    //Tabs About
    function Tabs() {
        [].slice.call(document.querySelectorAll('.ef-tabs')).forEach(function(el) {
            new CBPFWTabs(el);
        });
    };
    Tabs();

    //Menu Navigation
    function Navigation() {

        var bodyEl = document.body,
        content = document.querySelector( '#close-button' ),
        openbtn = document.getElementById( 'open-button' ),
        closebtn = document.getElementById( 'close-button' ),
        isOpen = false;

        function init() {
            initEvents();
        }

        function initEvents() {
            openbtn.addEventListener( 'click', toggleMenu );
            if( closebtn ) {
                closebtn.addEventListener( 'click', toggleMenu );
            }


            content.addEventListener( 'click', function(ev) {
                var target = ev.target;
                if( isOpen && target !== openbtn ) {
                    toggleMenu();
                }
            } );
        }

        function toggleMenu() {
            if( isOpen ) {
                classie.remove( bodyEl, 'show-menu' );
            }
            else {
                classie.add( bodyEl, 'show-menu' );
            }
            isOpen = !isOpen;
        }

        init();

    };

    Navigation();

//anim
    var numberanimation = jQuery('.number-count');
    if ((numberanimation.length > 0)) {
        numberanimation.counterUp({
            delay: 20,
            time: 1000
        });
    }

    //Revenir en haut
    jQuery("a[href='#top']").click(function() {
        jQuery("html, body").animate({
            scrollTop: 0
        }, "slow");
        return false;
    });

    //Navigation sous menu
    jQuery('.trigger-sub-nav').on('click', function() {
        if (!jQuery(this).find('.subnav').is(':visible')) {
            jQuery('.subnav').slideUp(400);
            jQuery(this).find('.subnav').slideDown(400);
        } else {
            jQuery('.subnav').slideUp(400);
        }
    })

    // A propos
    jQuery('.tab').hide();
    jQuery('.tab:first').show();

    jQuery('.filter-tabs ul li a').click(function() {
        var t = jQuery(this).attr('id');
        jQuery('.tab').hide();
        jQuery('#' + t + 'C').stop(true, true).fadeIn('slow');
        jQuery('.filter-tabs ul li a').removeClass('active');
        jQuery(this).addClass('active');
    });


    var singleportfolio = jQuery('.single-portfolio-slider');
    if (singleportfolio.length > 0) {
        singleportfolio.owlCarousel({
            items: 1,
            itemsDesktop: [1199, 1],
            itemsDesktopSmall: [980, 1],
            itemsTablet: [768, 1],
            itemsMobile: [479, 1],
            pagination: false
        });
        prev.click(function() {
            singleportfolio.trigger('owl.prev');
        });
        next.click(function() {
            singleportfolio.trigger('owl.next');
        });
    }

});


jQuery(window).load(function($) {
    // chargement
    jQuery('.preloader').fadeOut();
    jQuery('.load').delay(1000).fadeOut('slow');
    jQuery('body').delay(1000).css({
        'overflow': 'visible'
    });


    var blog = jQuery('#blog-grid');

    if (blog.length > 0) {
        blog.isotope({
            layoutMode: 'masonry',
            itemselector: '.blog'
        });
    };


    var container = jQuery("#work-grid");

    if (container.length > 0) {
        container.isotope({
            layoutMode: 'masonry',
            transitionDuration: '0.7s',
            columnWidth: 60
        });
    }

        //  charger + (si plus de projets)
        jQuery('#load-more').click(function() {
            var self = jQuery(this);
            jQuery('.load-portfolio').css('display', 'block');
            self.hide();
            var url = 'ajax/masonryportfolio.html';
            var itemLoad = 4;
            jQuery.ajax({
                url: url,
                data: {
                    itemCount: itemLoad
                }
            }).done(function(data) {
                container.isotope('insert', jQuery(data));
                jQuery('.load-portfolio').css('display', 'none');
                self.show();
            }).fail(function() {
                self.text('Error while loading!');
            });
        });

        //3 ou 4 colonnes

        jQuery('#load-more-3column').click(function() {
            var self = jQuery(this);
            jQuery('.load-portfolio').css('display', 'block');
            self.hide();
            var url = 'ajax/portfolio-3column.html';
            var itemLoad = 3;
            jQuery.ajax({
                url: url,
                data: {
                    itemCount: itemLoad
                }
            }).done(function(data) {
                container.isotope('insert', jQuery(data));
                jQuery('.load-portfolio').css('display', 'none');
                self.show();
            }).fail(function() {
                self.text('Error while loading!');
            });
        });

        jQuery('#load-more-4column').click(function() {
            var self = jQuery(this);
            jQuery('.load-portfolio').css('display', 'block');
            self.hide();
            var url = 'ajax/portfolio-4column.html';
            var itemLoad = 4;
            jQuery.ajax({
                url: url,
                data: {
                    itemCount: itemLoad
                }
            }).done(function(data) {
                container.isotope('insert', jQuery(data));
                jQuery('.load-portfolio').css('display', 'none');
                self.show();
            }).fail(function() {
                self.text('Error while loading!');
            });
        });


    //Filtres portfolio (tout, interaction etc)
    jQuery('a.filter').click(function() {
        var to_filter = jQuery(this).attr('data-filter');
        if (to_filter == 'all') {
            container.isotope({
                filter: '.mix'
            });
        } else {
            container.isotope({
                filter: '.' + to_filter
            });
        }
    });

    //changement de filtre
    jQuery('.filter').click(function() {
        jQuery('a.filter').removeClass('active');
        jQuery(this).addClass('active');
    });

});
