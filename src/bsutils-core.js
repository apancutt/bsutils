(function() {

    if (!window.jQuery) {
        throw new Error("jQuery is required");
    }

    var $ = window.jQuery;

    var BsUtils = function(options) {
        this._options = $.extend({}, options);
        this._modules = {};
    };

    var registeredModules = {};
    BsUtils.prototype.register = function(namespace, module) {

        registeredModules[namespace] = module;

        return this;
    };

    BsUtils.prototype.option = function(name, value) {

        if ("undefined" === typeof value) {
            return this._options[name];
        }

        this._options[name] = value;

        return this;
    };

    BsUtils.prototype.module = function(namespace) {

        if (!this._modules[namespace]) {

            if (!registeredModules[namespace]) {
                $.error("Unregistered module: " + namespace);
            }

            this._modules[namespace] = new registeredModules[namespace](this, this.option(namespace + "_options") );

        }

        return this._modules[namespace];
    };

    window.BsUtils = BsUtils;

})();
