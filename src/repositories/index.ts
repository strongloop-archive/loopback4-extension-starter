import {
    juggler,
    DataSourceConstructor,
    DefaultCrudRepository,
    Entity,
} from '@loopback/repository';

const countModel = require('./models/count.model.json');

// I'm unable to do the following ... 
export class CountRepository extends DefaultCrudRepository<Entity, string> {
  constructor() {
    const ds: juggler.DataSource = new DataSourceConstructor({
        name: 'db',
        connector: 'memory',
        file: './data.json',
    });

    const Count = ds.createModel<typeof juggler.PersistedModel>(
      'count',
      countModel,
      {}
    );

    super(Count, ds);
  }
}

// ***** Works but need to define every function myself :/ *****

// export class CountRepository {
//   model: any;

//   constructor() {
//     // Inject file name via DI? Or maybe the entire config?
//     const ds: juggler.DataSource = new DataSourceConstructor({
//         name: 'db',
//         connector: 'memory',
//         file: './data.json',
//     });

//     this.model = ds.createModel('count', countModel, {});
//   }
// };
