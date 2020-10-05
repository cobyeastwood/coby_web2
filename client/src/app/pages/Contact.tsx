import React from 'react';

import { Head, P } from '../styles/component.styles';

class Contact extends React.Component<{ data: { message: string } }, {}> {
  render() {
    return (
      <React.Fragment>
        <Head>Welcome to my contact page</Head>
        <P>/contact</P>
        <P>{this.props.data.message}</P>
        {/* <Button type="button" className="btn btn-secondary">
          Learn More
        </Button> */}
      </React.Fragment>
    );
  }
}

export default Contact;
