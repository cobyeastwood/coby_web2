import React from 'react';

import { Head, P, Section } from '../styles/component.styles';

class Contact extends React.Component<{ data: { message: string } }, {}> {
  render() {
    return (
      <React.Fragment>
        <Head>Welcome to my contact page</Head>
        <P>/contact</P>
        <P>{this.props.data.message}</P>
        <Section>
          <h1>Contact</h1>
          <br />
          <p>
            Thank you for checking out my website! If you have any further
            questions or would like to check out more of my work feel free to
            explore my GitHub profile — <strong>cobyeast</strong>. Otherwise,
            you can email me at <strong>cobyeastwood-&#64;-gmail.com</strong>.
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
