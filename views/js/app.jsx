class Other extends React.Component {
  render() {
    return <h1>Hi!</h1>;
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Hello World!</h1>
        <Other />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
