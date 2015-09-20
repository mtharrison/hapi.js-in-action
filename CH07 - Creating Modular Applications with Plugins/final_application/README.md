# pingoo

This is the finished state of the pingoo app, fully modularized into plugins.

## Plugins

The plugins in the ./plugins folder aren't the ones being loaded into the application. The plugins are being loaded from node_modules as they have been published on npm as public packages. The code in ./plugins is just there for your reference.

## Database

1. Download and install RethinkDB: http://rethinkdb.com/docs/install/
2. Run the setup script `node setup.js`
3. You should be good!

## Support

If you have any problems with this, please either post a query on the [Manning Author Forum](https://forums.manning.com/forums/hapi-js-in-action) or send me an email hi@matt-harrison.com.