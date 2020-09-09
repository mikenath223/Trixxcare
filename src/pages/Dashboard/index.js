import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes, { object } from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';
import AliceCarousel from 'react-alice-carousel';
import { SETDOCTORS, SETSIGNIN, SETLOGOUT } from 'store/actions/index';
import { handleOpenMenu, setText, resizer } from 'utils/domlist';
import { getCaregivers } from 'utils/request';
import 'react-alice-carousel/lib/alice-carousel.css';
import SideBar from 'components/SideBar';
import Footer from 'components/Footer';
import Doctor from 'components/BoardItem';
import Error from 'pages/Error';
import style from './Dashboard.module.css';

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

  useEffect(() => {
    if (docs.length > 0) {
      setTimeout(setText, 0);
      return setIsLoaded(true);
    }
    getCaregivers(setDocs, setIsLoaded, setErr, setText);
    resizer();

    return () => {
      setIsLoaded(false);
    };
  }, [setDocs, docs.length]);

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

  const logged = localStorage.tok;

  if (err) {
    return (
      <Error />
    );
  }
  if (!isLoaded) {
    return (
      <div className='container'>
        <img src="https://www.ecoloxtech.com/images/giphycolor.gif" alt="" />
      </div>
    );
  }
  const resp = {
    0: { items: 1 },
    750: { items: 2 },
    1024: { items: 3 },
  };

  return (
    <div className="container main-container">
      <SideBar
        auth={auth}
        logged={logged}
      >
        <Footer
          handleLogout={handleLogout}
          logged={logged}
          handleConfirmed={handleConfirmed}
        />
      </SideBar>
      <div className="slideWrap">
        <div className={`${style.menuWrap} btn`} role="button" tabIndex="0" onKeyDown={() => { }} onClick={handleOpenMenu}>
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
