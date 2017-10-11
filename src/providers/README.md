# Providers

This directory contains providers contributing additional bindings, for example
custom sequence actions.

## Overview

A provider is a class that provides a `value()` function. This function is called `Context` when another entity requests a value to be injected.

Here we create a provider for a logging function that can be used in a custom sequence action.

The logger will log the URL, the parsed request parameters, and the result. The logger is also capable of timing the sequence if you start a timer at the start of the sequence using `process.hrtime()`.

## Basic Usage

### LogProvider

LogProvider can automatically be bound to your Application's Context using the LogComponent which exports the provider with a binding key of `extension-starter.actions.log`. You can learn more about components in the [related resources section](#related-resources). 

The key can be accessed by importing `ExtensionStarterBindings` as follows:
**Example: Binding Keys**
```
import {ExtensionStarterBindings} from 'HelloExtensions';
// Key can be accessed as follows now
const key = ExtensionStarterBindings.LOG_ACTION;
```

LogProvider is best used as a Sequence Action. You can define your own sequence action as shown below. 

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
    const start = process.hrtime();

    try {
      const route = this.findRoute(req);
      args = await this.parseParams(req, route);
      result = await this.invoke(route, args);
      this.send(res, result);
    } catch (err) {
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
