# Externalize

Externalize is a jQuery plugin which unobtrusively adds external window creation to a bunch of links. Also, it’s ridiculously small (< 1kB).

## Options

Externalize is chainable and highly customizable (well, as customizable as it can get by now) by using these options:

 * `name`, sets the external window’s name (string, default: “external”)
 * `target`, determines wether to use the “target” HTML attribute to support Firefox’s tab handling and Safari’s status bar info or not (boolean, default: true)
 * `classes`, applies CSS classes to an external link (string, default: “”)
 * `relation`, applies a relationship to an external link (string, default: “external”)
 * `title`, sets the text added as or appended to the “title” attribute to inform the user about an upcoming new window (string, default: “Opens in a new window”)

## Examples

The most common use case would be:

	<p><a href="http://example.com/" title="example.com">Go to example site</a>
	<script src="jquery.min.js"></script>
	<script src="jquery.externalize.min.js"></script>
	<script>
		$('a[href*="//"]').externalize();
	</script>

As a result we get a link that makes use of HTML5’s “external” relationship attribute and which features a descriptive “title” attribute in English and a plain old “target” attribute to open up a new window:

	<p><a href="http://example.com/" rel="external" title="example.com (Opens in a new window)" target="external">Go to example site</a></p>

Another use case: Opening PDF files in a new window.

	<p><a href="/download/sample.pdf">Download PDF</a>
	<script src="jquery.min.js"></script>
	<script src="jquery.externalize.min.js"></script>
	<script>
		$('a[href$=".pdf"]').externalize({
			target: false
		});
	</script>

This becomes a link with an onClick event to open a new window:

	<p><a href="/download/sample.pdf" rel="external" title="Opens in a new window">Download PDF</a></p>

## License

Copyright (c) 2011–2013 Marc Görtz, http://marcgoertz.de/

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
