//react-test-renderer
import React from "react";
import { shallow } from 'enzyme';
import { Header } from "../../components/Header";
import userData from '../fixtures/userData';
//snapshot
test('should render header correctly', () => {
  const wrapper = shallow(<Header startLogout={() => { }} user={userData} />);
  expect(wrapper).toMatchSnapshot();
});

test('should call startLogout on button click', () => {
  const startLogout = jest.fn();
  const wrapper = shallow(<Header startLogout={startLogout} user={userData} />);

  wrapper.find('.dropdown--link').prop('onSelect')('logout');
  expect(startLogout).toHaveBeenCalled();
});