import React, { useState, useEffect } from 'react';
import { Span } from '../styles/component.styles';
import * as backup from '../on_fails/data.json';
import styled from 'styled-components';

const axios = require('axios').default;

const Div = styled.div`
  margin-top: 10rem;
`;

const P = styled.p`
  font-size: 16px;
`;

const A = styled.a``;

const Footer = () => {
  const [active, setActive] = useState(null);
  const [quote, setQuote] = useState([backup[1]]);

  useEffect(() => {
    async function axiosGet() {
      const { data } = await axios.get('http://localhost:8080/api/quote');
      setQuote([data]);
    }
    axiosGet();
  }, []);

  console.log(quote);

  return (
    <React.Fragment>
      <Span className="mx-auto">
        <div
          className="text-justify btn-group btn-group-toggle"
          data-toggle="buttons"
        >
          <label
            className={`btn btn-secondary ${
              active === 'LinkedIn' ? 'active' : null
            }`}
            onClick={() => setActive('LinkedIn')}
          >
            <A
              className="text-reset text-decoration-none"
              href="https://www.linkedin.com/in/coby-eastwood-196b12152/"
            >
              <i className="fab fa-linkedin-in" />
            </A>
          </label>
          <label
            className={`btn btn-secondary ${
              active === 'Github' ? 'active' : null
            }`}
            onClick={() => setActive('Github')}
          >
            <A
              className="text-reset text-decoration-none"
              href="https://github.com/cobyeast"
            >
              <i class="fab fa-github" />
            </A>
          </label>
          <label
            className={`btn btn-secondary ${
              active === 'Twitter' ? 'active' : null
            }`}
            onClick={() => setActive('Twitter')}
          >
            <A
              className="text-reset text-decoration-none"
              href="https://twitter.com/cobyeastwood"
            >
              <i class="fab fa-twitter" />
            </A>
          </label>
        </div>
      </Span>
      <Div className="card">
        <div className="card-header">Quote</div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            {quote.map((q) => (
              <React.Fragment>
                <P>{q.content}</P>
                <footer className="blockquote-footer">
                  <cite title={q.originator.name}>{q.originator.name}</cite>
                </footer>
              </React.Fragment>
            ))}
          </blockquote>
        </div>
      </Div>
    </React.Fragment>
  );
};

export default Footer;
