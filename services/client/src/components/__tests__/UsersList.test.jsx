import React from 'react';
import { shallow } from 'enzyme';

import UsersList from '../UsersList';

const users = [
  {
    'active': true,
    'email': 'joseph.diku@testdriven-app.org',
    'id': 1,
    'username': 'dikuj'
  },
  {
    'active': true,
    'email': 'martin.matovu@testdriven-app.org',
    'id': 2,
    'username': 'matovum'
  }
];

test('UsersList renders properly', () => {
  const wrapper = shallow(<UsersList users={users}/>);
  const element = wrapper.find('h4');
  expect(element.length).toBe(2);
  expect(element.get(0).props.children).toBe('dikuj');
});