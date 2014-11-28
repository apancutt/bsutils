# bsutils

JavaScript utilities for use with [Twitter Bootstrap](http://getbootstrap.com).

## Requirements

* Twitter Bootstrap 3.0+

## Installation

Ensure `bsutils-core.min.js` is included at the bottom of your page then initalize a new `BsUtils` instance:

        <!-- ... -->

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
    <script src="bsutils-module-mymodule.min.js"></script>

    <script>
        (function() {

            var bsutils = new BsUtils({
                mymodule_options = {}
            });

            var mymodule = bsutils.module("mymodule"); // Will be initialized with mymodule_options

            // ...

        }) ();
    </script>

### `version` Detect Bootstrap CSS version

Support for this functionality is currently not provided by Bootstrap so you will need to compile your own Bootstrap
LESS/SASS files for it to work.

##### LESS Installation

In `variables.less` add:

    @version: "3.3.1"; // Replace with the version that you are using

In `utilities.less` add:

    .bootstrap-version {
      &:extend(.hidden);
      &:after {
        content: $version
      }
    }

##### SCSS Installation

In `_variables.scss` add:

    $version: "3.3.1"; // Replace with the version that you are using

In `_utilities.scss` add:

    .bootstrap-version {
      @extend .hidden;
      &:after {
        content: $version
      }
    }

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
        <td><code>HTMLElement</code></td>
        <td><code>document.body</code></td>
        <td>Container for generated version sniffer element.</td>
    </tr>
    <tr>
        <td><code>tag</code></td>
        <td><code>string</code></td>
        <td><code>DIV</code></td>
        <td>HTML element tag for generated version sniffer element.</td>
    </tr>
</table>

##### Methods

<table>
    <tr>
        <td><code>get()</code></td>
        <td><code>string</code></td>
        <td>Returns the Twitter Bootstrap version.</td>
    </tr>
</table>

##### Examples

    var bsutils = new BsUtils();

    // Get the Bootstrap version (e.g. "3.3.1")
    console.log(bsutils.module("version").get());

### `viewport` Detect the active viewport

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
        <td><code>HTMLElement</code></td>
        <td><code>document.body</code></td>
        <td>Container for generated viewport sniffer elements.</td>
    </tr>
    <tr>
        <td><code>tag</code></td>
        <td><code>string</code></td>
        <td><code>DIV</code></td>
        <td>HTML element tag for generated viewport sniffer elements.</td>
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
