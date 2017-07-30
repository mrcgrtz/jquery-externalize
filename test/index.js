/* eslint-env qunit, es6 */
const { test } = QUnit;

QUnit.module( "$.externalize()", () => {

	test( "With defaults", t => {
		const link = document.querySelector( "#qunit-fixture a" );
		t.equal( link.target, "" );
		t.equal( link.rel, "" );
		t.equal( link.title, "example.com" );
		$( "a[href*='//']" ).externalize();
		t.equal( link.target, "external" );
		t.equal( link.rel, "external" );
		t.equal( link.title, "example.com (Opens in a new window)" );
	} );

	test( "With custom target window name (name property)", t => {
		const link = document.querySelector( "#qunit-fixture a" );
		t.equal( link.target, "", "Target window name is empty." );
		$( "a[href*='//']" ).externalize( {
			name: "test"
		} );
		t.equal( link.target, "test", "Target window name is 'test'." );
	} );

	test( "With event behavior (target property)", t => {
		const link = document.querySelector( "#qunit-fixture a" );
		t.equal( link.target, "" );
		$( "a[href*='//']" ).externalize( {
			target: false
		} );
		t.equal( link.target, "" );
	} );

	test( "With custom link relation (relation property)", t => {
		const link = document.querySelector( "#qunit-fixture a" );
		t.equal( link.rel, "", "Link relationship is empty." );
		$( "a[href*='//']" ).externalize( {
			relation: "nofollow"
		} );
		t.equal( link.rel, "nofollow", "Link relationship is 'nofollow'." );
	} );

	test( "With custom title (title property)", t => {
		const link = document.querySelector( "#qunit-fixture a" );
		t.equal( link.title, "example.com", "Title is 'example.com'." );
		$( "a[href*='//']" ).externalize( {
			title: "öffnet in neuem Fenster"
		} );
		t.equal( link.title, "example.com (öffnet in neuem Fenster)",
			"Title is 'example.com (öffnet in neuem Fenster)'." );
	} );

} );
