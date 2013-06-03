/**
 * Externalize
 *
 * Opens external links in a new window. Add a short description to the link’s title attribute.
 *
 * @see https://github.com/Dreamseer/jquery-externalize
 * @author Marc Görtz (http://marcgoertz.de/)
 * @copyright 2011-2013
 * @license MIT License
 * @example $('a[href*="//"], a[rel="external"]').externalize();
 * @param props Configuration object (see defaults in plugin function)
 * @return links
 */
(function( factory ) {
	// check for AMD usage
	if ( typeof define === "function" && define.amd ) {
		define( [ "jquery" ], factory );
	} else {
		// browser globals
		factory( jQuery );
	}
}(function( $ ) {

	// use strict mode (see https://developer.mozilla.org/en/JavaScript/Strict_mode)
	"use strict";

	$.fn.externalize = function( options ) {

		// default configuration
		var defaults = {
			name:     "external", // (string) name of the external window
			target:   true, // (bool) use the "target" HTML attribute to support Firefox tab handling and Safari status bar info
			classes:  "", // (string) apply CSS classes to an external link
			relation: "external", // (string) apply a relationship to an external link
			title:    "Opens in a new window" // (string) text added as or appended to the "title" attribute to inform the user about an upcoming new window
		};

		// get the links and apply the desired handling
		return this.each( function() {

			// save item and some useful information about it
			var $this = $(this),
			isLink    = (( $this.get( 0 ).nodeName === "A" ) || ( $this.get( 0 ).nodeName === "AREA" )),
			hasHref   = $this.attr( "href" ),

			// if any options were supplied, apply them to the configuration object
			config = $.extend( defaults, options );

			// is this really a link with an "href" attribute?
			if (( isLink ) && ( hasHref )) {

				// add attributes and classes
				$this.attr({
					"rel":   ( $this.attr( "rel" ) ) ? $this.attr( "rel" ) + " " + config.relation : config.relation,
					"title": ( $this.attr( "title" ) ) ? $this.attr( "title" ) + " (" + config.title + ")" : config.title
				}).addClass( config.classes );

				// add window creation
				if ( config.target ) {
					$this.attr( "target", config.name );
				} else {
					$this.on( "click", function( evt ) {
							// open a new window and set focus
							var external = window.open( $this.attr( "href" ), config.name );
							external.focus();
							// stop the link's default action
							evt.preventDefault();
					});
				}

			}

		});

	};

}));
