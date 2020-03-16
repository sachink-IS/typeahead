import React from 'react';
import Typeahead from '../components/Typeahead/Typeahead';
import renderer from 'react-test-renderer';

it('Typeahead component gets rendered ', () => {
  const component = renderer.create(
    <Typeahead
      width = "200px"
      margin = "10px"
      url = 'https://states.sachinkis.repl.co/'
    />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

