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
            Thanks for stopping bye! Think this website is cool? Explore my
            GitHub profile — <strong>cobyeast</strong>. Not cool? Let me know!
            If you have any further questions or are just checking it out, feel
            free to contact me an email at{' '}
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
