import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { Head, Section } from '../styles/component.styles';
import { change, events } from '../utility/analytics';

import { onFetch } from '../actions/actions';
import { ON_CLICKS } from '../actions/actionTypes';

import * as helm from '../json/content.json';

export const P2 = styled.p`
  margin: 2rem;
  text-align: left;
`;

const Home = ({ typicode, clicks, onFetch }) => {
  const [bool, setBool] = useState(false);

  useEffect(() => {
    if (window) {
      change(window);
    }
  }, []);

  const send = e => {
    e.preventDefault();

    !bool ? setBool(true) : setBool(false);

    events(e);
    clicks(e);
  };

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Coby Eastwood: Home</title>
        <meta name='description' content={helm.content} />
        <link rel='canonical' href='https://cobyeastwood.com/'></link>
      </Helmet>
      <Head>Welcome to my home</Head>
      <Section>
        <h1>Home</h1>
        <br />
        <p className='text-break'>
          Let's talk about coding! Click the button below to see REST API's at
          work. Site is made using Golang (Go), with a TypeScript and JavaScript
          frontend.
        </p>
        <br />
        <button
          type='button'
          className='btn btn-light'
          onClick={e => {
            onFetch();
            send(e);
          }}
        >
          Test Backend
        </button>
        <span>
          {bool
            ? [typicode].map(({ userId, id, title, completed }) => (
                <P2>
                  userId: {userId}
                  <br />
                  title: {title}
                  <br />
                  id: {id}
                  <br />
                  completed: {completed ? 'true' : 'false'}
                  {id !== 125 ? (
                    <React.Fragment>
                      <br />
                      <br />
                      Still curious? Checkout the{' '}
                      <a href='/api/v1/typicode'>route</a>.
                    </React.Fragment>
                  ) : (
                    ''
                  )}
                </P2>
              ))
            : ''}
        </span>
        <br />
        <button type='button' className='btn btn-link'>
          <a href='https://github.com/cobyeast/coby_web'>Source code</a>
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
          As a Software Developer, I create iteractive web components on both
          front and backend for Stratus Data Systems where I work on real estate
          listing platforms including <a href='https://gobii.com/'>Gobii</a>,{' '}
          <a href='https://trreb.ca/'>Trebb</a> and others. I also completed two
          team projects including creating custom integrations for client side
          analytics tracking, and Dev Ops scripts for task automatation using
          packages like Asyncio, and Aiohttp in Python.
        </p>
        <p>
          In this position, I use version control – Git/GitHub, and work with
          tools like React, Node, MongoDB, and PostgreSQL.
        </p>
      </Section>
      <Section>
        <h5>
          <strong>Crosspoint Evaluations</strong>
        </h5>
        <h6>June 2019 - January 2020 // Marketing Operations Manager</h6>
        <p>
          In this position, I lead and enabled a team of three sales associates,
          crafted business development campaigns, managed our sales pipeline
          using Pipedrive, conducted competitive analysis, tracked key
          performance indicators, and promoted our services through direct
          marketing channels.
        </p>
        <p>
          I often worked with tools such as Google Analytics, Google Search
          Console, Yesware, CRMs, and refined my skills in SEO, HTML5, CSS3, and
          email marketing.
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

const clicks = e => ({
  type: ON_CLICKS,
  payload: { _id: uuidv4(), element: e.type }
});

const mapDispatchToProps = dipatch => {
  return {
    clicks: e => dipatch(clicks(e)),
    onFetch: onFetch
  };
};

const mapStateToProps = state => ({
  typicode: state.typicode
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
