# loopback-next-extension-starter


A starter project to create extensions for loopback-next.

There are various kinds of Extensions that you can create for LoopBack Next.
Extensions can add new features / functions to `@loopback/core`, provide
controllers, repositories, components and more. Extensions essentially allows
LoopBack Next users to supercharge their application. 

Any one can write an extension for LoopBack Next and this starter project
exists to provide templates to Extensions developers so they can quickly get
strated by copying the template for the type of extension they want to write.

The templates create helpful hints, explanations and examples that you can 
use to write your own extension!

The different kinds of extensions in LoopBack Next are:
- Components
- Controllers
- Mixins
- Providers
- Repositories

## Components
__Description to come ...__
http://loopback.io/doc/en/lb4/Creating-components.html

## Controllers
A Controller is a Class that is responsible for handling a bunch of related
routes. You can write a controller which can handle routes at a specific endpoint
or allow the user to configure it using Dependency Injection. 

Since there are a few different ways you can write a controller for an application,
you can choose from one of the many templates availble to suit your style.

## Mixins
Mixins allow you to add first class functions to `application` as well as
use any of the data made available by it to modify the behaviour by changing it
or enhancing it by adding to the existing behaviour. 

## Providers
__Used by Components ... Need more details__

## Repositories
A Repository is a DataSource that is used by `legacy-juggler` or as formerly known
as in LoopBack 3, a connector. Write your own Repository extension to interface
with any database of your choice.
