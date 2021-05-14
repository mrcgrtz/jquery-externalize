/* eslint-env node */
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
	t.is( link.target, "external" );
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
		name: "test"
	} );
	t.is( link.target, "test", "Target window name is 'test'." );
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
