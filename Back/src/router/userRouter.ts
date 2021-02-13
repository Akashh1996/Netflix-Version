import userController from '../controller/userController';

const { Router } = require('express');

function userRouter(User: any) {
  const router = Router();
  const user = userController(User);

  router.route('/')
    .get(user.getUser)
    .post(user.postUser)
    .put(user.addToFavourites)
    .patch(user.removeFromFAvourites)
  return router;
}

module.exports = userRouter;
