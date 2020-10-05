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
            Grit is that 'extra something' that separates the most successful people from the rest. It's the passion, perseverance, and stamina that we must channel in order to stick with our dreams until they become a reality.
            </p>
            <footer className="blockquote-footer">
              <cite title="Travis Bradberry">Travis Bradberry</cite>
            </footer>
          </blockquote>
        </div>
      </Div>
    );
  }
}

export default Footer;
