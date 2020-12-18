import React, { useState, useEffect } from 'react';
import { Span } from '../styles/component.styles';
import { events } from '../utility/analytics';

import * as backup from '../json/data.json';
import styled from 'styled-components';

const axios = require('axios').default;

const Div = styled.div`
  margin-top: 10rem;
`;

const P = styled.p`
  font-size: 16px;
`;

const A = styled.a`
  font-size: 16px;
`;

const Footer = () => {
  const [active, setActive] = useState(null);
  const [quote, setQuote] = useState([backup[1]]);

  useEffect(() => {
    async function axiosGet() {
      try {
        const { status, data } = await axios.get('/api/v1/quote');
        if (status === 200 && data && data.id) {
          setQuote([data]);
        }
      } catch (err) {}
    }
    axiosGet();
  }, []);

  return (
    <React.Fragment>
      <Span className='mx-auto'>
        <div
          className='text-justify btn-group btn-group-toggle'
          data-toggle='buttons'
        >
          <label
            className={`btn btn-secondary ${
              active === 'LinkedIn' ? 'active' : null
            }`}
            onClick={e => {
              setActive('LinkedIn');
              events(e);
            }}
          >
            <A
              className='text-reset text-decoration-none'
              href='https://www.linkedin.com/in/coby-eastwood-196b12152/'
            >
              <i className='fab fa-linkedin-in' />
            </A>
          </label>
          <label
            className={`btn btn-secondary ${
              active === 'Github' ? 'active' : null
            }`}
            onClick={e => {
              setActive('Github');
              events(e);
            }}
          >
            <A
              className='text-reset text-decoration-none'
              href='https://github.com/cobyeastwood'
            >
              <i className='fab fa-github' />
            </A>
          </label>
          <label
            className={`btn btn-secondary ${
              active === 'Twitter' ? 'active' : null
            }`}
            onClick={e => {
              setActive('Twitter');
              events(e);
            }}
          >
            <A
              className='text-reset text-decoration-none'
              href='https://twitter.com/cobyeastwood'
            >
              <i className='fab fa-twitter' />
            </A>
          </label>
        </div>
      </Span>
      <Div className='card'>
        <div className='card-header'>Quote</div>
        <div className='card-body'>
          <blockquote className='blockquote mb-0'>
            {quote
              ? quote.map((q, i) => (
                  <React.Fragment key={i++}>
                    <P key={i++}>{q.content || ''}</P>
                    <footer key={i++} className='blockquote-footer'>
                      <cite
                        key={i++}
                        title={q.originator.name ? q.originator.name : ''}
                      >
                        {q.originator.name ? q.originator.name : ''}
                      </cite>
                    </footer>
                  </React.Fragment>
                ))
              : null}
          </blockquote>
        </div>
      </Div>
    </React.Fragment>
  );
};

export default Footer;
