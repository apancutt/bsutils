(function() {

    if (!window.BsUtils) {
        throw new Error("BsUtils (core) is required");
    }

    var $ = window.jQuery;

    var Viewport = function(bsutils, options) {

        var defaults = {
            container: $(document.body),
            template: "<div/>"
        };

        this._options = $.extend({}, defaults, options);
        this._elements = null;

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

    Viewport.prototype._all = function() {

        if (!this._elements) {

            var elements = $();
            var template = this.option("template");
            var container = this.option("container");

            $.each([this.EXTRA_SMALL, this.SMALL, this.MEDIUM, this.LARGE], function() {

                var id = this.toString();

                elements = elements.add(
                    $(template)
                        .data("_id", id)
                        .addClass("visible-" + id)
                        .appendTo(container)
                );

            });

            this._elements = elements;

        }

        return this._elements;
    };

    Viewport.prototype.all = function() {

        var ids = [];
        this._all().each(function() {
            ids.push($(this).data("_id"));
        });

        return ids;
    };

    Viewport.prototype._get = function() {
        return this._all().filter(":visible");
    };

    Viewport.prototype.get = function() {
        return this._get().data("_id");
    };

    Viewport.prototype._compare = function(a, b) {

        if (a === b) {
            return 0;
        }

        var viewports = this.all();
        var index = function(value) {

            var index = $.inArray(value, viewports);
            if (-1 === index) {
                $.error("Invalid ID: " + value);
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