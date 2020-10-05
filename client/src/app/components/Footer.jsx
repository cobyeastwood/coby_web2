import React, { useState, useEffect } from 'react';
import { Span } from '../styles/component.styles';
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
  const [quote, setQuote] = useState([]);

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
          <label className="btn btn-secondary">
            <A
              className="text-reset text-decoration-none"
              href="https://www.linkedin.com/in/coby-eastwood-196b12152/"
            >
              LinkedIn
            </A>
          </label>
          <label className="btn btn-secondary">
            <A
              className="text-reset text-decoration-none"
              href="https://github.com/cobyeast"
            >
              Github
            </A>
          </label>
          <label className="btn btn-secondary">
            <A
              className="text-reset text-decoration-none"
              href="https://twitter.com/cobyeastwood"
            >
              Twitter
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
