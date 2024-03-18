/* eslint-disable prettier/prettier */
import express, { IRouter } from 'express';
import passport from 'passport';

class GoogleAuthRoutes {
  private router = express.Router();

  constructor() {
    this.routes();
  }
  private routes = () => {
    this.router.get(
      '/auth',
      passport.authenticate('google', { scope: ['email','profile'] })
    );
    this.router.get(
      '/callback',
      passport.authenticate('google', {
        successRedirect: 'http://localhost:5173/',
        failureRedirect: '/' }),
    )
  };
  public getRoutes = () : IRouter => {
    return this.router;
  }
}

export default GoogleAuthRoutes;
