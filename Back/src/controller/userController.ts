import { Request, Response } from 'express';

interface userControllerInterface {
  getUser: Function,
  postUser: Function
  addToFavourites: Function
  removeFromFAvourites: Function
}

function userController(User: any): userControllerInterface {

  async function getUser({ body: { email } }: Request, res: Response) {
    const query = { email };
    try {
      const user = await User.findOne(query);
      res.send(user);
    } catch (error) {
      res.send(error);
    }
  }

  async function postUser({ body }: Request, res: Response) {
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


  async function addToFavourites({ body }: Request, res: Response) {
    const { email, id, image } = body

    try {
      const userFind = await User.findOne({ email });
      userFind.favourites.push({ id, image });
      await userFind.save()
      res.json(userFind)

    } catch (error) {
      res.send(error)
    }


  }

  async function removeFromFAvourites({ body }: Request, res: Response) {
    const { email, id } = body
    try {
      const userFind = await User.findOne({ email });
      const filteredFavourites = userFind.favourites.filter((favourite: favInterface) => favourite.id !== id);

      userFind.favourites = filteredFavourites;
      await userFind.save();
      res.json(userFind)
    } catch (error) {
      res.send(error)
    }

  }

  return {
    getUser, postUser, removeFromFAvourites, addToFavourites
  };
}
export default userController;
