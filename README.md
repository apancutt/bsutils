# bsutils

JavaScript utilities for use with [Twitter Bootstrap](http://getbootstrap.com).

## Requirements

* jQuery 1.0+
* Twitter Bootstrap 3.0+

## Installation

Ensure `jQuery` and `bsutils` are included in your page, then initalize a new `BsUtils` instance:

    <html>
      <head>
        <script src="//code.jquery.com/jquery-2.1.1.min.js"></script>
      </head>
      <body>
        <!-- Site content -->
        <script src="bsutils-core.min.js"></script>
        <script>
            (function() {

                var bsutils = new BsUtils();
                // ...

            }) ();
        </script>
      </body>
    </html>

## Modules

Out-of-the-box, `bsutils` doesn't do much. The juice comes from modules. You'll need to manually include the module(s)
you required into your page in order to use them.

    <script src="bsutils-core.min.js"></script>
    <script src="bsutils-mymodule.min.js"></script>
    <script>
        (function() {

                var bsutils = new BsUtils({
                    mymodule_options = {}
                });

                var mymodule = bsutils.module("mymodule"); // Will be initialized with mymodule_options

                // ...

            }) ();
    </script>

### `viewport` - Detect the active viewport

##### Options

<table>
    <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>container</code></td>
        <td><code>jQuery</code>, <code>HTMLElement</code> or <code>string</code> (selector)</td>
        <td><code>$(document.body)</code></td>
        <td>Container for generated viewport sniffer elements.</td>
    </tr>
    <tr>
        <td><code>template</code></td>
        <td><code>string</code></td>
        <td><code>"&lt;div/&gt;"</code></td>
        <td>Template HTML for generated viewport sniffer elements.</td>
    </tr>
</table>

##### Methods

<table>
    <tr>
        <td><code>all()</code></td>
        <td><code>array</code></td>
        <td>Returns all known viewports.</td>
    </tr>
    <tr>
        <td><code>get()</code></td>
        <td><code>string</code></td>
        <td>Returns the current viewport.</td>
    </tr>
    <tr>
        <td><code>is(string viewport)</code></td>
        <td><code>boolean</code></td>
        <td>Returns <code>true</code> if current viewport matches <code>viewport</code>.</td>
    </tr>
    <tr>
        <td><code>lt(string viewport)</code></td>
        <td><code>boolean</code></td>
        <td>Returns <code>true</code> if current viewport is less than <code>viewport</code>.</td>
    </tr>
    <tr>
        <td><code>lte(string viewport)</code></td>
        <td><code>boolean</code></td>
        <td>Returns <code>true</code> if current viewport is less than or equal to <code>viewport</code>.</td>
    </tr>
    <tr>
        <td><code>gt(string viewport)</code></td>
        <td><code>boolean</code></td>
        <td>Returns <code>true</code> if current viewport is greater than <code>viewport</code>.</td>
    </tr>
    <tr>
        <td><code>gte(string viewport)<c/ode></td>
        <td><code>boolean</code></td>
        <td>Returns <code>true</code> if current viewport is greater than or equal to <code>viewport</code>.</td>
    </tr>
</table>

##### Examples

    var bsutils = new BsUtils();

    // Get the current viewport (e.g. "xs", "md", etc.)
    console.log(bsutils.module("viewport").get());

    // Test the current viewport
    console.log(bsutils.module("viewport").is("xs")); // TRUE only if current viewport is "xs"
    console.log(bsutils.module("viewport").lt("md")); // TRUE only if current viewport is "xs" or "sm"
    console.log(bsutils.module("viewport").lte("md")); // TRUE only if current viewport is "xs" or "sm" or "md"
    console.log(bsutils.module("viewport").gt("md")); // TRUE only if current viewport is "lg"
    console.log(bsutils.module("viewport").gte("md")); // TRUE only if current viewport is "lg" or "md"
