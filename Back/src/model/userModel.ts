const { Schema, model } = require('mongoose');

interface favInterface{
    id: number,
    image: string
}

interface userInterface{
    displayName: string
    email: string
    favourites: favInterface[]
}

const userSchema : userInterface = new Schema({
  displayName: String,
  email: String,
  favourites: [
    {
      id: Number,
      image: String,
    },
  ],
});

module.exports = model('users', userSchema);
