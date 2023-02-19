"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dyanmicServer = exports.DataError = exports.createInjectableModel = exports.Use = exports.Put = exports.Post = exports.Param = exports.Options = exports.Get = exports.Delete = exports.Controller = exports.All = void 0;
var controller_1 = require("./decorator/controller");
Object.defineProperty(exports, "All", { enumerable: true, get: function () { return controller_1.All; } });
Object.defineProperty(exports, "Controller", { enumerable: true, get: function () { return controller_1.Controller; } });
Object.defineProperty(exports, "Delete", { enumerable: true, get: function () { return controller_1.Delete; } });
Object.defineProperty(exports, "Get", { enumerable: true, get: function () { return controller_1.Get; } });
Object.defineProperty(exports, "Options", { enumerable: true, get: function () { return controller_1.Options; } });
Object.defineProperty(exports, "Param", { enumerable: true, get: function () { return controller_1.Param; } });
Object.defineProperty(exports, "Post", { enumerable: true, get: function () { return controller_1.Post; } });
Object.defineProperty(exports, "Put", { enumerable: true, get: function () { return controller_1.Put; } });
Object.defineProperty(exports, "Use", { enumerable: true, get: function () { return controller_1.Use; } });
var sequelize_1 = require("./decorator/sequelize");
Object.defineProperty(exports, "createInjectableModel", { enumerable: true, get: function () { return sequelize_1.createInjectableModel; } });
var data_error_1 = require("./extension/data-error");
Object.defineProperty(exports, "DataError", { enumerable: true, get: function () { return data_error_1.DataError; } });
var platform_1 = require("./providers/platform");
Object.defineProperty(exports, "dyanmicServer", { enumerable: true, get: function () { return platform_1.dyanmicServer; } });
