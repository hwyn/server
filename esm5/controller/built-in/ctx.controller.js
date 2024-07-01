import { __decorate, __metadata } from "tslib";
import { Inject, Injector } from '@hwy-fm/di';
import { Use } from '@hwy-fm/server';
import { Context } from '../context';
import { Controller } from '../decorator';
var Ctx = /** @class */ (function () {
    function Ctx() {
    }
    Ctx.prototype.createCtx = function (req, res, next) {
        Object.defineProperty(req, '__fmCtx__', { value: new Context(this.injector, req, res) });
        next();
    };
    __decorate([
        Inject(Injector),
        __metadata("design:type", Injector)
    ], Ctx.prototype, "injector", void 0);
    __decorate([
        Use(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", void 0)
    ], Ctx.prototype, "createCtx", null);
    Ctx = __decorate([
        Controller()
    ], Ctx);
    return Ctx;
}());
export { Ctx };
