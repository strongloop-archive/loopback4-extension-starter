/*
The Controller starter exntesion will show you how to quickly create
controllers that can be used by LoopBack users. There are a few different
ways controllers can be created. This template shows you the one of many
different ways that exist to create a Controller Extension. 

The different ways possible for creating a Controller Extension:
- Specify your own spec + Controller
- Use decorators to write your Controller
- Use Dependency Injection to write your controller

This template is based on the second approach where we skip on defining an OpenAPI Spec
for our controller and just use handy decorators available to us to create our controller. 
*/

import { api } from '@loopback/core';

export class ExampleController { // UPDATE: Name of controller from ExampleConroller to something more meaningful

  // We start by specifying the HTTP Request type by using the appropriate decorator and telling it the route we are supporting.
  // Request Type decorators take the route Path as a parameter and an option Operation Spec.
  // Available Decorators: @get(), @post(), @put(), @del(), @patch()
  @get('/example') // **UPDATE**: use appropriate decorator and set route 

  // If you require any parameters you can declare them using the @param decorator which takes a Parameter Object.
  // Paramter Object is an object that consists of 3 properties: 
  // in - one of: query, header, path, formData, body
  // type - one of: string, number, boolean, integer
  // name - name of the parameter
  // There's sugar decorators to make that easy that take the format of @param.${in}.${type}(${name})
  // 
  // Examples
  // @param({name: 'age', type: 'integer', in:'query'})
  // @param.query.integer('age');
  
  // **ADD**: Parameter decorators here:

  // You actual operation handler
  example() {
    // Process data / create Response here and return it. 
    return ""; // **UPDATE**: The response value you want to return to the user.
  }
}
