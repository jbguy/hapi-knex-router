# hapi-knex-router

Route generator for Hapi.js combine to Knex.js

### Prerequisites

You need to install [Hapi](https://hapijs.com/) & [KnexJS](http://knexjs.org/) on you Node environment

### Use

Start by add the require package

```
var HapiKnexRouter = require('hapi-knex-router');
```

Initialize the generator with a [Knex.Config object](http://knexjs.org/#Installation-client)

```
var myGenerator = new HapiKnexRouter({
    client: 'pg', // mysql, sqlite3
    connection: "...",
});
```

Then generate routes with 3 parameters :
* dbTable : Name of the table
* routeName : Name of the route you want
* params : 
    * List of fields except uuid 
    * Joi Validation
    
```
    generateRoute(dbTable, routeName, params){
```

```
var crudRoutes = myGenerator.generateRoute(
    'myDbTable', 
    'my_route', 
    {
        fields : ["label", "foreign_key"],
        payload : 
            Joi.object({ 
                data: Joi.object({
                    label: Joi.string().required(),
                    foreign_key: Joi.string().guid().required(),
                }).required()
            })
    }
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

