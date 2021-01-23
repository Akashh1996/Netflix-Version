import React from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player/youtube';
import { loadVideo } from '../../redux/actions/movieAction';

function Detail({ match: { params }, video, dispatch }) {
  const { id } = params;

  if (!video) {
    dispatch(loadVideo(id));
  }

  return (
    <div className="movie-trailer">
      <ReactPlayer
        url="https://www.youtube.com/watch?v=1Q8fG0TtVAY&t=14s&ab_channel=WarnerBros.Pictures"
        width="100vw"
        height="100vh"
        pip="true"
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    video: state.movieReducer.video,
  };
}
export default connect(mapStateToProps)(Detail);
