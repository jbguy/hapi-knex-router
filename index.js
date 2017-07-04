// Data Validation
const Joi = require('joi');
// UUID generation
const guid = require('node-uuid');


module.exports = class HapiKnexRouter {
    // Constructor
    // Need a Knex.Config object
    // http://knexjs.org/#Installation-client
    constructor(config) {
        this.knex = require('knex')(config);
    }

    // Generate list of routes
    /**
     * @param   {String} dbTable 
     * @param   {String} routeName 
     * @param   {Object} params 
     */
    generateRoute(dbTable, routeName, params){

        this.dbTable = dbTable;
        this.routeName = routeName;
        this.params = params;

        return [{
            path: '/' + this.routeName,
            method: 'GET',
            config: {
                tags: ['api'], 
                auth: { strategy: 'token' },
            },
            handler: ( request, reply ) => {
                const getOperation = this.knex( this.dbTable ).orderBy('created_at')
                    .then(( results ) => {
                        if( !results || results.length === 0 ) {
                            reply( {
                                error: true,
                                errMessage: 'no data found',
                            } );
                        } else {
                            reply( results );
                        }
                    })
                    .catch(( err ) => {reply( 'server-side error' );});
            }
        }, {
            path: '/' + this.routeName + '/{modelUUID}',
            method: 'GET',
            config: {
                tags: ['api'], 
                auth: { strategy: 'token' },
                validate: {
                    params: {
                        modelUUID: Joi.string().guid().required()
                    }
                },
                handler: ( request, reply ) => {
                    const { modelUUID } = request.params;
                    const getOperation = this.knex( this.dbTable ).where( {
                            uuid: modelUUID
                        }).select()
                        .then(( results ) => {
                            if( !results || results.length === 0 ) {
                                reply( {
                                    error: true,
                                    errMessage: 'no data found',
                                } );
                            } else {
                                reply( results[0]);
                            }
                        })
                        .catch(( err ) => {reply( 'server-side error' );});
                }
            },
        }, {
            path: '/' + this.routeName,
            method: 'POST',
            config: {
                tags: ['api'], 
                auth: { strategy: 'token' },
                validate: {
                    payload: this.params.payload
                },
                handler: ( request, reply ) => {
                    const { data } = request.payload;
                    const uuid = GUID.v4();

                    var params = {};
                    this.params.fields.forEach((field) => {
                        params[field] =  data[field];
                    });
                    params["uuid"] = uuid;

                    const paramsOperation = this.knex( this.dbTable ).insert(
                        params
                    ).then( ( res ) => {
                        reply( {
                            data: uuid,
                            message: 'successfully created'
                        } );
                    } ).catch( ( err ) => {reply( 'server-side error' );});
                }
            }

        }, {
            path: '/' + this.routeName + '/{modelUUID}',
            method: 'PUT',
            config: {
                tags: ['api'], 
                auth: { strategy: 'token' },
                validate: {
                    payload: this.params.payload,
                    params: {
                        modelUUID: Joi.string().guid().required()
                    }
                },
                pre: [{
                    method: ( request, reply ) => {
                        const { modelUUID } = request.params;
                        const getOperation = this.knex( this.dbTable ).where( {
                                uuid: modelUUID,
                            } ).then( ( [ result ] ) => {
                                if( !result ) {
                                    reply( {
                                        error: true,
                                        errMessage: `No data found with uuid : ` + modelUUID
                                    } ).takeover();
                                }
                                return reply.continue();
                            });
                    }
                }],
                handler: ( request, reply ) => {
                    const { modelUUID } = request.params;
                    const { data } = request.payload;

                    var params = {};
                    this.params.fields.forEach((field) => {
                        params[field] =  data[field];
                    });

                    const paramsOperation = this.knex( this.dbTable ).where({
                        uuid: modelUUID
                    }).update( 
                        params 
                    ).then( ( res ) => {
                        reply( {
                            data: modelUUID,
                            message: 'successfully updated'
                        } );
                    } ).catch( ( err ) => {reply( 'server-side error' );});
                }
            }

        }, {
            path: '/' + this.routeName + '/{modelUUID}',
            method: 'DELETE',
            config: {
                tags: ['api'], 
                auth: { strategy: 'token' },
                validate: {
                    params: {
                        modelUUID: Joi.string().guid().required()
                    }
                },
                handler: ( request, reply ) => {
                    const { modelUUID } = request.params;
                    const getOperation = this.knex( this.dbTable ).where( {
                            uuid: modelUUID
                        }).delete()
                        .then(( res ) => {
                            if (res) {
                                reply( {
                                    data: modelUUID,
                                    message: 'successfully deleted'
                                } );
                            } else {
                                reply( {
                                    data: modelUUID,
                                    message: 'no data found'
                                } );
                            }
                            
                        })
                        .catch(( err ) => {reply( 'server-side error' );});
                }
            },
        }]

    }



}