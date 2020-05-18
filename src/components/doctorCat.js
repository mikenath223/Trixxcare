import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Doctor = ({ doc, style }) => (
  <div className={style.docWrap} onDragStart={e => e.preventDefault}>
    <Link to={`doctors/${doc.name}-${doc.id}`}>
      <img className={style.image} src={doc.image} alt="doctor" />
      <p className={style.docName}>{doc.name}</p>
      <p className={style.docDet}>{doc.details.split('|')[0]}</p>
      <p>
        <img src="https://img.icons8.com/carbon-copy/30/000000/facebook-circled.png" alt="" />
        <img src="https://img.icons8.com/wired/30/000000/twitter-circled.png" alt="" />
        <img src="https://img.icons8.com/carbon-copy/30/000000/filled-message.png" alt="" />
      </p>
    </Link>
  </div>
);

Doctor.propTypes = {
  doc: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
  }).isRequired,
  style: PropTypes.shape({
    docDet: PropTypes.string,
    docName: PropTypes.string,
    image: PropTypes.string,
    docWrap: PropTypes.string,
  }).isRequired,
};

export default Doctor;
