/*
This Mixin starter will show you how to extend loopback-next Application OR
any other class using the concept of a Mixin. A Mixin is a class which takes the
input of a base class and adds / modifies existing functions / static values and returns
a new class which can be instantiated. The type of returned class will still be the base class.

Example usage of Mixin is as follows: 

const newClass = MixinClass(BaseClass)
// Now NewClass will have functions of MixinClass & BaseClass

An important note is that MixinClasses can be combined! This allows us to write small & simple Mixins
that a user can compose into a powerful class as needed. We can also write a helper function to mixin a whole bunch of
smaller mixins. Again this will allow us to write simpler Mixins & compose them to be more powerful, mixins. 

Examples
const newClass = MixinClass1(MixinClass2(MixinClass3(MixinClass4(BaseClass))))

OR

const newClass = MixinClass1(MixinClass2(BaseClass));
const newClass1 = MixinClass3(MixinClass4(BaseClass));

OR

export function HelperFunction (BaseClass) {
	return MixinClass1(MixinClass2(MixinClass3(MixinClass4(BaseClass))));
};

// User would call our HelperFunction
const newClass = HelperFunction(BaseClass)

Mixins were introduced in TypeScript 2.2 and you can read more about there here:
http://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html
https://blog.mariusschulz.com/2017/05/26/typescript-2-2-mixin-classes
*/


// An interface necessary for extending a Mixin. 
export interface Constructor<T> {
  new (...args: any[]): T;
  [property: string]: any;
}

// The Mixin Class Starter code below is written for LoopBack-Next Application Class!
// ****** Rename MixinClass to your Class Name ******
export function MixinClass<T extends Constructor<any>>(superClass: T) {
  return class extends superClass {
  	constructor(...args: any[]) {
      super(...args);

      // Application is extensible and constuctor options will show on this.options
      // We need to do a check to see if a property is required, it is passed in 
      // and is the type we expect OR for optional properties, handle it accordingly.

      if (!this.options) this.options = {};

      // Required property & Type Check
      if (!this.options.requiredProperty) throw new Error('Missing required property');

      if (this.options.optionalProperty) {
      	// DO something with optionalProperty
      }
  	}

  	// If you want to add to the beahvious of an existing function, you can do that. 
  	// You can also override and replace it completly.
  	someExistingFunction(existingProperty: any) {
  		super.someExistingFunction(existingProperty);

  		// Additional value add / functionality you want to provide for this function
  		// NOTE: You can call the original function call before your value add, after OR
  		// not at all if you are replacing the functionality. Know the behaviour difference
  		// and be sure to document it for your users so they know what to expect!
  		// The recommended practice is to not skip calling the original function in case
  		// other extension developers are writing extensions that rely on the original 
  		// behaviour to still be executed. This also avoid breaking nested mixins. 
  		// Remember a user can nest multiple mixins!! 
  	}

  	someNewFunction(someRequiredValue: Constructor<any>) {
  	  // Do something useful for user here ... 
  	}
  }
}
