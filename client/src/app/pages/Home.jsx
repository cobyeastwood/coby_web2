import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Head, Section } from '../styles/component.styles';
import { change, events } from '../utility/analytics';
import { ON_CLICKS } from '../actions/actionTypes';

import * as backup from '../json/data.json';
import * as helm from '../json/content.json';

const axios = require('axios').default;

export const P2 = styled.p`
  margin: 2rem;
  text-align: left;
`;

const Home = ({ clicks }) => {
  const [typi, setTypi] = useState([backup[0]]);
  const [bool, setBool] = useState(false);

  useEffect(() => {
    if (window) {
      change(window);
    }

    async function axiosGet() {
      try {
        const { status, data } = await axios.get('/api/v1/typicode');
        if (status === 200 && data && data.id) {
          setTypi([data]);
        }
      } catch (err) {}
    }
    axiosGet();
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Coby Eastwood: Home</title>
        <meta name="description" content={helm.content} />
        <link rel="canonical" href="http://cobyeastwood.com/"></link>
      </Helmet>
      <Head>Welcome to my home page</Head>
      <Section>
        <h1>Home</h1>
        <br />
        <p className="text-break">
          Let's talk about coding! Love RESTful APIs? Check out below to see
          them at work. Site is made using a Golang backend, with a TypeScript,
          and JavaScript frontend.
        </p>
        <br />
        <button
          type="button"
          className="btn btn-light"
          onClick={(e) => {
            !bool ? setBool(true) : setBool(false);
            events(e);
            clicks(e);
          }}
        >
          Test Backend
        </button>
        <span>
          {bool
            ? typi.map((t) => (
                <P2>
                  userId: {t.userId}
                  <br />
                  title: {t.title}
                  <br />
                  id: {t.id}
                  <br />
                  completed: {t.completed === true ? 'true' : 'false'}
                  {t.id !== 104 ? (
                    <React.Fragment>
                      <br />
                      <br />
                      Still curious? Checkout the{' '}
                      <a href="/api/v1/typicode">route</a>.
                    </React.Fragment>
                  ) : null}
                </P2>
              ))
            : null}
        </span>
        <br />
        <button type="button" className="btn btn-link">
          <a href="https://github.com/cobyeast/coby_web">Source code</a>
        </button>
      </Section>
      <Section>
        <h1>Work Experience</h1>
        <br />
        <h5>
          <strong>Gobii</strong>
        </h5>
        <h6>April 2020 - Present // Software Developer</h6>
        <p>
          As a Software Developer, I create iteractive web components for
          realestate listing platforms including{' '}
          <a href="https://gobii.com/">Gobii</a>, and others. In this position,
          I use version control – Git/GitHub, and work with React, Node,
          MongoDB, and Postgres. In this position, I have also completed Dev Ops
          tasks using packages like Asyncio, and Aiohttp in Python.
        </p>
      </Section>
      <Section>
        <h5>
          <strong>Crosspoint Evaluations</strong>
        </h5>
        <h6>June 2019 - January 2020 // Marketing Operations Manager</h6>
        <p>
          As a Marketing Operations Manager, I lead and enabled a team of three
          sales associates, crafted business development campaigns, managed our
          sales pipeline using Pipedrive, conducted competitive analysis,
          tracked key performance indicators, and promoted our services through
          direct marketing channels.
        </p>
        <p>
          In this position, I worked with tools such as Google Analytics, Google
          Search Console, Yesware, CRMs, and refined my skills in SEO, HTML5,
          CSS3, and email marketing.
        </p>
      </Section>
      <Section>
        <h5>
          <strong>Table Public Relations</strong>
        </h5>
        <h6>June 2018 - January 2019 // Associate</h6>
        <p>
          As an Associate, I worked closely with my account managers, CEOs, and
          marketing teams of venture-backed technology startups to research,
          brainstorm, strategize, and construct communication campaigns.
        </p>
        <p>
          I learned how to write blogs, pitches, and press releases. I also
          learned how to conduct keyword analysis, research media trends, and
          craft communication campaigns, executive profiles, and proposals of
          work. During this time, I refined my skills in Excel, copywriting, and
          email marketing.
        </p>
      </Section>
      <Section>
        <h5>
          <strong>Pantry Fuel</strong>
        </h5>
        <h6>Septemper 2017 - January 2018 // Growth Marketing Intern</h6>
        <p>
          As a Growth Marketing Intern, I worked closely with Pantry Fuel's CEO
          to improve sales and retention rates. In my role, I attended local
          marketing events, met with small businesses to promote our services,
          crafted blogs, and ran all social media accounts.
        </p>
      </Section>
    </React.Fragment>
  );
};

const clicks = (e) => ({
  type: ON_CLICKS,
  payload: { _id: uuidv4(), element: e.type },
});

const mapDispatchToProps = (dipatch) => {
  return {
    clicks: (e) => dipatch(clicks(e)),
  };
};

export default connect(null, mapDispatchToProps)(Home);
