/* global require, global -- Globals defined by Node */
var test = require( "ava" );
var JSDOM = require( "jsdom" ).JSDOM;

var fixture = "<a href=\"https://example.com/\" title=\"example.com\">Go to example site</a>";

test.before( function() {
	var dom = new JSDOM();
	global.window = dom.window;
	global.document = dom.window.document;

	// add jQuery and plugin
	global.$ = require( "jquery" );
	require( "./jquery.externalize.js" );
} );

test( "Sets defaults as expected", function( t ) {
	global.document.body.innerHTML = fixture;

	// check default state
	var link = global.document.querySelector( "a" );
	t.is( link.target, "" );
	t.is( link.rel, "" );
	t.is( link.title, "example.com" );

	// check state after plugin use
	$( "a[href*='//']" ).externalize();
	t.is( link.target, "_blank" );
	t.is( link.rel, "external" );
	t.is( link.title, "example.com (Opens in a new window)" );
} );

test( "Sets custom target window name when using the `name` property", function( t ) {
	global.document.body.innerHTML = fixture;

	// check default state
	var link = global.document.querySelector( "a" );
	t.is( link.target, "", "Target window name is empty." );

	// check state after plugin use
	$( "a[href*='//']" ).externalize( {
		name: "_parent"
	} );
	t.is( link.target, "_parent", "Target window name is '_parent'." );
} );

test( "Sets event behavior when using the `target` property", function( t ) {
	global.document.body.innerHTML = fixture;

	// check default state
	var link = global.document.querySelector( "a" );
	t.is( link.target, "" );

	// check state after plugin use
	$( "a[href*='//']" ).externalize( {
		target: false
	} );
	t.is( link.target, "" );
} );

test( "Sets a custom link relation when using the `relation` property", function( t ) {
	global.document.body.innerHTML = fixture;

	// check default state
	var link = global.document.querySelector( "a" );
	t.is( link.rel, "", "Link relationship is empty." );

	// check state after plugin use
	$( "a[href*='//']" ).externalize( {
		relation: "nofollow"
	} );
	t.is( link.rel, "nofollow", "Link relationship is 'nofollow'." );
} );

test( "Sets a custom title when using the `title` property", function( t ) {
	global.document.body.innerHTML = fixture;

	// check default state
	var link = global.document.querySelector( "a" );
	t.is( link.title, "example.com", "Title is 'example.com'." );

	// check state after plugin use
	$( "a[href*='//']" ).externalize( {
		title: "öffnet in neuem Fenster"
	} );
	t.is( link.title, "example.com (öffnet in neuem Fenster)",
		"Title is 'example.com (öffnet in neuem Fenster)'." );
} );

test( "Sets the default title on elements without title attribute", function( t ) {
	global.document.body.innerHTML = "<a href=\"https://example.com/\">Go to example site</a>";

	// check default state
	var link = global.document.querySelector( "a" );
	t.is( link.title, "", "Title is empty." );

	// check state after plugin use
	$( "a[href*='//']" ).externalize();
	t.is( link.title, "Opens in a new window",
		"Title is 'Opens in a new window'." );
} );

test( "Appends the default relation on elements with a relation attribute", function( t ) {
	global.document.body.innerHTML = "<a href=\"https://example.com/\" rel=\"help\">Go to example site</a>";

	// check default state
	var link = global.document.querySelector( "a" );
	t.is( link.rel, "help", "Relation is 'help'." );

	// check state after plugin use
	$( "a[href*='//']" ).externalize();
	t.is( link.rel, "help external",
		"Relation is 'help external'." );
} );

test( "Handles only links and areas", function( t ) {
	var markup = "";
	markup += "<button class=\"test\">A button</button>";
	markup += "<a href=\"https://example.com/\" class=\"test\">A link</a>";
	markup += "<map name=\"foo\"><area class=\"test\" shape=\"rect\" coords=\"34,44,270,350\" alt=\"Foobar\" href=\"https://example.com/\"></map>";
	global.document.body.innerHTML = markup;

	// check default states
	var button = global.document.querySelector( "button" );
	t.is( button.rel, undefined, "Button relation does not exist." );
	var link = global.document.querySelector( "a" );
	t.is( link.rel, "", "Link relation is empty." );
	var area = global.document.querySelector( "area" );
	t.is( area.rel, "", "Area relation is empty." );

	// check state after plugin use
	$( ".test" ).externalize();
	t.is( button.rel, undefined, "Button relation still does not exist." );
	t.is( link.rel, "external", "Link relation is 'external'." );
	t.is( area.rel, "external", "Area relation is 'external'." );
} );
