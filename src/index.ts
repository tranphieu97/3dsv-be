/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import cookieSession from 'cookie-session';

import './db/db';
import authRoute from './routes/auth.route';
import itemRoute from './routes/item.route';
import meRoute from './routes/me.route';

/**
 * App Variables
 */
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY || ''],
  })
);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(authRoute);
app.use(itemRoute);
app.use(meRoute);

/**
 * Server Activation
 */
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

/**
 * Webpack HMR Activation
 */
type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}
