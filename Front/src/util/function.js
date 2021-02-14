/* eslint-disable no-plusplus */
function checkFav(id, fav) {
  let isFav = false;
  for (let index = 0; index < fav?.length; index++) {
    if (fav[index].id === id) {
      isFav = true;
    }
  }
  return isFav;
}

export default checkFav;
