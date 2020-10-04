import React, { PureComponent } from 'react';

import styled from 'styled-components';

const Div = styled.div`
  margin-top: 17.5rem;
`;

export class Footer extends PureComponent {
  render() {
    return (
      <Div className="card">
        <div className="card-header">Quote</div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              posuere erat a ante.
            </p>
            <footer className="blockquote-footer">
              Someone famous in <cite title="Source Title">Source Title</cite>
            </footer>
          </blockquote>
        </div>
      </Div>
    );
  }
}

export default Footer;
