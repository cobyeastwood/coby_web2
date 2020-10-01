import React from 'react';

class Contact extends React.Component<{ data: { message: string } }, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Welcome to my contact page</h1>
        <p>/contact</p>
        <p>{this.props.data.message}</p>
      </div>
    );
  }
}

export default Contact;
