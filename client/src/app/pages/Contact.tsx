import React from 'react';
import styled from 'styled-components';
import Button from '../components/Button';

const Head = styled.h2`
  margin: 2.5rem;
  text-align: center;
`;

const P = styled.p`
  margin: 1rem;
  text-align: center;
`;

class Contact extends React.Component<{ data: { message: string } }, {}> {
  render() {
    return (
      <div>
        <Head>Welcome to my contact page</Head>
        <P>/contact</P>
        <P>{this.props.data.message}</P>
        {/* <Button type="button" className="btn btn-secondary">
          Learn More
        </Button> */}
      </div>
    );
  }
}

export default Contact;
