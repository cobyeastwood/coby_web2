import React from 'react';
import { render } from '@testing-library/react';
import About from './app/pages/About';

const props = { data: { message: 'hello' } };

test('renders learn react link', () => {
  render(<About {...props} />);
});
