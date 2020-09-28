import bodyParser from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import cors from 'cors';
import Express from 'express';
import helmet from 'helmet';
import methodOverride from 'method-override';
import { ApolloServer } from 'apollo-server-express';
import { dbConnectionOpen } from './libs/Database';
import { CurrencyAPI, ExchangeAPI } from './services';

export default class Server {
  constructor(config) {
    this.config = config;
    this.app = new Express();
    this.run = this.run.bind(this);
  }

  get application() {
    return this.app;
  }

  /**
   * To enable all the setting on our express app
   * @returns -Instance of Current Object
   */
  bootstrap() {
    this._initHelmet();
    this._initCompress();
    this._initCookieParser();
    this._initCors();
    this._initJsonParser();
    this._initMethodOverride();

    return this;
  }

  /**
   * Compression of the output
   */
  _initCompress() {
    this.app.use(compress());
  }

  /**
   * Parse Cookie header and populate req.cookies with an object keyed by the cookie names
   */
  _initCookieParser() {
    this.app.use(cookieParser());
  }

  /**
   *
   * Lets you to enable cors
   */
  _initCors() {
    this.app.use(cors());
  }

  /**
   *
   * Helmet helps you secure your Express apps by setting various HTTP headers.
   */
  _initHelmet() {
    this.app.use(helmet());
  }

  /**
   *  - Parses urlencoded bodies & JSON
   */
  _initJsonParser() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  /**
   *
   * Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
   */
  _initMethodOverride() {
    this.app.use(methodOverride());
  }

  async setupApollo(schema) {
    const { app } = this;

    this.server = new ApolloServer({
      ...schema,
      dataSources: () => ({
        CurrencyAPI: new CurrencyAPI(),
        ExchangeAPI: new ExchangeAPI(),
      })
    });

    this.server.applyMiddleware({
      app,
      cors: false,
    });
    this.httpServer = createServer(app);
    this.server.installSubscriptionHandlers(this.httpServer);
    this.run();
  }

  /**
   *
   * @returns -Instance of Current Object
   */
  async run() {
    try {
      const { port, env } = this.config;
      const dbConnectionResult = await dbConnectionOpen();
      if (!dbConnectionResult) {
        throw new Error('Could not connect to databse');
      }
      this.httpServer.listen(port, () => {
        console.info(`server started on port ${port} (${env})`); // eslint-disable-line no-console
      });
  
      return this;
    } catch (err) {
      console.log(":::", err);
    }
  }
}