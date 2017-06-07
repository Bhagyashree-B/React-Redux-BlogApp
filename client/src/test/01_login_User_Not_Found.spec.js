import React from 'react';
// import {findDOMNode} from 'react-dom';
import { mount } from 'enzyme';
import chai from 'chai';
// import TestUtils from 'react-addons-test-utils';
// import configureMockStore  from 'redux-mock-store';
// import  user  from '../reducers/user';
import  Login  from '../Login';
import  LoginForm  from '../LoginForm';
// import  TaskFormModalPopup   from '../TaskFormModalPopup';
// import  Modal   from '../TaskFormModalPopup';
// import  TaskForm  from '../TaskForm';
// import  TaskPage  from '../TasksPage';
// import TasksList from '../TasksList';
import sinon from 'sinon';
// import thunk from 'redux-thunk'
// import moment from 'moment';
import store from '../store/createStore';
// const middlewares = [ thunk ]
// const mockStore = configureMockStore(middlewares)
// chai.config.includeStack = true;
// global.chai = chai;
// global.AssertionError = chai.AssertionError;
// global.Assertion = chai.Assertion;
// global.expect = chai.expect;
// global.assert = chai.assert;
// const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

/**
  Test includes checks for correct and incorrect user name
**/

describe('\n Login-User-Not-Found \n ', () => {
  let wrapperData;
  // let wrapperTaskForm
  // let wrapperTaskFormModalPopup;
  // let wrapperTaskPage;
  // const loginHandleSubmit = sinon.spy();
  const login = sinon.spy();
  // const login1 = sinon.spy();
  // const savetask = sinon.spy();
  const email = "john1@gmail.com"
  const password = "john123"

  before(function() {
    // runs before all tests in this block
    wrapperData = mount(<Login login={login} store={store}/>)
  });

  describe('\n   Login \n', () => {
    it('Add email - '+email, () => {
        wrapperData.find(LoginForm).find('.email').simulate('change', {target: {value: email}});
        expect(wrapperData.find('input').find('.email').prop('value')).to.equal(email);
    });
    it('Add password - '+password, () => {
        wrapperData.find(LoginForm).find('.password').simulate('change', {target: {value: password}});
        expect(wrapperData.find('input').find('.password').prop('value')).to.equal(password);
    });
    it('Click on login', function(done) {
      wrapperData.find('.loginbtn').simulate('click')
      let unsubscribe = store.subscribe(handleChange)
      function handleChange() {
        unsubscribe()
        done();
      }
    });

    it('Check if : Authentication failed. User not found.', function() {
      expect(wrapperData.find("div.alert-danger").find(".error-message").html())
        .to.equal('<span class="error-message">Authentication failed. User not found.</span>')
    });
  });

  after(function(done) {
    wrapperData.unmount();
    done();
  });
})
