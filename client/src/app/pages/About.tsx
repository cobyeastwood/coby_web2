import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Head, P } from '../styles/component.styles';

import { ON_CLICKS } from '../actions/actionTypes';

import './About.css';

const About = (props: { data: { message: string }; clicks: any }) => {
  return (
    <React.Fragment>
      <Head>Welcome to my about page</Head>
      <P>/about</P>
      <P>{props.data.message}</P>
      {/* <Button
        type="button"
        className="btn btn-secondary"
        onClick={(e: any) => clicks(e)}
      >
        Learn More
      </Button> */}
    </React.Fragment>
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
