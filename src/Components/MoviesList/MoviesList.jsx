import React from 'react';
import { connect } from 'react-redux';

function MoviesListComponent() {
  return (
    <h2>Movie list component works</h2>
  );
}

export default connect()(MoviesListComponent);
