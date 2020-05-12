import { default as http, createServer, Server } from 'http';
import {
  default as express,
  Application,
  NextFunction,
  Request,
  Response,
} from 'express';

// eigen imports
import { default as Router } from './router';
import Globalmiddleware, { default as GlobalMiddleware } from './middleware';
import { IAppError } from './utilities';

// Config bestanden 
import { default as Config, IConfig } from './services/Config';

class App {
  public app: Application;
	private config: IConfig;
	private logger: ILogger;
  private server: Server;
	private router: Router;
	
  
  constructor(logger: ILogger, config: IConfig) {
	this.config = config;
	this.logger = logger;

    this.createExpress();
    this.createServer();
  }

  private createExpress(): void {
    this.app = express();
    Globalmiddleware.load(this.app, __dirname);
    this.createRouter();
    this.app.use(this.clientErrorHandler);
    this.app.use(this.errorHandler);
  }

  private clientErrorHandler(
    error: IAppError,
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    if (req.xhr) {
      res.status(error.status).json({ error });
    }
    next(error);
  }

  private errorHandler(
    error: IAppError,
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    if (error.status === 404) {
      res.status(404).render('pages/404');
    } else {
      res.status(500).json({ message: '500' });
    }
  }

  private createServer(): void {
    this.server = createServer(this.app);
    this.server.on('error', (error?: Error) => {
      this.gracefullShutdown(error);
		});
		this.server.on('close', () => {
			this.logger.info('Server is closed!',{})
		});
    this.server.on('listening', () => {
      this.logger.info(`Me server is listening on ${this.config.server.host}:${this.config.server.port}`,{});
    });
  }

  private createRouter(): void {
    this.router = new Router(this.app);
  }

  public start(): void {
    this.server.listen(this.config.server.port, this.config.server.host);
  }

  public stop(): void {
    this.server.close((error?: Error) => {
      this.gracefullShutdown(error);
    });
  }

  private gracefullShutdown(error?: Error): void {
		this.logger.info('Server is gracefully shut down!', error || {});
    if (error) {
      process.exit(1);
    }
    process.exit();
  }
}
import { ILogger } from './services/logging';

export default App;
