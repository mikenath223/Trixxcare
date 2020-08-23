import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PropTypes, { object } from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';
import AliceCarousel from 'react-alice-carousel';
import { SETDOCTORS, SETSIGNIN, SETLOGOUT } from 'store/actions/index';
import {
  handleCloseMenu, handleOpenMenu, setText, resizer,
} from '../../utils/domlist';
import style from './Dashboard.module.css';
import Doctor from '../../components/BoardItem';
import Error from 'pages/Error';
import logo from 'assets/images/logo.png';
import '../../../node_modules/react-alice-carousel/lib/alice-carousel.css';


const mapStateToProps = state => ({
  auth: state.auth,
  docs: state.docs,
});

const mapDispatchToProps = dispatch => ({
  setDocs: docs => dispatch(SETDOCTORS(docs)),
  triggerShowSignin: stat => dispatch(SETSIGNIN(stat)),
  setLogout: act => dispatch(SETLOGOUT(act)),
});


const Dashboard = ({
  auth, docs, setDocs, triggerShowSignin, setLogout,
}) => {
  const [err, setErr] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [alert, setAlert] = useState(false);
  const [filterdocs, setfilterdocs] = useState('');

  const history = useHistory();

  const handleLogout = () => {
    setLogout();
    localStorage.removeItem('tok');
  };

  const handleCancel = () => {
    setAlert(false);
  };

  const handleConfirmed = () => {
    setAlert(false);
    triggerShowSignin({ show: true });
    setTimeout(() => {
      history.push('/');
    }, 1000);
  };

  const handleAuth = () => {
    setAlert(true);
  };

  const handleFilterDocs = () => {
    if (filterdocs !== '' && filterdocs.split('')[filterdocs.length - 1] !== '\\') {
      const pattern = new RegExp(`${filterdocs}`, 'ig');
      const filtered = docs.filter(entry => pattern.test(entry.name));
      return filtered.map(doc => (
        <Doctor
          doc={doc}
          style={style}
          key={doc.id}
        />
      ));
    }
    return docs.map(doc => (
      <Doctor
        doc={doc}
        style={style}
        key={doc.id}
      />
    ));
  };

  const logged = auth.isLogged || localStorage.tok;

  useEffect(() => {
    fetch('https://trixxcare.herokuapp.com/api/doctors', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .then(res => {
        setDocs(res);
        setIsLoaded(true);
        setText();
      })
      .catch(() => {
        setIsLoaded(true);
        setErr(true);
      });

    if (docs.length > 0) {
      return setIsLoaded(true);
    }

    resizer();

    return () => {
      setIsLoaded(false);
    };
  }, [setDocs, docs.length]);


  if (err) {
    return (
      <Error />
    );
  }
  if (!isLoaded) {
    return (
      <div className={style.containerLoad}>
        <img src="https://www.ecoloxtech.com/images/giphycolor.gif" alt="" />
      </div>
    );
  }
  const resp = {
    0: { items: 1 },
    768: { items: 2 },
    1024: { items: 3 },
  };

  return (
    <div className={style.container}>
      <div className={`${style.sideBar} sideBar`}>
        <div onClick={handleCloseMenu} role="button" tabIndex="0" onKeyDown={() => { }} className={`${style.closeWrap} ${style.menuWrap}`}>
          <img src="https://img.icons8.com/color/30/000000/close-window.png" className={style.closeMenu} alt="" />
        </div>
        <p className={style.user}>
          {auth.user && <img src="https://img.icons8.com/windows/35/000000/user-male-circle.png" alt="" />}
          {' '}
          {auth.user && auth.user.substring(0, 7)}
        </p>
        <Link to="/">
          <img className={style.logo} src={logo} alt="" />
        </Link>
        <div className={style.midBar}>
          <p>CAREGIVERS</p>
          {logged ? (
            <p>
              {' '}
              <Link to="/appointments">APPOINTMENTS</Link>
            </p>
          ) : null}
        </div>

        <footer className={style.sideFoot}>
          {logged ? <button type="button" href="#" onClick={handleLogout}>Logout</button> : <button type="button" href="#" onClick={handleConfirmed}>Sign In</button>}
          <p>
            {' '}
            <a href="https://github.com/mikenath223/trixxcare/issues" target="_blank" rel="noopener noreferrer">Help</a>
          </p>
          <p>
            <img src="https://img.icons8.com/android/24/000000/twitter.png" alt="" />
            <img src="https://img.icons8.com/android/24/000000/facebook-new.png" alt="" />
            <img src="https://img.icons8.com/android/24/000000/google-plus.png" alt="" />
            <img src="https://img.icons8.com/material/24/000000/vimeo.png" alt="" />
            <img src="https://img.icons8.com/metro/24/000000/pinterest.png" alt="" />
          </p>
        </footer>
      </div>
      <div className={style.slideWrap}>
        <div className={style.menuWrap} role="button" tabIndex="0" onKeyDown={() => { }} onClick={handleOpenMenu}>
          <img src="https://img.icons8.com/android/24/000000/hamburger.png" alt="" className={style.menuIcon} />
        </div>
        {!logged ? <div className={style.overlay} role="button" tabIndex="0" onKeyDown={() => { }} onClick={handleAuth}> </div> : null}
        <input type="search" value={filterdocs} className={style.docsSearch} placeholder="Search Doctors" aria-label="Search" aria-describedby="basic-addon1" data-testid="entry" onChange={e => setfilterdocs(e.target.value)} />
        <div className={style.intro}>
          <p>Latest Caregivers</p>
          <p>Please select a caregiver</p>
        </div>
        <AliceCarousel
          slideToIndex={10}
          responsive={resp}
          autoPlayInterval={3200}
          autoPlayDirection="ltr"
          autoPlay
          fadeOutAnimation
          mouseTrackingEnabled
          disableAutoPlayOnAction
          dotsDisabled
        >
          {
            handleFilterDocs()
          }
        </AliceCarousel>
      </div>
      {
        alert
          ? (
            <SweetAlert
              warning
              showCancel
              confirmBtnText="Sign In"
              confirmBtnBsStyle="danger"
              focusCancelBtn
              title="Please Log In!"
              onConfirm={handleConfirmed}
              onCancel={handleCancel}
            >
              You must be signed in to complete this action, go to homepage.
            </SweetAlert>
          ) : null
      }
    </div>
  );
};


Dashboard.defaultProps = {
  auth: PropTypes.shape({
    isLogged: false,
    user: '',
  }),
};

Dashboard.propTypes = {
  auth: PropTypes.shape({
    isLogged: PropTypes.bool,
    user: PropTypes.string,
  }),
  docs: PropTypes.arrayOf(object).isRequired,
  setDocs: PropTypes.func.isRequired,
  triggerShowSignin: PropTypes.func.isRequired,
  setLogout: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
