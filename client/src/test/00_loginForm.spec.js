import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import  Login  from '../LoginForm';
// import sinon from 'sinon';

/**

  Test includes checks for Login form is rend correctly with proper formats
  e.g email format(@ and .) and password (1 special character, at least 1
  small character and at least 1 capital character )

**/

describe('\n Login-Page-Validations \n ', function () {
var passwordData = "@123Password"
var emailData = "email@sss.cpm"
var badPasswordData = "john123"
var badEmailData = "johngmail.com"

 it('Page is rendered correctly', () => {
   const wrapper = shallow(<Login/>);
    expect(wrapper.type()).to.eql('div');
  });

 it('Username field exists', function () {
    const wrapper = shallow(<Login/>);
    expect(wrapper.find('input')).to.have.length(2);
  });

  it('Password field exists', function () {
    const wrapper = shallow(<Login/>);
    expect(wrapper.find('button')).to.have.length(1);
  });

  it('Check email format - '+ badEmailData, () => {
    const wrapper = shallow(<Login/>);
    wrapper.setState({ email : badEmailData });
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    expect(true).to.equal(re.test(wrapper.state().email));
  });


  it('Check password format - ' + badPasswordData, () => {
    const wrapper = shallow(<Login/>);
    wrapper.setState({ password : badPasswordData });
    expect(wrapper.state().password).to.equal(badPasswordData);
    expect(wrapper.state().password).to.be.defined;
    var re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
    expect(true).to.equal(re.test(wrapper.state().password));
  });

  it('Check email format - '+ emailData, () => {
    const wrapper = shallow(<Login/>);
    wrapper.setState({ email : emailData });
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    expect(true).to.equal(re.test(wrapper.state().email));
  });


  it('Check password format - ' + passwordData, () => {
    const wrapper = shallow(<Login/>);
    wrapper.setState({ password : passwordData });
    expect(wrapper.state().password).to.equal(passwordData);
    expect(wrapper.state().password).to.be.defined;
    var re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/

    expect(true).to.equal(re.test(wrapper.state().password));
  });
});
