import ReactGA from 'react-ga';

import { once } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export const initGA = once(() =>
  (function () {
    function getCookie(name) {
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length).replace('=', '');
        }
      }
      return undefined;
    }

    function setCookie(name, value, days) {
      let expires = '';
      if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
      }
      document.cookie = name + '=' + (value || '') + expires + '; path=/';
    }

    const gaUserId = getCookie('_ga-id');
    const gaId = 'UA-166891711-4';

    if (gaUserId === undefined) {
      const uuId = uuidv4();
      setCookie('_ga-id', uuId, 360);
      ReactGA.initialize(gaId, {
        debug: false,
        userId: uuId,
      });
    } else {
      ReactGA.initialize(gaId, {
        debug: false,
        userId: gaUserId,
      });
    }
  })()
);

export const change = (window) => {
  ReactGA.pageview(window.location.pathname);
};

let _id = 0;

export const events = (e) => {
  ReactGA.event({
    category: 'Statistics',
    action: 'Button Click',
    label: e.target,
    value: _id++,
  });
};
