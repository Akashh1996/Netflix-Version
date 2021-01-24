/* eslint-disable jsx-a11y/iframe-has-title */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import { loadVideo } from '../../redux/actions/movieAction';

function Detail({
  match, video, dispatch,
}) {
  const { id } = match.params;

  useEffect(() => {
    dispatch(loadVideo(id));
  }, [id, video]);

  useEffect(() => {
    window.scrollTo(10, 70);
  }, [id]);

  return (
    <>
      {video?.length > 0
        ? (
          <div className="player-wrapper">
            <ReactPlayer
              className="react-player"
              url={`https://www.youtube.com/watch?v=${video}`}
              width="100%"
              height="80%"
              controls

            />
          </div>
        ) : (
          <h1>loading</h1>
        )}
    </>

  );
}

function mapStateToProps(state) {
  return {
    video: state.movieReducer.video,
    allMovies: state.movieReducer.allMovies,

  };
}
export default connect(mapStateToProps)(Detail);
