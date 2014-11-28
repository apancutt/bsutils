(function() {

    if (!window.BsUtils) {
        throw new Error("BsUtils (core) is required");
    }

    var Version = function(bsutils, options) {

        this._options = options || {};

        if (!this._options.container) {
            this._options.container = document.body;
        }

        if (!this._options.tag) {
            this._options.tag = "DIV";
        }

        this._cache = {};

    };

    Version.prototype.toString = function() {
        return this.get();
    };

    Version.prototype.option = function(name, value) {

        if ("undefined" === typeof value) {
            return this._options[name];
        }

        this._options[name] = value;

        return this;
    };

    Version.prototype._createElement = function() {

        var element = document.createElement(this.option("tag"));
        element.setAttribute("class", "bootstrap-version");
        this.option("container").appendChild(element);

        return element;
    };

    Version.prototype._destroyElement = function(element) {

        this.option("container").removeChild(element);

        return this;
    };

    Version.prototype.get = function(asObject) {

        if (!this._cache.version) {

            var element = this._createElement();

            var version = window.getComputedStyle(element, ":after").getPropertyValue("content");
            if (version) {
                version = version.replace(/^['"](.+)['"]$/, "$1");
            }

            this._destroyElement(element);

            this._cache.version = version;

        }

        return this._cache.version;
    };

    window.BsUtils_Version = Version;

    window.BsUtils.prototype.register("version", Version);

})();
