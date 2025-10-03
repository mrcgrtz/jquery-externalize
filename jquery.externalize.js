/**
 * Externalize
 *
 * Opens external links in a new window. Add a short description to the link’s title attribute.
 *
 * @see https://github.com/mrcgrtz/jquery-externalize
 * @author Marc Görtz (https://marcgoertz.de/)
 * @copyright 2011-2025
 * @license MIT License
 * @example $('a[href*="//"], a[rel="external"]').externalize();
 * @param options Configuration object (see defaults in plugin function)
 * @return links
 */
$.fn.externalize = function( options ) {

	// default configuration
	var defaults = {
		name: "_blank", // (string) name of the external window
		target: true, // (bool) use the "target" HTML attribute to support Firefox tab handling and Safari status bar info
		classes: "", // (string) apply CSS classes to an external link
		relation: "external", // (string) apply a relationship to an external link
		title: "Opens in a new window" // (string) text added as or appended to the "title" attribute to inform the user about an upcoming new window
	};

	// get the links and apply the desired handling
	return this.each( function() {

		// save item and some useful information about it
		var $this = $( this ),
		nodeName = this.nodeName,
		isLink = nodeName === "A" || nodeName === "AREA",
		hasHref = $this.attr( "href" ),

		// if any options were supplied, apply them to the configuration object
		config = $.extend( {}, defaults, options );

		// is this really a link with an "href" attribute?
		if ( isLink && hasHref ) {

			// add attributes and classes
			$this.attr( {
				rel: $this.attr( "rel" ) ?
					$this.attr( "rel" ) + " " + config.relation :
					config.relation,
				title: $this.attr( "title" ) ?
					$this.attr( "title" ) + " (" + config.title + ")" :
					config.title
			} ).addClass( config.classes );

			// add window creation
			if ( config.target ) {
				$this.attr( "target", config.name );
			} else {
				$this.on( "click.externalize", function( evt ) {
					window.open( $this.attr( "href" ), config.name ).focus();
					evt.preventDefault();
				} );
			}

		}

	} );

};
