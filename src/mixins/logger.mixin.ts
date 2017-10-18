// Copyright (c) IBM Corp. 2013,2017. All Rights Reserved.
// Node module: loopback4-extension-starter
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

// tslint:disable:no-any

import {Constructor} from '@loopback/context';
import {Logger} from '../types';

/**
* A mixin class for Application that creates a .logger()
* function to register a Logger automatically. Also overrides
* component function to allow it to register Logger's automatically.
*
* ```ts
* class MyApplication extends LoggerMixin(Application) {}
* ```
*/
export function LoggerMixin<T extends Constructor<any>>(superClass: T) {
  return class extends superClass {
    // A mixin class has to take in a type any[] argument!
    constructor(...args: any[]) {
      super(...args);
      if (!this.options) this.options = {};

      if (this.options.loggers) {
        for (const logger of this.options.loggers) {
          this.logger(logger);
        }
      }
    }

    /**
    * Add a Logger to this application.
    *
    * @param Logger The Logger to add.
    *
    * ```ts
    * class Logger {
    *   log(...args: any) {
    *     console.log(...args);
    *    }
    * };
    *
    * app.logger(Logger);
    * ```
    */
    logger(logClass: Constructor<Logger>) {
      const loggerKey = `loggers.${logClass.name}`;
      this.bind(loggerKey).toClass(logClass);
    }

    /**
    * Add a component to this application. Also mounts
    * all the components Loggers.
    *
    * @param component The component to add.
    *
    * ```ts
    * export class ProductComponent {
    *   controllers = [ProductController];
    *   loggers = [ProductLogger];
    *   providers = {
    *     [PRODUCT_PROVIDER]: ProductProvider,
    *   };
    * };
    *
    * app.component(ProductComponent);
    * ```
    */
    component(component: Constructor<any>) {
      super.component(component);
      this.mountComponentLoggers(component);
    }

    /**
    * Get an instance of a component and mount all it's
    * loggers. This function is intended to be used internally
    * by component()
    *
    * @param component The component to mount Logger's of
    */
    mountComponentLoggers(component: Constructor<any>) {
      const componentKey = `components.${component.name}`;
      const compInstance = this.getSync(componentKey);

      if (compInstance.loggers) {
        for (const logger of compInstance.loggers) {
          this.logger(logger);
        }
      }
    }
  };
}
