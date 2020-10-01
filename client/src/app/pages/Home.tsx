import React from 'react';

class Home extends React.Component<{ data: { message: string } }, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Welcome to my home page</h1>
        <p>/home</p>
        <p>{this.props.data.message}</p>
      </div>
    );
  }
}

export default Home;
