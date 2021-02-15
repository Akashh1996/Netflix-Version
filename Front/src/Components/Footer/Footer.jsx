import React from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import './footer.scss';

function Footer() {
  return (
    <footer>
      <div className="social-media">
        <a href="/">
          {' '}
          <FacebookIcon className="social-media__icons" style={{ fontSize: '35px', color: 'grey' }} />
        </a>
        <a href="/">
          <InstagramIcon className="social-media__icons" style={{ fontSize: '35px', marginLeft: '20px', color: 'grey' }} />
        </a>
        <a href="/">
          {' '}
          <TwitterIcon className="social-media__icons" style={{ fontSize: '35px', marginLeft: '20px', color: 'grey' }} />
        </a>
        <a href="/">
          <YouTubeIcon className="social-media__icons" style={{ fontSize: '35px', marginLeft: '20px', color: 'grey' }} />
        </a>
      </div>
      <div className="copyright">
        <p className="copyright_text">
          © 2021 Netflix,  Akash-Santi
        </p>
      </div>
    </footer>

  );
}

export default Footer;
