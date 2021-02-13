import { Request, Response } from 'express';

interface userControllerInterface{
    getUser: Function,
    postUser: Function
}

function userController(User: any) : userControllerInterface {
  async function getUser({ body } : Request, res: Response) {
    const { email } = body;
    const query = { email };
    try {
      const user = await User.findOne(query);
      res.send(user);
    } catch (error) {
      res.send(error);
    }
  }
  async function postUser({ body } : Request, res: Response) {
    const { email } = body;
    try {
      const query = { email };
      const user = await User.findOneAndUpdate(query, body, {
        new: true, upsert: true, useFindAndModify: false,
      });
      res.send(user);
    } catch (error) {
      res.send(error);
    }
  }
  return {
    getUser, postUser,
  };
}

export default userController;
