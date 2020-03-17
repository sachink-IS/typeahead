import React from 'react';
import Typeahead from '../components/Typeahead/Typeahead';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

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

describe("<Typeahead url = 'https://states.sachinkis.repl.co/'/>", function(){
  const wrapper = mount(
    <Typeahead
      url = 'https://states.sachinkis.repl.co/'
    />
  );
  let inputBox = wrapper.find("input[type='text']");

  it("should render input box", function () {
    expect(inputBox).toHaveLength(1);
  });

  it("should not render any dropdown items", function(){
    let dropdown = wrapper.find('.stateDom');
    expect(dropdown).toHaveLength(0);
  });
})