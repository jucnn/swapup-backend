  
/* 
Imports
*/
    // NPM modules
    require('dotenv').config(); //=> https://www.npmjs.com/package/dotenv
    const express = require('express'); //=> https://www.npmjs.com/package/express
    const bodyParser = require('body-parser'); //=> https://www.npmjs.com/package/body-parser
    const cookieParser = require('cookie-parser'); //=> https://www.npmjs.com/package/cookie-parser
    const passport = require('passport'); //=> https://www.npmjs.com/package/passport
    const path = require('path'); //=> https://www.npmjs.com/package/path

    // Services
    const MONGOclass = require('./services/mongo.class');
//

/* 
Server class
*/
class ServerClass{
    constructor(){
        this.server = express();
        this.port = process.env.PORT;
        this.MongoDB = new MONGOclass;
    }

    init(){
        // Set CORS middleware
        this.server.use( (req, res, next) => {
            // Allow actions for specific origins
            res.header('Access-Control-Allow-Origin', [process.env.ALLOWED_ORIGINS]);
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Methods', ['GET', 'PUT', 'POST', 'DELETE', 'PATCH']);
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

            // Enable access to specific origins
            next();
        });

        // Set server view engine
        this.server.set( 'view engine', 'ejs' );

        // Static path configuration
        this.server.set( 'views', __dirname + '/www' );
        this.server.use( express.static(path.join(__dirname, 'www')) );

        //=> Body-parser
        this.server.use(bodyParser.json({limit: '10mb'}));
        this.server.use(bodyParser.urlencoded({ extended: true }));

        //=> Use CookieParser to setup serverside cookies
        this.server.use(cookieParser(process.env.COOKIE_SECRET));

        // Start server configuration
        this.config();
    }

    config(){
        
        //Set authentifciation
        const {setAuthentification} = require('./services/auth.service');
        setAuthentification(passport)

        // Set AUTH router
        const AuthRouterClass = require('./routers/auth.router')
        const authRouter = new AuthRouterClass()
        this.server.use('/auth', authRouter.init())

        // Set API router
        const ApiRouterClass = require('./routers/api.router');
        const apiRouter = new ApiRouterClass({passport});
        this.server.use('/api', apiRouter.init());


        // Launch server
        this.launch();
    }

    launch(){
        // Start MongoDB connection
        this.MongoDB.connectDb()
        .then( db => {
            // Start server
            this.server.listen(this.port, () => {
                console.log({
                    node: `http://localhost:${this.port}`,
                    mongo: db.url,
                });
            });
        })
        .catch( dbErr => console.log('MongoDB Error', dbErr));
    }
}
//

/* 
Start server
*/
    const NODEapi_boilerplate = new ServerClass();
    NODEapi_boilerplate.init();
//