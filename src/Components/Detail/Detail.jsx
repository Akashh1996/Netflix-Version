import React from 'react';
import { connect } from 'react-redux';
import { loadVideo } from '../../redux/actions/movieAction';

function Detail({ match: { params }, video, dispatch }) {
  const { id } = params;

  if (!video) {
    dispatch(loadVideo(id));
  }

  console.log(video);

  return (
    <h1>This is detail</h1>
  );
}

function mapStateToProps(state) {
  return {
    video: state.movieReducer.video,
  };
}
export default connect(mapStateToProps)(Detail);
