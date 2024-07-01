import '../db/manager';
import '../controller/manager';
import { createPlatformFactory } from '@hwy-fm/core/platform';
import { makeApplication } from '@hwy-fm/core/platform/decorator';
import { PLATFORM, PlatformOptions } from '@hwy-fm/core/token';
import { Injector } from '@hwy-fm/di';
import { ExpressServerPlatform } from './index';
export { PLATFORM_SCOPE } from '@hwy-fm/core/platform';
export { ApplicationPlugin, createRegisterLoader, Input, Prov, Register, runtimeInjector } from '@hwy-fm/core/platform/decorator';
export var Application = makeApplication(function (applicationContext) {
    var createPlatform = createPlatformFactory(null, [
        { provide: ExpressServerPlatform, useClass: ExpressServerPlatform, deps: [PlatformOptions, Injector] },
        { provide: PLATFORM, useExisting: ExpressServerPlatform }
    ]);
    createPlatform(applicationContext).bootstrapStart(applicationContext.providers);
});
