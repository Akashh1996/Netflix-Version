/* eslint-disable no-debugger */
/* eslint-disable no-plusplus */
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
    } else {
      dispatch(addFav({
        id: movieList?.id,
        email: loggedUser,
        image: movieList?.poster_path,
      }));
    }
  } else {
    handleClickOpen();
  }
}
