import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import  Login  from '../LoginForm';
import sinon from 'sinon';

describe('\n Login-Page-Validations \n ', function () {

var passwordData = "@123Password"
var emailData = "email@sss.cpm"
var badPasswordData = "1"
var badEmailData = "1"

 it('Page is rendered correctly', () => {
   const wrapper = shallow(<Login/>);
    expect(wrapper.type()).to.eql('div');
  });

 it('Should have an input for  email and password', function () {
    const wrapper = shallow(<Login/>);
    expect(wrapper.find('input')).to.have.length(2);
  });

  it('Should have an registration button for login users ', function () {
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
