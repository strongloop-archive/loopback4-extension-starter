// Copyright IBM Corp. 2017. All Rights Reserved.
// Node module: loopback4-extension-starter
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {expect} from '@loopback/testlab';
import {LoggerMixin, LogArgs, Logger} from '../../..';
import {Application, Component} from '@loopback/core';
import {Constructor} from '@loopback/context';

describe('LoggerMixin (unit)', () => {
  it('mixed class has .logger()', () => {
    const myApp = new AppWithLogger();
    expect(typeof myApp.logger).to.be.eql('function');
  });

  it('binds Logger from constructor', () => {
    const myApp = new AppWithLogger({
      loggers: [MyLogger],
    });

    expectLoggerToBeBound(myApp);
  });

  it('binds Logger from app.logger()', () => {
    const myApp = new AppWithLogger();

    expectLoggerToNotBeBound(myApp);
    myApp.logger(MyLogger);
    expectLoggerToBeBound(myApp);
  });

  it('binds user defined component with Logger in constructor', () => {
    const myApp = new AppWithLogger({
      components: [TestComponent],
    });

    expectComponentToBeBound(myApp, TestComponent);
    expectLoggerToBeBound(myApp);
  });

  it('binds user defined component with logger from .component()', () => {
    const myApp = new AppWithLogger();

    const boundComponentsBefore = myApp.find('components.*').map(b => b.key);
    expect(boundComponentsBefore).to.be.empty();

    myApp.component(TestComponent);

    expectComponentToBeBound(myApp, TestComponent);
    expectLoggerToBeBound(myApp);
  });

  it('returns instantiated instance of Logger for use', () => {
    const myApp = new AppWithLogger({
      loggers: [MyLogger],
    });

    const logger = myApp.getSync('loggers.MyLogger');
    expect(logger).to.be.instanceOf(MyLogger);
  });

  class AppWithLogger extends LoggerMixin(Application) {}

  class MyLogger implements Logger {
    log(...args: LogArgs) {
      console.log('log  :', ...args);
    }

    error(...args: LogArgs) {
      console.log('\x1b[31m error: ', ...args, '\x1b[0m');
    }
  }

  class TestComponent {
    loggers = [MyLogger];
  }

  function expectLoggerToBeBound(myApp: Application) {
    const boundLoggers = myApp.find('loggers.*').map(b => b.key);
    expect(boundLoggers).to.containEql('loggers.MyLogger');
    const logger = myApp.getSync('loggers.MyLogger');
    expect(logger).to.be.instanceOf(MyLogger);
  }

  function expectLoggerToNotBeBound(myApp: Application) {
    const boundLoggers = myApp.find('loggers.*').map(b => b.key);
    expect(boundLoggers).to.be.empty();
  }

  function expectComponentToBeBound(
    myApp: Application,
    component: Constructor<Component>,
  ) {
    const boundComponents = myApp.find('components.*').map(b => b.key);
    expect(boundComponents).to.containEql(`components.${component.name}`);
    const componentInstance = myApp.getSync(`components.${component.name}`);
    expect(componentInstance).to.be.instanceOf(component);
  }
});
