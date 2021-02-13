import userController from '../controller/userController';

const { Router } = require('express');

function userRouter(User:any) {
  const router = Router();
  const user = userController(User);

  router.route('/')
    .get(user.getUser);
  router.route('/post')
    .post(user.postUser);
  /*   router.route('/addToFav')
    .put(user.addToFavourites);
  router.route('/removeFav')
    .put(user.removeFromFAvourites); */
  return router;
}

module.exports = userRouter;
