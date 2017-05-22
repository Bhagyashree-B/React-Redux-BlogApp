import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import  Login  from '../LoginForm';
import sinon from 'sinon';

describe('Login-Page-Validations', function () {

var passwordData = "password"
var emailData = "email@sss.cpm"

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


 // it('should have props with an string input for email', () => {
 //    const wrapper = mount(<Login/>);
 //    wrapper.setProps({ email : emailData });
 //    expect(wrapper.props().email).to.be.defined;
 //    expect(wrapper.props().email).to.equal(emailData);
 //    });

   it('Entered email -'+ emailData, () => {
    const wrapper = shallow(<Login/>);
    wrapper.setState({ email : emailData });
    // expect(wrapper.state().email).to.equal(emailData);
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    expect(true).to.equal(re.test(wrapper.state().email));
  });

    // it('should have props with an string input for password', () => {
    // const wrapper = mount(<Login/>);
    // wrapper.setProps({ password : passwordData });
    // expect(wrapper.props().password).to.be.defined;
    // expect(wrapper.props().password).to.equal(passwordData);
    // });

    it('Entered password -' + passwordData, () => {
      const wrapper = shallow(<Login/>);
      wrapper.setState({ password : passwordData });
      expect(wrapper.state().password).to.equal(passwordData);
      // wrapper.setProps({ password : passwordData });
       expect(wrapper.state().password).to.be.defined;
       var re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
       var passwordRegex = wrapper.state().password;
       if (passwordRegex == '' || !re.test(passwordRegex))
       {
        expect(wrapper.state().password).to.equal(passwordData);
       }
      });

    // it('Clicked submit button', () => {
    // const wrapper = shallow(<Login login={sinon.spy()}/>);
    //    wrapper.find('.loginbtn').simulate('click');
    //   //  wrapper.setState({ email : emailData });
    //   //  wrapper.setState({ password : passwordData });
    //   // expect(wrapper.state().password).to.equal(passwordData);
    //   // expect(wrapper.state().email).to.equal(emailData);
    // });
});
