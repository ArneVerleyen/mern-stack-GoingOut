import { Application, NextFunction, Request, Response } from 'express';

import { HomeController, FallbackController } from '../controllers';
// import API routers
import { default as ApiRouter } from '../api/router';

class Router {
  private app: Application;
  private apiRouter: ApiRouter;
  private homeController: HomeController;
  private fallbackController: FallbackController;

  constructor(app: Application) {
    this.app = app;
    this.apiRouter = new ApiRouter();

    this.registerControllers();
    this.registerRoutes();
  }

  private registerControllers() {
    this.homeController = new HomeController();
    this.fallbackController = new FallbackController();
  }

  private registerRoutes() {
    this.app.route(['/', '/home']).all(this.homeController.index);
    this.app.use('/api', this.apiRouter.router);
    this.app.use('/*', this.fallbackController.index);
  }
}

export default Router;
