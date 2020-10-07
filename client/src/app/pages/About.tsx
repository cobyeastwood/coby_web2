import React from 'react';
import { Helmet } from 'react-helmet';

import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Head, Section, P } from '../styles/component.styles';

import { ON_CLICKS } from '../actions/actionTypes';
import * as helm from '../json/content.json';

const About = (props: { data: { message: string }; clicks: any }) => {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Coby Eastwood: About</title>
        <meta name="description" content={helm.content} />
        <link rel="canonical" href="http://cobyeastwood.com/about"></link>
      </Helmet>
      <Head>Welcome to my about page</Head>
      <Section>
        <h1>About</h1>
        <br />
        <h5>
          <strong>My Journey</strong>
        </h5>
        <p>
          I am a Software Developer with hands-on experience with over eleven
          different high-growth technology startups. Over the last year, I have
          begun taking on Software Development projects at mid-sized startups
          like <a href="https://gobii.com/">Gobii</a>. I began my professional
          career working as an associate at Table Public Relations, a small firm
          located downtown San Francisco and now work as a marketing operations
          manager at Crosspoint Evaluations.
        </p>
      </Section>
      <Section>
        <h5>
          <strong>Myself</strong>
        </h5>
        <p>
          In my free time, I will either be running, reading psychology books,
          hanging at a coffee shop or munching on some pastries. I am personally
          interested in running, coding, reading, cryptocurrencies, stocks,
          fashion, marketing, border collies, and good-mood food.
        </p>
      </Section>
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
