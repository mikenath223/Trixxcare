import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const singleDoc = ({ doc }) => (
  <div>
    <Link to={`/${doc.id}`}>
      <div>
        <img src={doc.image} alt="doctor" />
        <p>{doc.name}</p>
        <p>{doc.details.split('|')[0]}</p>
        <button type="button">SEE MORE</button>
      </div>
    </Link>
  </div>
);

singleDoc.propTypes = {
  doc: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};


export default singleDoc;
