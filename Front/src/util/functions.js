/* eslint-disable no-plusplus */
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const notifyRemove = () => {
  toast('Removed from watch List',
    { position: toast.POSITION.TOP_RIGHT, autoClose: 1000 });
};

const notifyAdd = () => {
  toast('Added to watch List',
    { position: toast.POSITION.TOP_RIGHT, autoClose: 1000 });
};

export function checkFav(id, fav) {
  let isFav = false;
  for (let index = 0; index < fav?.length; index++) {
    if (fav[index].id === id) {
      isFav = true;
    }
  }
  return isFav;
}

export function handleClick(

  movieList, {
    loggedUser, handleClickOpen, dispatch, addFav, deleteFav, fav,
  },
) {
  if (loggedUser) {
    const bool = fav?.some((e) => e.id === movieList.id);
    if (bool) {
      dispatch(deleteFav({
        id: movieList?.id,
        email: loggedUser,
      }));
      notifyRemove();
    } else {
      dispatch(addFav({
        id: movieList?.id,
        email: loggedUser,
        image: movieList?.poster_path,
      }));
      notifyAdd();
    }
  } else {
    handleClickOpen();
  }
}
