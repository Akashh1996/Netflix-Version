/* eslint-disable no-plusplus */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import StarIcon from '@material-ui/icons/Star';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import { Link } from 'react-router-dom';
import { loadVideo, loadMovieDetail, loadMovieCast } from '../../redux/actions/movieAction';
import Loading from '../Loading/Loading';
import './detail.scss';

function Detail({
  match, video, dispatch, movieDetail, cast, loading,
}) {
  const { id } = match.params;

  useEffect(() => {
    dispatch(loadVideo(id));
    dispatch(loadMovieDetail(id));
    dispatch(loadMovieCast(id));
  }, []);

  function splitDate(date) {
    return date.split('-')[0];
  }

  const getWiki = (actor) => actor.replace(new RegExp(' ', 'g'), '_');

  return (
    <>
      <Link className="back-to-home" to="/">
        <HomeTwoToneIcon className="back__arrow" />
        <p className="back__text">Back to Home</p>
      </Link>
      <hr className="seperator-detail" />
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

            {loading ? <Loading />
              : (
                <div className="player-wrapper">
                  {video
              && (
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${video}`}
                className="react-player"
                playing
              />
              )}
                </div>
              )}
          </div>

          <div className="casts">
            {cast.cast.slice(0, 4).map((actor) => (
              <div className="casts-info" key={actor.name}>
                {actor.profile_path !== null
                    && (
                      <a href={`https://en.wikipedia.org/wiki/${getWiki(actor.name)}`} target="_blank" rel="noreferrer" key={actor.name}>
                        <img src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt="actorPhoto" className="cast__image" />
                        <p className="cast-name">{actor.name}</p>
                      </a>
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
    loading: state.movieReducer.loading,

  };
}
export default connect(mapStateToProps)(Detail);
