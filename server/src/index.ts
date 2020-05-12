import App from './app';


// Eigen imports
import { default as Config, IConfig, Enviroment } from './app/services/Config';
import { default as Logger, ILogger } from './app/services/logging';
import MongoDBDatabase from './app/services/database';



(async () => {
	// create config service 
	const config: IConfig = new Config();

	// create logger service
	const logger: ILogger = new Logger();
	
	try{
	// Create DB service
	const mongoDBDatabase = new MongoDBDatabase(logger, config);
	const connected = await mongoDBDatabase.connect();

	if(config.env === Enviroment.development) {
		mongoDBDatabase.seed();
	}

	logger.info('Yes connected to DB', connected);

	// Create express App
  const app: App = new App(logger, config);
  app.start();
	
	// Stop alle processen
  const stopAllProcesses = async () => {
		app.stop();
		await mongoDBDatabase.disConnect();

    logger.info('Stopped all processes for this App', {mesg: ':('});
  };

  process.on('SIGINT', () => stopAllProcesses());
  process.on('SIGTERM', () => stopAllProcesses());
	} catch(error) {
		logger.error('Can\'t launch the Application', error);
	}

})(); // = een iife beschermd de inhoud
