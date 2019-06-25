/* eslint-env qunit */

QUnit.module( "$.externalize()", function() {

	QUnit.test( "With defaults", function( assert ) {
		var link = document.querySelector( "#qunit-fixture a" );
		assert.equal( link.target, "" );
		assert.equal( link.rel, "" );
		assert.equal( link.title, "example.com" );
		$( "a[href*='//']" ).externalize();
		assert.equal( link.target, "external" );
		assert.equal( link.rel, "external" );
		assert.equal( link.title, "example.com (Opens in a new window)" );
	} );

	QUnit.test( "With custom target window name (name property)", function( assert ) {
		var link = document.querySelector( "#qunit-fixture a" );
		assert.equal( link.target, "", "Target window name is empty." );
		$( "a[href*='//']" ).externalize( {
			name: "test"
		} );
		assert.equal( link.target, "test", "Target window name is 'test'." );
	} );

	QUnit.test( "With event behavior (target property)", function( assert ) {
		var link = document.querySelector( "#qunit-fixture a" );
		assert.equal( link.target, "" );
		$( "a[href*='//']" ).externalize( {
			target: false
		} );
		assert.equal( link.target, "" );
	} );

	QUnit.test( "With custom link relation (relation property)", function( assert ) {
		var link = document.querySelector( "#qunit-fixture a" );
		assert.equal( link.rel, "", "Link relationship is empty." );
		$( "a[href*='//']" ).externalize( {
			relation: "nofollow"
		} );
		assert.equal( link.rel, "nofollow", "Link relationship is 'nofollow'." );
	} );

	QUnit.test( "With custom title (title property)", function( assert ) {
		var link = document.querySelector( "#qunit-fixture a" );
		assert.equal( link.title, "example.com", "Title is 'example.com'." );
		$( "a[href*='//']" ).externalize( {
			title: "öffnet in neuem Fenster"
		} );
		assert.equal( link.title, "example.com (öffnet in neuem Fenster)",
			"Title is 'example.com (öffnet in neuem Fenster)'." );
	} );

} );
