import React from 'react';
import { connect } from 'react-redux';

function MyList({ getUserDB }) {
  const fav = getUserDB?.favourites;
  return (
    <>
      {fav && fav?.length > 0
        ? fav.map((user) => (
          <img className="movie-photo" src={`https://image.tmdb.org/t/p/w500/${user.image}`} alt="user-fav" />
        )) : (
          <h1 style={{ marginTop: '80px' }}>You dont have any movies in fav list</h1>
        )}
    </>
  );
}

function mapStateToProps({ userReducer }) {
  return {
    getUserDB: userReducer.getUserDB,
  };
}
export default connect(mapStateToProps)(MyList);
