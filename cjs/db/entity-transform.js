"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityTransform = exports.ENTITY_TRANSFORM = void 0;
var tslib_1 = require("tslib");
var di_1 = require("@hwy-fm/di");
exports.ENTITY_TRANSFORM = di_1.InjectorToken.get('ENTITY_TRANSFORM');
var EntityTransform = /** @class */ (function () {
    function EntityTransform() {
    }
    EntityTransform.prototype.transform = function (options) {
        return this.convert(options);
    };
    EntityTransform.prototype.convert = function (options) {
        var name = options.name, convert = options.convert;
        if (convert) {
            var convertType_1 = this.injector.get(convert);
            Object.assign(options, {
                set: function (value) {
                    this.setDataValue(name, convertType_1.convertToDatabaseColumn(value));
                },
                get: function () {
                    return convertType_1.convertToEntityAttribute(this.getDataValue(name));
                }
            });
        }
        return options;
    };
    tslib_1.__decorate([
        (0, di_1.Inject)(di_1.Injector),
        tslib_1.__metadata("design:type", di_1.Injector)
    ], EntityTransform.prototype, "injector", void 0);
    EntityTransform = tslib_1.__decorate([
        (0, di_1.Injectable)()
    ], EntityTransform);
    return EntityTransform;
}());
exports.EntityTransform = EntityTransform;
