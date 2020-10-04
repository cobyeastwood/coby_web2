import React from 'react';
import Button from '../components/Button';

class Contact extends React.Component<{ data: { message: string } }, {}> {
  render() {
    return (
      <div>
        <h1>Welcome to my contact page</h1>
        <p>/contact</p>
        <p>{this.props.data.message}</p>
        <Button type="button" className="btn btn-secondary">
          Learn More
        </Button>
      </div>
    );
  }
}

export default Contact;
