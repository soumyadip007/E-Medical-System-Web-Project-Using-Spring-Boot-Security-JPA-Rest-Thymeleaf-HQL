
(function( $ ) {

	$( document ).scroll(function() {
		bt_bb_animate_elements_adv_progressbar();
	});

	$( document ).ready(function () {
		bt_bb_animate_elements_adv_progressbar();
	});

	function bt_bb_animate_elements_adv_progressbar( ) {
	
		var $elems = $( '.bt_bb_progress_bar_advanced.animate-adv_progressbar:not(.animated-adv_progressbar)' );
		$elems.each(function() {
			var $elm = $( this );
			if ( $elm.isOnScreen_adv_progressbar() ) {
				$elm.addClass( 'animated-adv_progressbar' );
				bt_bb_animate_progress_advanced( $elm );
			}
		});
	}

	$.fn.isOnScreen_adv_progressbar = function(){
		var element = this.get(0);
		var bounds = element.getBoundingClientRect();
		return bounds.top + 75 < window.innerHeight && bounds.bottom > 0;
	}

	function bt_bb_animate_progress_advanced( elm ) {
	
		var container = elm.data( 'container' );
		var pbid = elm.data( 'container-pbid' );
		var container_type = elm.data( 'container-type' );
		var container_percentage = elm.data( 'container-percentage' );
		var container_text_color = elm.data( 'container-text-color' ); 
		var container_stroke_width = elm.data( 'container-stroke-width' );
		var container_trail_color = elm.data( 'container-trail-color' ); 
		var container_trail_width = elm.data( 'container-trail-width' ); 
		var container_easing = elm.data( 'container-easing' ); 
		var container_color_from = elm.data( 'container-color-from' ); 
		var container_depth_from = elm.data( 'container-depth-from' ); 
		var container_color_to = elm.data( 'container-color-to' ); 
		var container_depth_to = elm.data( 'container-depth-to' ); 
		var container_fill = elm.data( 'container-fill' ); 
		var container_text = elm.data( 'container-text' );
		var container_duration = elm.data( 'container-duration' );
		var container_icon = elm.data( 'container-icon' );	

		
		if ( container_type == 'circle')
		{
			
			bt_bb_progressbar_circle_init( 
				container,
				container_percentage, 
				container_text_color, 
				container_stroke_width, 
				container_trail_color, 
				container_trail_width, 
				container_easing, 
				container_color_from, 
				container_depth_from, 
				container_color_to, 
				container_depth_to, 
				container_fill, 
				container_text, 
				container_duration, 
				container_icon,
				pbid);

		}else{

			bt_bb_progressbar_semicircle_init( 
				container,
				container_percentage, 
				container_text_color, 
				container_stroke_width, 
				container_trail_color, 
				container_trail_width, 
				container_easing, 
				container_color_from, 
				container_depth_from, 
				container_color_to, 
				container_depth_to, 
				container_fill, 
				container_text, 
				container_duration, 
				container_icon,
				pbid);
		}

		//elm.addClass( 'animated' );
		return false;
	}


})( jQuery );

function bt_bb_progressbar_circle_init( container, container_percentage, container_text_color, container_stroke_width, 
	container_trail_color, container_trail_width, container_easing, container_color_from, container_depth_from, container_color_to, container_depth_to, container_fill, container_text, container_duration, container_icon, pbid ) {
	
	if ( pbid > 0 )
	{
		container = "#container_" + pbid;
	}
	display_icon = "";

	if (container_icon)
	{
		icon_set	 = container_icon.substring( 0, container_icon.lastIndexOf("_") );
		icon_icon	 = container_icon.substr(container_icon.lastIndexOf("_")+1);
		display_icon = "<span data-ico-" + icon_set + "=\"&#x" + icon_icon + ";\" class=\"bt_bb_icon_holder\"></span>";
	}
        
	var circle = new ProgressBar.Circle(container, {
	  color: container_text_color,
	  strokeWidth: container_stroke_width,
	  trailColor: container_trail_color,
	  trailWidth: container_trail_width,
	  easing: container_easing,
	  duration: container_duration,
	  text: {
		value: '', 
		autoStyleContainer: false,
		style: {
			color: container_text_color,
			transform: {
				prefix: true,
			}
		},
		autoStyleContainer: false
	  },
	  from: { color: container_color_from, width: container_depth_from },
	  to: { color: container_color_to, width: container_depth_to },
	  fill: container_fill,
	  step: function(state, circle) {
		circle.path.setAttribute('stroke', state.color);
		circle.path.setAttribute('stroke-width', state.width);

		var value = Math.round(circle.value() * 100);		
		if ( !container_icon ) {
			circle.setText( value + '%' );		
		}
		
	  }
	});

	if ( container_icon && display_icon ) {
		circle.setText( display_icon );
	}

	circle.animate(container_percentage);
}

function bt_bb_progressbar_semicircle_init( container,container_percentage, container_text_color, container_stroke_width, 
	container_trail_color, container_trail_width, container_easing, container_color_from, container_depth_from, container_color_to, container_depth_to, container_fill, container_text, container_duration, container_icon, pbid  ) {
	
	if ( pbid > 0 )
	{
		container = "#container_" + pbid;
	}
	
	display_icon = "";
	if ( container_icon )
	{				
		icon_set        = container_icon.substring( 0, container_icon.lastIndexOf("_") );
		icon_icon       = container_icon.substr(container_icon.lastIndexOf("_")+1);
		display_icon    = "<span data-ico-" + icon_set + "=\"&#x" + icon_icon + ";\" class=\"bt_bb_icon_holder\"></span>";
	}	
			
	var semicircle = new ProgressBar.SemiCircle(container, {
	  strokeWidth: container_stroke_width,
	  easing: container_easing,
	  duration: container_duration,
	  color: container_text_color,
	  trailColor: container_trail_color,
	  trailWidth: container_trail_width,
	  svgStyle: null,
	  text: {
		value: '', 
		autoStyleContainer: false,
		style: {
			color: container_text_color,
			transform: {
				prefix: true,
			}
		},
		alignToBottom: false
	  },
	  fill: container_fill,
	  from: { color: container_color_from, width: container_depth_from },
	  to: { color: container_color_to, width: container_depth_to },
	  step: function(state, semicircle) {
		semicircle.path.setAttribute('stroke', state.color);
		semicircle.path.setAttribute('stroke-width', state.width);

		var value = Math.round(semicircle.value() * 100);                
		if ( !container_icon ) {
			semicircle.setText( value + '%' );				
		}
	  }
	});

	if ( container_icon && display_icon ) {
		semicircle.setText( display_icon );
	}

	semicircle.animate(container_percentage);    
}
