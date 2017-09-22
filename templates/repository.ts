import {
  Class,
  CrudConnector,
  DataSource,
  Entity,
  EntityData,
  Filter,
  ObjectType,
  Options,
  Where
} from "@loopback/repository";

// You can implement your own LoopBack Juggler Repository using the various 
// interfaces exposed via Juggler. This allows you to use any underlying 
// DataBase Driver to connect to the database & execute the required functions

// UPDATE: Class Name
export class MyRepository implements CrudConnector {
  //fixme make connection strongly typed
  private connection: any;

  constructor(config: Object) {
    // Take in a DB Config Object.
    // Configure your driver and establish a connection to the server here.
  }

  name: ""; // Name of your repository

  connect(): Promise<void> {
    // You should establish the connection to the DB here.
  }

  disconnect(): Promise<void> {
    // You should disconnect the connection from the DB here.
  }

  ping(): Promise<void> {
    // Implement a ping test here to test DB connectivity.
  }

  updateAll(
    modelClass: Class<Entity>,
    data: EntityData,
    where: Where,
    options: Options
  ): Promise<number> {
    // Implement logic to update all instances of a model
    // that match the where filter provided to you by the user.
    // You should return the number of instances that have been updated.
  }

  create(
    modelClass: Class<Entity>,
    entity: EntityData,
    options: Options
  ): Promise<EntityData> {
    // Create an instance of the Model and if successful, return instance to 
    // user
  }

  save(
    modelClass: Class<Entity>,
    entity: EntityData,
    options: Options
  ): Promise<EntityData> {
    // Save an instance of the Model instance and return to user if successful
  }

  find(
    modelClass: Class<Entity>,
    filter: Filter,
    options: Options
  ): Promise<EntityData[]> {
    // Find all instances of Model matching the filter and return an array of
    // matched instances to the user.
  }

  findById(
    modelClass: Class<Entity>,
    id: any,
    options: Options
  ): Promise<EntityData> {
    // Given an id, find and the return the matching Model instance
  }

  update(
    modelClass: Class<Entity>,
    entity: EntityData,
    options: Options
  ): Promise<boolean> {
    // Update a given instance and return a boolean based on the result of the 
    // save
  }

  delete(
    modelClass: Class<Entity>,
    entity: EntityData,
    options: Options
  ): Promise<boolean> {
    // Given an instance of a Model, delete it and return the result of the 
    // delete as a boolean
  }

  createAll(
    modelClass: Class<Entity>,
    entities: EntityData[],
    options: Options
  ): Promise<EntityData[]> {
    // Given an array of instances of a Model, save them all and return an
    // array of all successfully saved instances.
  }

  updateById(
    modelClass: Class<Entity>,
    id: any,
    data: EntityData,
    options: Options
  ): Promise<boolean> {
    // Update the instance matching the id with the given data, return a 
    // boolean based on result of update
  }

  replaceById(
    modelClass: Class<Entity>,
    id: any,
    data: EntityData,
    options: Options
  ): Promise<boolean> {
    // Given an id, and an instance, replace the old instance matching the id
    // with the new one. Return a boolean to indicate the result of the save.
  }

  deleteAll(
    modelClass: Class<Entity>,
    where: Where,
    options: Options
  ): Promise<number> {
    // Delete all instance of the model. Return the number of instances deleted
    // successfully.
  }

  deleteById(
    modelClass: Class<Entity>,
    id: any,
    options: Options
  ): Promise<boolean> {
    // Delete an instance matching the given id. Return a boolean to indicate
    // success/failure of operation.
  }

  count(
    modelClass: Class<Entity>,
    where: Where,
    options: Options
  ): Promise<number> {
    // Return the number of instances that match the given where filter
  }

  exists(
    modelClass: Class<Entity>,
    id: any,
    options: Options
  ): Promise<boolean> {
    // Return a boolean to indicate the existance of an instance of a Model
    // with a given ID.
  }
}
