import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import StarIcon from '@material-ui/icons/Star';
import { loadVideo, loadMovieDetail, loadMovieCast } from '../../redux/actions/movieAction';
import './detail.css';

function Detail({
  match, video, dispatch, movieDetail, cast,
}) {
  const { id } = match.params;

  useEffect(() => {
    dispatch(loadVideo(id));
    dispatch(loadMovieDetail(id));
    dispatch(loadMovieCast(id));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function splitDate(date) {
    return date.split('-')[0];
  }
  return (
    <>
      { movieDetail && cast
        && (
        <section className="detail">
          <div className="movie-detail">
            <div className="movie-detail-text">
              <div className="movie-detail__title">
                <h1>
                  {movieDetail.original_title}
                  {' '}
                  <span className="movie__release-date">
                    (
                    {splitDate(movieDetail.release_date)}
                    )
                  </span>
                  {' '}
                </h1>
                <span className="movie__star">
                  <StarIcon />
                  <span className="star">{movieDetail.vote_average}</span>
                </span>
              </div>
              <div className="movie-detail__extra">
                {movieDetail.genres.map((genre) => (
                  <span key={genre.name} className="genre">
                    {genre.name}
                    <span className="genre__seperator">|</span>
                  </span>
                ))}
                <span>
                  {movieDetail.runtime}
                  {' '}
                  min
                </span>
                <span className="genre__seperator">|</span>
                <span className="release-date">{movieDetail.release_date}</span>
                <p className="overview">{movieDetail.overview}</p>
              </div>
            </div>

            <div className="player-wrapper">
              {video
              && (
              <ReactPlayer
                className="react-player"
                url={`https://www.youtube.com/watch?v=${video}`}
                width="80%"
                height="80%"
                controls
              />
              )}
            </div>
          </div>

          <div className="casts">
            {cast.cast.slice(0, 3).map((actor) => (
              <div className="casts-info">
                {actor.profile_path !== null
                    && (
                    <>
                      <img src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt="actorPhoto" className="cast__image" />
                      <p className="cast-name">{actor.name}</p>
                    </>
                    )}

              </div>
            ))}
          </div>
        </section>
        )}

    </>

  );
}

function mapStateToProps(state) {
  return {
    video: state.movieReducer.video,
    allMovies: state.movieReducer.allMovies,
    movieDetail: state.movieReducer.movieDetail,
    cast: state.movieReducer.cast,

  };
}
export default connect(mapStateToProps)(Detail);
