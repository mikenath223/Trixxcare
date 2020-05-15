import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { SETDOCTORS } from '../../actions/index';
import style from './docs.module.css';
import Doctor from '../../components/doctorCat';
import Error from '../404/error-page';
import PropTypes from 'prop-types';
import logo from "../../imgs/logo.png";
import { setText } from '../404/domlist';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";




const mapStateToProps = state => ({
  auth: state.auth,
  docs: state.docs
})

const mapDispatchToProps = dispatch => ({
  setDocs: docs => dispatch(SETDOCTORS(docs)),
})


const DocPage = ({ auth, docs, setDocs }) => {
  const [err, setErr] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    fetch('https://trixxcare.herokuapp.com/api/doctors', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
      .then(res => {
        setDocs(res);
        setIsLoaded(true);
        setText();
      })
      .catch(() => {
        setIsLoaded(true);
        setErr(true);
      })

    if (docs.length > 0) {
      return setIsLoaded(true);
    }

    return setIsLoaded(false);

  }, [setDocs, docs.length])


  if (err) {
    return (
      <Error />
    );
  };
  if (!isLoaded) {
    return (
      <div className={`${style.containerLoad} container-fluid`}>
        <img src="https://www.ecoloxtech.com/images/giphycolor.gif" alt="" />
      </div>
    )
  }
  const resp = {
    0: { items: 1 },
    768: { items: 2 },
    1024: { items: 3 },
  }

  return (
    <div className={style.container}>
      <div className={style.sideBar}>
        <Link to="/">
          <img className={style.logo} src={logo} alt="" />
        </Link>
        <div className={style.midBar}>
          <p>CAREGIVERS</p>
          {auth.isLogged ? <p>APPOINTMENTS</p> : null}
          <p>LIFESTYLE</p>
        </div>

        <footer className={style.sideFoot}>
          {auth.isLogged ? <p>Logout</p> : null}
          <p> <a href="https://github.com/mikenath223/trixxcare/issues" target="_blank" rel="noopener noreferrer">Help</a></p>
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
        <div className={style.intro}>
          <p>Latest Care Givers</p>
          <p>Please select a caregiver</p>
        </div>
        <AliceCarousel
          slideToIndex={10}
          responsive={resp}
          autoPlayInterval={3200}
          autoPlayDirection="rtl"
          autoPlay={true}
          fadeOutAnimation={true}
          mouseTrackingEnabled={true}
          disableAutoPlayOnAction={true}
          dotsDisabled={true}
        >
          {
            docs.map(doc => <Doctor doc={doc} style={style} key={doc.id} />)
          }
        </AliceCarousel>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DocPage);