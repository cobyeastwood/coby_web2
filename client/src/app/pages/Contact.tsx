import React from 'react';
import { Helmet } from 'react-helmet';

import { Head, Section } from '../styles/component.styles';
import * as helm from '../json/content.json';

class Contact extends React.Component<{ data: { message: string } }, {}> {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Coby Eastwood: Contact</title>
          <meta name="description" content={helm.content} />
          <link rel="canonical" href="http://cobyeastwood.com/contact"></link>
        </Helmet>
        <Head>Welcome to my contact page</Head>
        <Section>
          <h1>Contact</h1>
          <br />
          <p>
            Thanks for stopping by! Think this website is cool? Explore my
            GitHub profile — <strong>cobyeast</strong>. Not cool? Something
            else, let me know! Feel free to contact me at{' '}
            <strong>cobyeastwood-&#64;-gmail.com</strong>.
          </p>
        </Section>
        {/* <Button type="button" className="btn btn-secondary">
          Learn More
        </Button> */}
      </React.Fragment>
    );
  }
}

export default Contact;
