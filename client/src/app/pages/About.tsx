import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Button from '../components/Button';
import { ON_CLICKS } from '../actions/actionTypes';

import './About.css';

const Head = styled.h2`
  margin: 2.5rem;
  text-align: center;
`;

const P = styled.p`
  margin: 1rem;
  text-align: center;
`;

const About = (props: { data: { message: string }; clicks: any }) => {
  return (
    <div>
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
