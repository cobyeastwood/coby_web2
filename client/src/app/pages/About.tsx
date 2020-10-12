import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { Head, Section } from '../styles/component.styles';
import { change } from '../utility/analytics';

import * as helm from '../json/content.json';

const About = (props: any) => {
  useEffect(() => {
    if (window) {
      change(window);
    }
  }, []);
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
          I began in San Francisco, California working in Communications and
          Marketing, first as an associate at Table Public Relations and after a
          Marketing Operations Manager at Crosspoint Evaluations. During this
          time, I gained hands-on experience with over eleven different
          high-growth technology startups. Now, I work as a remote Software
          Developer at <a href="https://gobii.com/">Gobii</a>.
        </p>
      </Section>
      <Section>
        <h5>
          <strong>Myself</strong>
        </h5>
        <p>
          In my free time, I will either be running, reading psychology books or
          hanging at a coffee shop. I am personally interested in running,
          coding, reading, cryptocurrencies, stocks, fashion, marketing, border
          collies, and good-mood food.
        </p>
      </Section>
    </React.Fragment>
  );
};

export default About;
