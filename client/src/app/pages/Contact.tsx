import React from 'react';
import { Helmet } from 'react-helmet';

import { Head, Section } from '../styles/component.styles';
import { change } from '../utility/analytics';
import * as helm from '../json/content.json';

class Contact extends React.Component<{ data: { message: string } }, {}> {
  componentDidMount() {
    if (window) {
      change(window);
    }
  }
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Coby Eastwood: Contact</title>
          <meta name="description" content={helm.content} />
          <link rel="canonical" href="https://cobyeastwood.com/contact"></link>
        </Helmet>
        <Head>Welcome to my contact</Head>
        <Section>
          <h1>Contact</h1>
          <br />
          <p>
            Thank you for stopping by! If you have time, feel free to explore some of my GitHub projects. Got something to share? Contact me via email {'  '} —
            <strong>cobyeastwood&#64;gmail.com</strong>.
          </p>
        </Section>
      </React.Fragment>
    );
  }
}

export default Contact;
