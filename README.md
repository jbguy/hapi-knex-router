# hapi-knex-router

Route generator for Hapi.js combine to Knex.js

### Prerequisites

You need to install Hapi.js & Knex.js on you Node environment

### Use

Start by add the require package

```
var HapiKnexRouter = require('hapi-knex-router');
```

Initialize the generator with a Knex.Config object
http://knexjs.org/#Installation-client

```
var myGenerator = new HapiKnexRouter(
    client: 'pg', // mysql, sqlite3
    connection: "...",
);
```

Then generate routes
```
var myGenerator = new HapiKnexRouter(
    client: 'pg', // mysql, sqlite3
    connection: "...",
);
```

## Running the tests

@To do


## Built With

* [Hapi](https://hapijs.com/) - A rich framework for building applications and services
* [KnexJS](http://knexjs.org/) - Knex.js is a "batteries included" SQL query builde

## Versioning

We use [SemVer](http://semver.org/) for versioning. 

## Authors

* **Jean-Baptiste Guy** - *Initial work* - [jbguy](https://github.com/jbguy)

See also the list of [contributors](https://github.com/jbguy/hapi-knex-router/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

