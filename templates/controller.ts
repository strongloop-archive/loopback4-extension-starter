/*
The Controller starter exntesion will show you how to quickly create
controllers that can be used by LoopBack users. There are a few different
ways controllers can be created. This template shows you the one of many
different ways that exist to create a Controller Extension. 

The different ways possible for creating a Controller Extension:
- Specify your own spec + Controller
- Use decorators to write your Controller
- Use Dependency Injection to write your controller

This template is based on the first approach, you write the controller OpenAPI Specification
as well as the controller. This approach works best for controllers that are likely to be very generic
and are prohibitive in terms of letting a user configure the controller to write. An example would
be a User Management controller providing endpoints for login, logout, registration, password reset, etc. 
*/

import { api } from '@loopback/core';

// We start by defining the OpenAPI Specification Controller partial. 
// You can add more paths as needed for your controller
const controllerSpec = {
	"basePath": "/",
  "paths": {
    "/example": { // UPDATE: Path for your route
      "get": {
        "x-operation-name": "", // INSERT: Name of function in Controller to handle this route
        "x-controller-name": "", // INSERT: Name of Controller
        // ADD: Any paramters you need to resolve the request. List of Parameter obejcts as specified in the OpenAPI Spec. 
        // OpenAPI Reference: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#parameterObject
        "parameters": [],
        "responses": {
          "200": {
            "description": "", // INSERT: Description of the response
            "examples": { // INSERT: Optionally add examples for the expected reponse
              "text/plain": ""
            }
          }
        }
      }
    }
  }
}

// We use the api decorator to provide information to the router
// about what this controller does for us. 
@api(controllerSpec)
export class ExampleController { // UPDATE: Name of controller from ExampleController to something more meaningful 
	// We can now add functions in this controller to resolve different paths

	function example() { // Example would take any parameters you decalred as function inputs
		// Process data / do something meaninful for the user here to generate the response

		// Return response
		return ""; // INSERT: Response for user goes here ... 
	}
}
