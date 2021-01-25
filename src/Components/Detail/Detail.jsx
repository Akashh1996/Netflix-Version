/* eslint-disable jsx-a11y/iframe-has-title */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
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
  }, [dispatch, video]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let isdetailReady = false;
    if ((!movieDetail || movieDetail.id !== id) && !isdetailReady) {
      dispatch(loadMovieDetail(id));
    }
    return () => {
      isdetailReady = true;
    };
  }, [movieDetail?.original_title, dispatch]);

  useEffect(() => {
    let isCastReady = false;
    if ((!cast || cast.id !== id) && !isCastReady) {
      dispatch(loadMovieCast(id));
    }
    return () => {
      isCastReady = true;
    };
  }, [id, dispatch]);

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
              <div className="casts">
                {cast.cast.slice(0, 5).map((actor) => (
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
            </div>
          </div>
          {/*  <div className="movie__image">
            <img src={`https://image.tmdb.org/t/p/w500/${movieDetail.backdrop_path}`} alt="" />
          </div> */}

        </section>
        )}

      <div className="player-wrapper">
        {video
        && (
        <ReactPlayer
          className="react-player"
          url={`https://www.youtube.com/watch?v=${video}`}
          width="100%"
          height="100%"
          controls
        />
        )}
      </div>
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
