(function( $ ) {
	$( document ).ready(function() {
		$( '.bt_bb_fe_count' ).click(function( e ) {
			var order = $( this ).find( '.bt_bb_fe_count_inner' ).html();
			if ( window != window.top ) { // iframe
				$( '.bt_bb_front_end_preview_close', window.parent.document ).click();
				$( 'html, body', window.parent.document ).animate({
					scrollTop: $( '.bt_bb_item_list', window.parent.document ).children().eq( order - 1 ).offset().top - $( '#wpadminbar', window.parent.document ).height()
				}, 500 );
			} else {
				if ( $( this ).find( '.bt_bb_fe_count_inner' ).data( 'edit_url' ) !== undefined ) {
					window.location.replace( $( this ).find( '.bt_bb_fe_count_inner' ).data( 'edit_url' ) + '&bt_bb_order=' + order );
				} else {
					window.location.replace( $( '#wp-admin-bar-edit .ab-item' ).attr( 'href' ) + '&bt_bb_order=' + order );
				}
			}
		});
		
		var bt_bb_fe_preview_toggle = localStorage.getItem( 'bt_bb_fe_preview_toggle' );
		if ( bt_bb_fe_preview_toggle == 'true' ) {
			$( 'body' ).addClass( 'bt_bb_fe_preview_toggle' );
		} else {
			$( 'body' ).removeClass( 'bt_bb_fe_preview_toggle' );
		}

		$( '.bt_bb_fe_preview_toggler' ).on( 'click', function ( e ) {
			e.stopPropagation();
			$( 'body' ).toggleClass( 'bt_bb_fe_preview_toggle' );
			var has_class = false;
			if ( $( 'body' ).hasClass( 'bt_bb_fe_preview_toggle' ) ) {
				has_class = true;
			}
			localStorage.setItem( 'bt_bb_fe_preview_toggle', has_class );
		});

	});
}( jQuery ));
