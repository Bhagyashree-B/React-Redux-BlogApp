import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import LoginForm from '../LoginForm';
//import App from '../App';
import sinon from 'sinon';

const wrapper = shallow(<LoginForm />)
//const wrapper_app = shallow(<App />)
const wrapper_mount = mount(<LoginForm />)

describe('Login Test', () => {
  it('should have email and password field', () => {
    expect(wrapper.find('[className="form-control"]')).to.have.length(2);
  });

  it('set email', () => {
    wrapper_mount.setState({ email: 'ravinagar@afourtech.com' });
	expect(wrapper_mount.state().email).to.equal('ravinagar@afourtech.com')
  });

  it('set password', () => {
    wrapper_mount.setState({ password: 'testuser' });
	expect(wrapper_mount.state().password).to.equal('testuser')
  });

  it('click login', () => {
    wrapper_mount.find('button').simulate('click');
	//expect(wrapper_app.find('[className="navbar-brand"]')).to.have.length(3);
  });
});
