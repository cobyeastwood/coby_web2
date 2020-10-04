import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';

import Button from '../components/Button';
import { ON_CLICKS } from '../actions/actionTypes';

import './About.css';

const About = (props: { data: { message: string } }, { clicks }: any) => {
  return (
    <div>
      <h1>Welcome to my app page</h1>
      <p>/about</p>
      <p>{props.data.message}</p>
      <Button
        type="button"
        className="btn btn-secondary"
        onClick={(e: any) => clicks(e)}
      >
        Learn More
      </Button>
    </div>
  );
};

const clicks = (e: any) => ({
  type: ON_CLICKS,
  payload: { _id: uuidv4(), element: e.target },
});

const mapDispatchToProps = (dipatch: any) => {
  return {
    clicks: (e: any) => dipatch(clicks(e)),
  };
};

export default connect(null, mapDispatchToProps)(About);
