import React from 'react';
import Dropdown from '../components/DropDown/DropDown';
import renderer from 'react-test-renderer';
import states from '../components/mock-data/states';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

it('Typeahead component gets rendered ', () => {
  const component = renderer.create(
    <Dropdown
      states={states}
      searchText=""
      selectState={jest.fn()}
      hideDropDown={false}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

describe("<Dropdown hideDropDown={true} />", function () {
  const wrapper = shallow(
    <Dropdown
      states={states}
      searchText=""
      selectState={jest.fn()}
      hideDropDown={true}
    />
  );

  it("should not render dropdown as it is hided (from props)", function () {
    let obj = wrapper.find(".stateDom");
    expect(obj).toHaveLength(0);
  });
});

describe("<Dropdown hideDropDown={false}  />", function () {
  const selectStateCallback = jest.fn();
  const wrapper = shallow(
    <Dropdown
      states={states}
      searchText=""
      selectState={selectStateCallback}
      hideDropDown={false}
    />
  );

  it("should render 8 dropdown items", function () {
    let obj = wrapper.find(".stateDom");
    expect(obj).toHaveLength(8);
  });

  it("should call the selectState() on click", function(){
    let obj = wrapper.find(".stateDom");
    obj.at(0).simulate('click');
    expect(selectStateCallback).toHaveBeenCalled();
  });
});


/**
 * test case required in case of second approach 
 
describe("<Dropdown hideDropDown={false} searchText='Ala'  />", function () {
  const selectStateCallback = jest.fn();
  const wrapper = shallow(
    <Dropdown
      states={states}
      searchText="Ala"
      selectState={selectStateCallback}
      hideDropDown={false}
    />
  );
  
  it("should render only 2 dropdown items", function () {
    let obj = wrapper.find(".stateDom");
    expect(obj).toHaveLength(2);
  });

});
*/