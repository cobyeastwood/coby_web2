import React from 'react';
import { Head, P } from '../styles/component.styles';

class NotFound extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Head>404 - Not Found</Head>
        <P>Sorry, this page was not found.</P>
      </React.Fragment>
    );
  }
}

export default NotFound;
