import React from "react";
import { shallow } from 'enzyme';
import { PublicHeader } from '../../components/PublicHeader';

test('should match snapshot', () => {

  const wrapper = shallow(<PublicHeader startLogin={() => { }} />);
  expect(wrapper).toMatchSnapshot();
})


test('should should call login when login is clicked', () => {
  const startLogin = jest.fn();
  const wrapper = shallow(<PublicHeader startLogin={startLogin} />);

  wrapper.find('.button--login').simulate('click');
  expect(startLogin).toHaveBeenCalled();
})
