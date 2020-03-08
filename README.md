# Externalize [![Build Status](https://travis-ci.org/Dreamseer/jquery-externalize.svg?branch=master)](https://travis-ci.org/Dreamseer/jquery-externalize) 

Externalize is a jQuery plugin which unobtrusively adds external window creation to a bunch of links. It’s ridiculously small (< 1kB g’zipped).

## Why?

In the past I used XHTML 1.0 Strict which prohibited the `target` attribute. Whenever I had a client who wanted to open some links in a new window, I told them this, and I really did not want to switch to ugly Transitional doctypes. But most of the time they insisted on new windows, so I created a solution written in JavaScript which eventually became the one in this repository.

Now everybody uses HTML5 which is fine. You may go and use `target` again.

I for myself use this as a _playground_ for writing and maintaining jQuery plugins. :-)

## Install

Using [npm](https://www.npmjs.com/get-npm):

```
$ npm install jquery-externalize
```

Using [yarn](https://yarnpkg.com/):

```
$ yarn add jquery-externalize
```

Using [Bower](https://bower.io/) (deprecated):

```
$ bower install jquery-externalize
```

## Usage

Externalize is chainable and highly customizable (well, as customizable as it can get by now) by using these options:

 * `name`, sets the external window’s name (string, default: `"external"`)
 * `target`, determines wether to use the `target` HTML attribute to support Firefox’s tab handling and Safari’s status bar info or not (boolean, default: `true`)
 * `classes`, applies CSS classes to an external link (string, default: `""`)
 * `relation`, applies a relationship to an external link (string, default: `"external"`)
 * `title`, sets the text added as or appended to the `title` attribute to inform the user about an upcoming new window (string, default: `"Opens in a new window"`)

## Examples

The most common use case would be:

``` html
<p><a href="https://example.com/" title="example.com">Go to example site</a>

<script src="http://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
<script src="jquery.externalize.js"></script>
<script>
	$('a[href*="//"]').externalize();
</script>
```

As a result we get a link that makes use of HTML5’s `external` relationship attribute and which features a descriptive `title` attribute in English and a plain old `target` attribute to open up a new window:

``` html
<p><a href="https://example.com/" rel="external" title="example.com (Opens in a new window)" target="external">Go to example site</a></p>
```

Another use case: Opening PDF files in a new window.

``` html
<p><a href="/download/sample.pdf">Download PDF</a>

<script src="http://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
<script src="jquery.externalize.js"></script>
<script>
	$('a[href$=".pdf"]').externalize({
		target: false
	});
</script>
```

This becomes a link with an `onClick` event to open a new window:

``` html
<p><a href="/download/sample.pdf" rel="external" title="Opens in a new window">Download PDF</a></p>
```

## License

MIT © [Marc Görtz](https://marcgoertz.de/)
