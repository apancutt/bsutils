(function() {

    if (!window.BsUtils) {
        throw new Error("BsUtils (core) is required");
    }

    var Viewport = function(bsutils, options) {

        this._options = options || {};

        if (!this._options.container) {
            this._options.container = document.body;
        }

        if (!this._options.tag) {
            this._options.tag = "DIV";
        }

        this._cache = {};

    };

    Viewport.prototype.EXTRA_SMALL = "xs";
    Viewport.prototype.SMALL       = "sm";
    Viewport.prototype.MEDIUM      = "md";
    Viewport.prototype.LARGE       = "lg";

    Viewport.prototype.option = function(name, value) {

        if ("undefined" === typeof value) {
            return this._options[name];
        }

        this._options[name] = value;

        return this;
    };

    Viewport.prototype.toString = function() {
        return this.get();
    };

    Viewport.prototype._elements = function() {

        if (!this._cache.elements) {

            var elements = {};
            var tag = this.option("tag");
            var container = this.option("container");
            var ids = [this.EXTRA_SMALL, this.SMALL, this.MEDIUM, this.LARGE];

            for (var i = 0; i < ids.length; i++) {

                var element = document.createElement(tag);
                element.setAttribute("data-id", ids[i]);
                element.setAttribute("class", "visible-" + ids[i]);
                container.appendChild(element);

                elements[ids[i]] = element;

            }

            this._cache.elements = elements;

        }

        return this._cache.elements;
    };

    Viewport.prototype._element = function() {

        var elements = this._elements();

        for (var id in elements) {
            if ("none" !== window.getComputedStyle(elements[id]).getPropertyValue("display")) {
                return elements[id];
            }
        }

        return null;
    };

    Viewport.prototype.all = function() {
        return Object.keys(this._elements());
    };

    Viewport.prototype.get = function() {

        var element = this._element();

        return element ? element.getAttribute("data-id") : null;
    };

    Viewport.prototype._compare = function(a, b) {

        if (a === b) {
            return 0;
        }

        var ids = this.all();
        var index = function(value) {

            var index = ids.indexOf(value);
            if (-1 === index) {
                throw new Error("Invalid ID: " + value);
            }

            return index;
        };

        return (index(a) < index(b)) ? -1 : 1;
    };

    Viewport.prototype.is = function(id) {
        return (0 === this._compare(this.get(), id));
    };

    Viewport.prototype.xs = function() {
        return this.is(this.EXTRA_SMALL);
    };

    Viewport.prototype.sm = function() {
        return this.is(this.SMALL);
    };

    Viewport.prototype.md = function() {
        return this.is(this.MEDIUM);
    };

    Viewport.prototype.lg = function() {
        return this.is(this.LARGE);
    };

    Viewport.prototype.gt = function(id) {
        return (this._compare(this.get(), id) > 0);
    };

    Viewport.prototype.gte = function(id) {
        return (this._compare(this.get(), id) >= 0);
    };

    Viewport.prototype.lt = function(id) {
        return (this._compare(this.get(), id) < 0);
    };

    Viewport.prototype.lte = function(id) {
        return (this._compare(this.get(), id) <= 0);
    };

    window.BsUtils_Viewport = Viewport;

    window.BsUtils.prototype.register("viewport", Viewport);

})();
