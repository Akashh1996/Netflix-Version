/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadVideo } from '../../redux/actions/movieAction';

function Detail({ match, video, dispatch }) {
  const [id] = useState(match.params.id);

  let [youtubeId] = useState('');

  useEffect(() => {
    dispatch(loadVideo(id));
  }, []);

  if (video?.length > 0) {
    youtubeId = video[0].key;
  }

  useEffect(() => {
    window.scrollTo(10, 70);
  }, []);

  return (
    <div
      className="video"
      style={{
        position: 'relative',
        paddingBottom: '56.25%' /* 16:9 */,
        paddingTop: 25,
        height: 0,
        marginTop: '70px',
        margin: '70px 40px 0px 40px',
      }}
    >
      <iframe
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '80%',
        }}
        src={`https://www.youtube.com/embed/${youtubeId}`}
        frameBorder="0"
        allowFullScreen="allowfullscreen"
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
