import { __awaiter, __decorate, __metadata } from "tslib";
/* eslint-disable no-await-in-loop */
import './built-in/built-in.module';
import { ApplicationPlugin } from '@hwy-fm/core/platform/decorator';
import { Inject, Injector, reflectCapabilities } from '@hwy-fm/di';
import { CONTROLLER_MODULE, MODULE_QUEUE } from './constant';
import { RouterManager } from './router-manager';
let ControllerManager = class ControllerManager {
    sortByOrder(arr) {
        return arr.sort((item) => item.__order__ || 0);
    }
    registerControllerModel(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const { controller = [] } = reflectCapabilities.getAnnotation(type, CONTROLLER_MODULE);
            const module = this.injector.get(type);
            for (const control of this.sortByOrder(controller)) {
                yield this.routerManager.register(module, control);
            }
            return module;
        });
    }
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const module of this.sortByOrder(this.injector.get(MODULE_QUEUE) || [])) {
                yield this.registerControllerModel(module);
            }
        });
    }
};
__decorate([
    Inject(Injector),
    __metadata("design:type", Injector)
], ControllerManager.prototype, "injector", void 0);
__decorate([
    Inject(RouterManager),
    __metadata("design:type", RouterManager)
], ControllerManager.prototype, "routerManager", void 0);
ControllerManager = __decorate([
    ApplicationPlugin()
], ControllerManager);
export { ControllerManager };
