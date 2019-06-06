(function( $ ) {
	window.btGetNavHTML = function( count ) {
		var html = '<div class="btAnimNavHolder"><ul class="btAnimNav">';
		html += '<li class="btAnimNavPrev">';
		for ( var i = 0; i < count; i++ ) {
			html += '<li class="btAnimNavDot" data-count="' + i + '">';
		}
		html += '<li class="btAnimNavNext">';
		html += '</ul></div>';
		
		return html;
	}

	/* Animate elements */

	function btAnimateElements() {
		var $elems = $( '.btCounter:not(.animated), .btProgressBar:not(.animated)' );
		// classic animations
		$elems.each(function() {
			$elm = $( this );
			if ( 
			( $elm.isOnScreen() && ! $( 'body' ).hasClass( 'impress-enabled' ) ) ||
			( $elm.isOnScreen() && $( 'body' ).hasClass( 'impress-enabled' ) && $elm.closest( '.boldSection' ).hasClass( 'active' ) )
			) {
				$elm.addClass( 'animated' );
				if ( $elm.hasClass( 'btCounter' ) ) {
					btAnimateCounter( $elm );
				}
				if ( $elm.hasClass( 'btProgressBar' ) ) {
					btAnimateProgress( $elm );
				}
			}
		});
		$( '.slick-slider .slick-slide:not(.slick-active) .animate' ).removeClass( 'animated' );
	}
	
	function btAnimateCounter( elm ) {
		var number_length = elm.data( 'digit-length' );
		for ( var i = parseInt( number_length ); i > 0; i-- ) {
			var digit = elm.children( '.p' + i ).data( 'digit' );
			for ( var j = 0; j <= parseInt( digit ); j++ ) {
				elm.children( '.p' + i ).children( '.n' + j ).css( 'transform', 'translateY(-' + parseInt( digit ) * elm.height() + 'px)' );
			}
			
		}
		return false;
	}
	
	function btAnimateCounterReset( elm ) {
		var number_length = elm.data( 'digit-length' );
		for ( var i = parseInt( number_length ); i > 0; i-- ) {
			var digit = elm.children( '.p' + i ).data( 'digit' );
			for ( var j = 0; j <= parseInt( digit ); j++ ) {
				elm.children( '.p' + i ).children( '.n' + j ).css( 'transform', 'translateY(0px)' );
			}
			
		}
		return false;
	}	
	
	// countdown timer helpers
	
	var bt_bb_countdown = function( elem, selector, i, arr, arr_prev ) {
		if ( arr[ i ] !== arr_prev[ i ] || elem.find( selector ).children().eq( 0 ).html( ) == '' ) {
			elem.find( selector ).children().addClass( 'countdown_anim' );
			elem.find( selector ).children().eq( 0 ).html( arr[ i ] );
			elem.find( selector ).children().eq( 1 ).html( arr_prev[ i ] );
			setTimeout(function() {
				elem.find( selector ).children().eq( 1 ).html( elem.find( selector ).children().eq( 0 ).html() );
				elem.find( selector ).children().removeClass( 'countdown_anim' );
			}, 300 );
		}
	}
	
	var bt_bb_countdown_output = function( elem ) {
		
		s = elem.data( 'init-seconds' );
		
		var delta = s;
		
		var days = Math.floor( delta / 86400 );
		delta -= days * 86400;

		var hours = Math.floor( delta / 3600 ) % 24;
		delta -= hours * 3600;

		var minutes = Math.floor( delta / 60 ) % 60;
		delta -= minutes * 60;

		var seconds = delta;
		
		if ( hours < 10 ) {
			hours = '0' + hours;
		}
		
		if ( minutes < 10 ) {
			minutes = '0' + minutes;
		}

		if ( seconds < 10 ) {
			seconds = '0' + seconds;
		}
		
		seconds_arr_prev = seconds.toString().split( '' );
		minutes_arr_prev = minutes.toString().split( '' );
		hours_arr_prev = hours.toString().split( '' );		
		
		s = s - 1;
		if ( s < 0 ) {
			s = 0;
		}
		
		var delta = s;
		
		var days = Math.floor( delta / 86400 );
		delta -= days * 86400;

		var hours = Math.floor( delta / 3600 ) % 24;
		delta -= hours * 3600;

		var minutes = Math.floor( delta / 60 ) % 60;
		delta -= minutes * 60;

		var seconds = delta;
		
		if ( hours < 10 ) {
			hours = '0' + hours;
		}
		
		if ( minutes < 10 ) {
			minutes = '0' + minutes;
		}

		if ( seconds < 10 ) {
			seconds = '0' + seconds;
		}
		
		seconds_arr = seconds.toString().split( '' );
		minutes_arr = minutes.toString().split( '' );
		hours_arr = hours.toString().split( '' );
		
		for ( var i = 0; i <= 1; i++ ) {
			bt_bb_countdown( elem, '.seconds .n' + i, i, seconds_arr, seconds_arr_prev );
			bt_bb_countdown( elem, '.minutes .n' + i, i, minutes_arr, minutes_arr_prev );
			bt_bb_countdown( elem, '.hours .n' + i, i, hours_arr, hours_arr_prev );
		}
		
		var days_prev = 0;
		
		if ( days != days_prev ) {
			days_arr = days.toString().split( '' );
			
			var days_html = '';
			for ( var i = 0; i < days_arr.length; i++ ) {
				days_html += '<span>' + days_arr[ i ] + '</span>';
			}

			elem.find( '.days' ).html( days_html + '<span class="days_text"><span>' + elem.find( '.days' ).data( 'text' ) + '</span></span>' );
		}
		
		days_prev = days;

		elem.data( 'init-seconds', s );		

	}

	function btAnimateProgress( elm ) {
		elm.find( '.btProgressAnim' ).css( 'transition-delay', Math.round( Math.random() * 250 ) + 'ms' );
		elm.find( '.btProgressAnim' ).css( 'transform', 'translateX(-' + ( 100 - elm.find( '.btProgressAnim' ).data( 'percentage' ) ) + '%)' );
		return false;
	}
	
	function btAnimateProgressReset( elm ) {
		elm.find( '.btProgressAnim' ).css( 'transition-delay', Math.round( Math.random() * 250 ) + 'ms' );
		elm.find( '.btProgressAnim' ).css( 'transform', 'translateX(-100%)' );
		return false;
	}	
	
	$( window ).on( 'btload', function() {
		if ( ! $( 'body' ).hasClass( 'btPageTransitions' ) ) {
			btAnimateElements();
			$( window ).scroll(function(){
				btAnimateElements();
			});
		}
	});
	
	$( window ).on( 'bt_section_animation_end', function( e, el ) {
		$( 'span.headline u, span.headline b, span.headline i' ).addClass( 'animate' );
		var $elems = $( el ).find( '.btCounter, .btProgressBar, span.headline u, span.headline b, span.headline i' );
		// classic animations
		$elems.each(function() {
			$elm = $( this );
			$elm.addClass( 'animated' );
			if ( $elm.hasClass( 'btCounter' ) ) {
				btAnimateCounter( $elm );
			}
			if ( $elm.hasClass( 'btProgressBar' ) ) {
				btAnimateProgress( $elm );
			}
		});
	});
	
	$( window ).on( 'bt_section_animation_out', function( e, el ) {
		var $elems = $( el ).find( '.btCounter, .btProgressBar, span.headline u, span.headline b, span.headline i' );
		// classic animations
		$elems.each(function() {
			$elm = $( this );
			$elm.removeClass( 'animated' );
			if ( $elm.hasClass( 'btCounter' ) ) {
				btAnimateCounterReset( $elm );
			}
			if ( $elm.hasClass( 'btProgressBar' ) ) {
				btAnimateProgressReset( $elm );
			}
		});
	});	
	
	/* Accordions and tabs */

	$( document ).ready(function () {
		
		/* slick slider */
		$( '.slick-slider' ).slick();
		$( '.slick-slider .slick-prev, .slick-slider .slick-next' ).click(function() {
			$( this ).closest( '.slick-slider' ).slick( 'slickPause' );
		});
		
		/* bt_bb_elements.js resets animated class */
		$( '.slick-slider' ).on('beforeChange', function(event, slick, currentSlide, nextSlide){
		  $( this ).find( '.slick-slide .animated' ).removeClass( 'animated' );
		  $( this ).find( '.slick-slide[data-slick-index='+nextSlide+'] .animate' ).addClass( 'animated' );
		});
		
		/* Countdown */
		
		$( '.btCountdownHolder' ).each(function() {

			var cd = $( this );
			var s = cd.data( 'init-seconds' );

			bt_bb_countdown_output( cd );

			setInterval(function() {
				bt_bb_countdown_output( cd );
			}, 1000 );
		});	
		
		/* Accordions */

		$( '.tabsVertical .tabAccordionContent' ).hide();
		
		$( '.tabsVertical .tabAccordionTitle' ).click(function() {
			if ( $( this ).hasClass( 'on' ) ) {
				$( this ).removeClass( 'on' ).next().slideUp( 250 );
			} else {
				$( this ).closest( '.tabsVertical' ).find( '.tabAccordionTitle' ).removeClass( 'on' );
				$( this ).closest( '.tabsVertical' ).find( '.tabAccordionContent' ).delay( 250 ).slideUp( 250 );
				$( this ).addClass( 'on' ).next().slideDown( 250 );
			}
		});
		
		$( '.tabsVertical' ).each(function() {
			var open_first = $( this ).data( 'open-first' );
			if ( open_first == 'yes' ) {
				$( this ).find( '.tabAccordionTitle' ).first().click();
			}
		});

		/* Tabs */
		
		$( '.tabsHorizontal ul.tabsHeader li' ).click(function() {
			$(this).siblings().removeClass( 'on' );
			$( this ).addClass( 'on' );
			$( this ).parent().parent().find( '.tabPanes .tabPane' ).removeClass( 'on' );
			$( this ).parent().parent().find( '.tabPanes .tabPane' ).eq( $(this).index() ).addClass( 'on' );
		});

		$( '.tabsHorizontal ul.tabsHeader' ).each(function(){
			$( this ).find( 'li' ).first().click();
		});

		/* Dropdown */

		$( '.btDropdownSelect' ).fancySelect({forceiOS: true}).on( 'change.fs', function( e ) {
			var url = $( this ).parent().find( '.options .selected' ).data( 'raw-value' );
			if ( url != '' ) window.location = url;
		});

		// Wrap inline row
		$( '.btIconImageRow > div' ).wrap( '<div class="btIconImageCell"></div>' );
		$.each( $( '.btIconImageRow' ), function() {
			$( this ).addClass( 'btCells-' + $( this ).children( 'div' ).length );
		});
		
		/* Before/After Image */
		if($(".bt_bb_before_after_image-container")[0]){
			$(".bt_bb_before_after_image-container").twentytwenty({
				/*before_label: 'January 2017', // Set a custom before label
    after_label: 'March 2017', // Set a custom after label*/
  });
		}
		
		
	});


})( jQuery );