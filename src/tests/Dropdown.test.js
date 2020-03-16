import React from 'react';
import Dropdown from '../components/DropDown/DropDown';
import renderer from 'react-test-renderer';
import cities from '../components/mock-data/cities';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

it('Typeahead component gets rendered ', () => {
  const component = renderer.create(
    <Dropdown
      cities={cities}
      searchText=""
      selectCity={jest.fn()}
      hideDropDown={false}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

describe("<Dropdown hideDropDown={true} />", function () {
  const wrapper = shallow(
    <Dropdown
      cities={cities}
      searchText=""
      selectCity={jest.fn()}
      hideDropDown={true}
    />
  );

  it("should not render dropdown as it is hided (from props)", function () {
    let obj = wrapper.find(".cityDom");
    expect(obj).toHaveLength(0);
  });
});

describe("<Dropdown hideDropDown={false}  />", function () {
  const selectCityCallback = jest.fn();
  const wrapper = shallow(
    <Dropdown
      cities={cities}
      searchText=""
      selectCity={selectCityCallback}
      hideDropDown={false}
    />
  );

  it("should render 8 dropdown items", function () {
    let obj = wrapper.find(".cityDom");
    expect(obj).toHaveLength(8);
  });

  it("should call the selectCity() on click", function(){
    let obj = wrapper.find(".cityDom");
    obj.at(0).simulate('click');
    expect(selectCityCallback).toHaveBeenCalled();
  });
});


/**
 * test case required in case of second approach 
 
describe("<Dropdown hideDropDown={false} searchText='Ala'  />", function () {
  const selectCityCallback = jest.fn();
  const wrapper = shallow(
    <Dropdown
      cities={cities}
      searchText="Ala"
      selectCity={selectCityCallback}
      hideDropDown={false}
    />
  );
  
  it("should render only 2 dropdown items", function () {
    let obj = wrapper.find(".cityDom");
    expect(obj).toHaveLength(2);
  });

});
*/