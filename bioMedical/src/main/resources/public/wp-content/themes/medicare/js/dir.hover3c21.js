'use strict';

window.onunload = function(){}; 

(function( $ ) {

$( document ).ready(function() {

	// direction detection

	var getHoverDir = function( $element, x, y ) {
		//console.log( x + ", " + y );
		var w = $element.width(),
			h = $element.height(),
			x = ( x - $element.offset().left - ( w/2 )) * ( w > h ? ( h/w ) : 1 ),
			y = ( y - $element.offset().top  - ( h/2 )) * ( h > w ? ( w/h ) : 1 ),
			direction = Math.round( ( ( ( Math.atan2(y, x) * (180 / Math.PI) ) + 180 ) / 90 ) + 3 ) % 4;
		return direction;
	}

	var bt_selected_gridItemEnter;
	var bt_selected_gridItemLeave;


	function initTilesGridHover () {

		$( '.btPageWrap' ).on( 'mouseenter', '.bpgPhoto', function( event ) {
			bt_selected_gridItemEnter = $( this );
			bt_selected_gridItemEnter.removeClass( "in-top in-left in-right in-bottom out-top out-left out-right out-bottom" ) ;
			var dir = getHoverDir( $( this ), event.pageX, event.pageY );
			bt_selected_gridItemEnter.css({transition: 'none;'});

			switch(dir) {
				case 0:
					bt_selected_gridItemEnter.addClass('in-top');
					break;
				case 1:
					bt_selected_gridItemEnter.addClass('in-right');
					break;
				case 2:
					bt_selected_gridItemEnter.addClass('in-bottom');
					break;
				case 3:
					bt_selected_gridItemEnter.addClass('in-left');
					break;
				default:
					bt_selected_gridItemEnter.addClass('in-top');
					break;
			}

		});

		$( '.btPageWrap' ).on( 'mouseleave', '.bpgPhoto', function( event ) {
			bt_selected_gridItemLeave = $( this );
			var dir = getHoverDir( $( this ), event.pageX, event.pageY );
			bt_selected_gridItemLeave.removeClass( "in-top in-left in-right in-bottom out-top out-left out-right out-bottom" ) ;
			switch(dir) {
				case 0:
					bt_selected_gridItemEnter.addClass('out-top');
					break;
				case 1:
					bt_selected_gridItemEnter.addClass('out-right');
					break;
				case 2:
					bt_selected_gridItemEnter.addClass('out-bottom');
					break;
				case 3:
					bt_selected_gridItemEnter.addClass('out-left');
					break;
				default:
					bt_selected_gridItemEnter.addClass('out-top');
					break;
			}

		});

	}

	function initTilesGridHoverOld () {
		
		$( '.btPageWrap' ).on( 'mouseenter', '.bpgPhoto', function( event ) {
			
			$( '.bpgPhoto' ).removeClass( 'selectedGridItem' );
			bt_selected_gridItemEnter = $( this );
			dir = getHoverDir( $( this ), event.pageX, event.pageY );
			bt_selected_gridItemEnter.find( '.captionPane' ).css({transition: 'none;'});

			//console.log (dir);
			
			switch(dir) {
				case 0:
					bt_selected_gridItemEnter.find( '.captionPane' ).css({
						transition: 'none', 
						transform: 'translateY(-100%) translateX(0)',
						MozTransform: 'translateY(-100%) translateX(0)',
						WebkitTransform: 'translateY(-100%) translateX(0)',
						msTransform: 'translateY(-100%) translateX(0)'
					});
					break;
				case 1:
					bt_selected_gridItemEnter.find( '.captionPane' ).css({
						transition: 'none', 
						transform: 'translateX(100%) translateY(0)',
						MozTransform: 'translateX(100%) translateY(0)',
						WebkitTransform: 'translateX(100%) translateY(0)',
						msTransform: 'translateX(100%) translateY(0)'
					});
					break;
				case 2:
					bt_selected_gridItemEnter.find( '.captionPane' ).css({
						transition: 'none', 
						transform: 'translateY(100%) translateX(0)',
						MozTransform: 'translateY(100%) translateX(0)',
						WebkitTransform: 'translateY(100%) translateX(0)',
						msTransform: 'translateY(100%) translateX(0)'
					});
					break;
				case 3:
					bt_selected_gridItemEnter.find( '.captionPane' ).css({
						transition: 'none', 
						transform: 'translateX(-100%) translateY(0)',
						MozTransform: 'translateX(-100%) translateY(0)',
						WebkitTransform: 'translateX(-100%) translateY(0)',
						msTransform: 'translateX(-100%) translateY(0)'
					});
					break;
				default:
					// bt_selected_gridItemEnter.find( ".captionPane" ).css({transform: 'translateY(-100%)'});	
					break;
			}

			bt_selected_gridItemEnter.addClass( 'selectedGridItem' );

			setTimeout(function() {
				bt_selected_gridItemEnter.find( '.captionPane' ).css({
					transition: 'all 300ms ease', 
					transform: 'translateX(0) translateY(0)',
					MozTransform: 'translateX(0) translateY(0)',
					WebkitTransform: 'translateX(0) translateY(0)',
					msTransform: 'translateX(0) translateY(0)'
				});
			}, 20 );
			
		});

		$( '.btPageWrap' ).on( 'mouseleave', '.bpgPhoto', function( event ) {
			bt_selected_gridItemLeave = $( this );
			dir = getHoverDir( $( this ), event.pageX, event.pageY );
			$( '.bpgPhoto' ).removeClass( 'selectedGridItem' );
			switch(dir) {
				case 0:
					bt_selected_gridItemLeave.find( '.captionPane' ).css({
						transform: 'translateY(-100%) translateX(0)',
						MozTransform: 'translateY(-100%) translateX(0)',
						WebkitTransform: 'translateY(-100%) translateX(0)',
						msTransform: 'translateY(-100%) translateX(0)'
					});
					break;
				case 1:
					bt_selected_gridItemLeave.find( '.captionPane' ).css({
						transform: 'translateX(100%) translateY(0)',
						MozTransform: 'translateX(100%) translateY(0)',
						WebkitTransform: 'translateX(100%) translateY(0)',
						msTransform: 'translateX(100%) translateY(0)'
					});
					break;
				case 2:
					bt_selected_gridItemLeave.find( '.captionPane' ).css({
						transform: 'translateY(100%) translateX(0)',
						MozTransform: 'translateY(100%) translateX(0)',
						WebkitTransform: 'translateY(100%) translateX(0)',
						msTransform: 'translateY(100%) translateX(0)'
					});
					break;
				case 3:
					bt_selected_gridItemLeave.find( '.captionPane' ).css({
						transform: 'translateX(-100%) translateY(0)',
						MozTransform: 'translateX(-100%) translateY(0)',
						WebkitTransform: 'translateX(-100%) translateY(0)',
						msTransform: 'translateX(-100%) translateY(0)'
					});
					break;
				default:
					bt_selected_gridItemLeave.find( '.captionPane' ).css({transform: 'translateY(-100%)'}); 
					break;
			}			
	
		});

	}



	initTilesGridHover ();



});

})( jQuery );