import { __decorate, __metadata } from "tslib";
import { Inject, Injectable, Injector, InjectorToken } from '@hwy-fm/di';
export var ENTITY_TRANSFORM = InjectorToken.get('ENTITY_TRANSFORM');
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
    __decorate([
        Inject(Injector),
        __metadata("design:type", Injector)
    ], EntityTransform.prototype, "injector", void 0);
    EntityTransform = __decorate([
        Injectable()
    ], EntityTransform);
    return EntityTransform;
}());
export { EntityTransform };
