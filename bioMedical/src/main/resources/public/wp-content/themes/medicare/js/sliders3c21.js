(function( $ ) {
	
	'use strict';

	window.boldthemes_slider_preview = function( slider ) {
		slider = $( slider );
	
		var active = slider.find( '.slick-center' );

		if ( active.length == 0 ) active = slider.find( '.slick-active' );
		var next = active.next( '.slidedItem' );
		var prev = active.prev( '.slidedItem' );
		
		var next_img = next.data( 'thumb' );
		var prev_img = prev.data( 'thumb' );
		var next_text = next.find( '.h2content' ).first().html();
		var prev_text = prev.find( '.h2content' ).first().html();
		if ( next_text == undefined ) next_text = next.data( 'text' ); // articleWithGhostGallery
		if ( prev_text == undefined ) prev_text = prev.data( 'text' ); // articleWithGhostGallery

		if ( slider.slick( 'slickCurrentSlide' ) == 0 ) { // articleWithGhostGallery
			$( '.boldGetInfo' ).removeClass( 'on' );
			$( '.boldInfoBar' ).removeClass( 'open' );
			$( '.boldGetInfo' ).hide();
		} else {
			$( '.boldGetInfo' ).show();
		}
		
		if ( active.data( 'text' ) != '' ) {
			slider.parent().find( '.btPortfolioSliderCaption' ).parent().find( 'strong' ).show();
			slider.parent().find( '.btPortfolioSliderCaption' ).html( active.data( 'text' ) ); // articleWithGhostGallery
		} else {
			slider.parent().find( '.btPortfolioSliderCaption' ).parent().find( 'strong' ).hide();
			slider.parent().find( '.btPortfolioSliderCaption' ).html( '' );
		}

		if ( active.data( 'description' ) != '' ) {
			slider.parent().find( '.btPortfolioSliderDescription' ).parent().find( 'strong' ).show();
			slider.parent().find( '.btPortfolioSliderDescription' ).html( active.data( 'description' ) ); // articleWithGhostGallery
		} else {
			slider.parent().find( '.btPortfolioSliderDescription' ).parent().find( 'strong' ).hide();
			slider.parent().find( '.btPortfolioSliderDescription' ).html( '' );
		}
		
		slider.find( '.nsNext .nbsTitle' ).html( next_text );
		slider.find( '.nsPrev .nbsTitle' ).html( prev_text );

		if ( next_img != '' && next_img !== undefined ) {
			slider.find( '.nsNext .nbsImgHolder' ).show().css( 'background-image', 'url(\'' + next_img + '\')' );	
		} else {
			slider.find( '.nsNext .nbsImgHolder' ).hide();
		}

		if ( prev_img != '' && prev_img !== undefined ) {
			slider.find( '.nsPrev .nbsImgHolder' ).show().css( 'background-image', 'url(\'' + prev_img + '\')' );	
		} else {
			slider.find( '.nsPrev .nbsImgHolder' ).hide();
		}

	}

	$( document ).ready(function() {

		$( '.slidedVariable' ).closest( '.boldSection' ).addClass( 'wVariable' );

		$( '.slided' ).closest( '.port' ).addClass( 'wSlider' );
		window.boldthemes_prevArrowHtml = '<h4 class="nbs nsPrev"><a><span class="nbsImage"><span class="nbsImgHolder"></span></span><span class="nbsItem"><span class="nbsTitle"></span></span></a></h4>';
		window.boldthemes_nextArrowHtml = '<h4 class="nbs nsNext"><a><span class="nbsItem"><span class="nbsTitle"></span></span><span class="nbsImage"><span class="nbsImgHolder"></span></span></a></h4>';
		
		window.boldthemes_prevArrowHtml_simple = '<h4 class="nbs nsPrev"><a><span class="nbsItem"></span></a></h4>';
		window.boldthemes_nextArrowHtml_simple = '<h4 class="nbs nsNext"><a><span class="nbsItem"></span></a></h4>';	

		$( '.slided' ).each(function() {
			
			var pArrow = window.boldthemes_prevArrowHtml;
			var nArrow = window.boldthemes_nextArrowHtml;
			
			if ( $( this ).data( 'simple_arrows' ) == 'yes' ) {
				pArrow = window.boldthemes_prevArrowHtml_simple;
				nArrow = window.boldthemes_nextArrowHtml_simple;
			} 
		
			$( this ).slick({
				dots: true,
				infinite: false,
				speed: 900,
				slidesToShow: 1,
				adaptiveHeight: true,
				useTransform: true,
				prevArrow: pArrow,
				nextArrow: nArrow,
				slide: '.slidedItem'
			});
			
			$( this ).on( 'beforeChange', function( event, slick, currentSlide, nextSlide ) {
				$( this ).find( '.slidedItem' ).eq( currentSlide ).find( '.animated' ).removeClass( 'animated' );
			});			
		
			$( this ).on( 'afterChange', function( event, slick, currentSlide, nextSlide ) {
				boldthemes_slider_preview( $( this ) );
				
				$( this ).find( '.slidedItem' ).eq( currentSlide ).find( '.animate' ).addClass( 'animated' );
			});
		
			boldthemes_slider_preview( $( this ) );
			
			$( this ).find( '.slidedItem' ).first().find( '.animate' ).addClass( 'animated' );
		});
		
		$( '.slidedVariable' ).each(function() {
			var cmode = true;
			if ( $( this ).data( 'nocenter' ) == 'yes' ) {
				cmode = false;
			}
			$( this ).slick({
				autoplay: false,
				infinite: false,
				speed: 900,
				dots: true,
				useTransform: true,
				prevArrow: window.boldthemes_prevArrowHtml,
				nextArrow: window.boldthemes_nextArrowHtml,
				slide: '.slidedItem',
				centerMode: cmode,
				variableWidth: cmode
			});
			
			$( this ).on( 'afterChange', function( event, slick, currentSlide, nextSlide ) {
				boldthemes_slider_preview( $( this ) );
			});	

			boldthemes_slider_preview( $( this ) );
			
		});

		$( '.boldPhotoSlide' ).slick({
			dots: false,
			arrows: true,
			infinite: false,
			speed: 300,
			slide: '.bpbItem',
			slidesToShow: 1,
			useTransform: true,
			prevArrow: window.boldthemes_prevArrowHtml_simple,
			nextArrow: window.boldthemes_nextArrowHtml_simple,
			adaptiveHeight: true
		});
		
		// thumb cache
		$( '.slick-slide' ).each(function() {
			var url = $( this ).data( 'thumb' );
			if ( url != '' && url !== undefined ) {
				var img = new Image();
				img.src = url;
			}
		});

		// Clients slider
		if ( $( '.bclPort' ).length ) {

			$( '.bclPort' ).each(function() {
				var col_width = $( this ).closest( '.rowItem' ).data( 'width' );
				var slides = 6;
				var slides1 = 4;
				var slides2 = 2;
				var slides3 = 1;
				if ( $( this ).parent().hasClass( 'recentTweets' ) ) {
					var slides = 4;
					var slides1 = 2;
					var slides2 = 2;
					var slides3 = 1;
				}
				if ( col_width < 12 ) {
					var slides = 3;
					var slides1 = 3;
					var slides2 = 2;
					var slides3 = 1;
				}				
				if ( $( this ).find( '.bclItem' ).length > 0 ) {
					$( this ).slick({
						dots: false,
						infinite: false,
						speed: 300,
						useTransform: true,
						slidesToShow: slides,
						prevArrow: window.boldthemes_prevArrowHtml_simple,
						nextArrow: window.boldthemes_nextArrowHtml_simple,
						responsive: [
							{
								breakpoint: 992,
								settings: {
									slidesToShow: slides1
								}
							},
							{
								breakpoint: 768,
								settings: {
									slidesToShow: slides2
								}
							},
							{
								breakpoint: 480,
								settings: {
									slidesToShow: slides3
								}
							}
						]
					});
				}
			});

		}
		
		$( window ).resize(function() {
			$( '.slided' ).each(function() {
				$( this )[0].slick.setHeight();
			});
			$( '.slidedVariable' ).each(function() {
				$( this )[0].slick.setHeight();
			});
			$( '.boldPhotoSlide' ).each(function() {
				$( this )[0].slick.setHeight();
			});
		});

		// Slick dots helper
		$( '.slick-dots' ).each(function() {
			$( this ).addClass( 'nol' + $( this ).find( 'li' ).length );
		});
		
		$( '.slick-slider' ).on( 'click', function () {
			$( this ).slick( 'slickPause' );
		});

	});



})( jQuery );