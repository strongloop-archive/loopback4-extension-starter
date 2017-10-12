# Providers

This directory contains providers contributing additional bindings, for example
custom sequence actions.

## Overview

A [provider](http://loopback.io/doc/en/lb4/Creating-components.html#providers) is a class that provides a `value()` function. This function is called `Context` when another entity requests a value to be injected.

Here we create a provider for a logging function that can be used as a new action in a custom [sequence](http://loopback.io/doc/en/lb4/Sequence.html).

The logger will log the URL, the parsed request parameters, and the result. The logger is also capable of timing the sequence if you start a timer at the start of the sequence using `process.hrtime()`.

## Basic Usage

### ElapsedTimeProvider

ElapsedTimeProvider is automatically bound to your Application's [Context](http://loopback.io/doc/en/lb4/Context.html) using the LogComponent which exports this provider with a binding key of `extension-starter.elapsed-timer`. You can learn more about components in the [related resources section](#related-resources).

This provider makes availble to your application a timer function which given a start time _(given as an array [seconds, nanoseconds])_ can give you a total time elapsed since the start in milliseconds. This is used by LogComponent to allow a user to time a Sequence. 

*NOTE:* _You can get the start time in the required format by using `process.hrtime()`._

You can provide your own implementation of the elapsed time function by binding it to the binding key (accessible via `ExtensionStarterBindings`) as follows:
```
app.bind(ExtensionStarterBindings.ELAPSED_TIME).to(timerFn);
``` 

### LogProvider

LogProvider can automatically be bound to your Application's Context using the LogComponent which exports the provider with a binding key of `extension-starter.actions.log`. 

The key can be accessed by importing `ExtensionStarterBindings` as follows:

**Example: Binding Keys**
```
import {ExtensionStarterBindings} from 'HelloExtensions';
// Key can be accessed as follows now
const key = ExtensionStarterBindings.LOG_ACTION;
```

LogProvider gives us a seuqence action. In order to use the sequence action, you must define your own sequence as shown below. 

**Example: Sequence**
```
class LogSequence implements SequenceHandler {
  constructor(
    @inject(coreSequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(coreSequenceActions.PARSE_PARAMS)
    protected parseParams: ParseParams,
    @inject(coreSequenceActions.INVOKE_METHOD)
    protected invoke: InvokeMethod,
    @inject(coreSequenceActions.SEND) protected send: Send,
    @inject(coreSequenceActions.REJECT) protected reject: Reject,
    // We get the logger injected by the LogProvider here
    @inject(ExtensionStarterBindings.LOG_ACTION) protected logger: LogFn,
  ) {}

  async handle(req: ParsedRequest, res: ServerResponse) {
    // We define these variable outside so they can be accessed by logger.
    let args: any = [];
    let result: any;

    // Optional start time to log processing time of request.
    // process.time() gives us an array [seconds, nanoseconds] as expected
    // by the default ElapsedTimeProvider function.
    const start = process.hrtime();

    try {
      const route = this.findRoute(req);
      args = await this.parseParams(req, route);
      result = await this.invoke(route, args);
      this.send(res, result);
    } catch (err) {
      result = err; // so we can log the error message in the logger
      this.reject(res, req, err);
    }

    // We call the logger function given to us by LogProvider
    this.logger(req, args, result, start);
  }
}
```

Once a sequence has been written, we can just use that in our Application as follows:

**Example: Application**
```
const app = new Application({
  sequence: LogSequence,
  components: [LogComponent]
});

// Now all requests handled by our sequence will be logged.
```

## Related Resources

You can check out the following resource to learn more about providers, components, sequences, and binding keys.

- [Providers](http://loopback.io/doc/en/lb4/Creating-components.html#providers)
- [Creating Components](http://loopback.io/doc/en/lb4/Creating-components.html)
- [Using Components](http://loopback.io/doc/en/lb4/Using-components.html)
- [Sequence](http://loopback.io/doc/en/lb4/Sequence.html)
- [Binding Keys](http://loopback.io/doc/en/lb4/Decorators.html)
