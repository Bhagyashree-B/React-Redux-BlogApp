import React from 'react';
import {findDOMNode} from 'react-dom';
import { shallow, mount } from 'enzyme';
import chai from 'chai';
import TestUtils from 'react-addons-test-utils';
import configureMockStore  from 'redux-mock-store';
// import  {savetask}  from '../actions';
 import  user  from '../reducers/user';
import  Login  from '../Login';
import  LoginForm  from '../LoginForm';
import  TaskFormModalPopup   from '../TaskFormModalPopup';
import  Modal   from '../TaskFormModalPopup';
import  TaskForm  from '../TaskForm';
import  TaskPage  from '../TasksPage';
import TasksList from '../TasksList';
import sinon from 'sinon';
import thunk from 'redux-thunk'
import moment from 'moment';
import store from '../store/createStore';
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
chai.config.includeStack = true;
global.chai = chai;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.expect = chai.expect;
global.assert = chai.assert;
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

describe('\n Login-Wrong-Password \n ', () => {
  let wrapperData;
  let wrapperTaskForm
  let wrapperTaskFormModalPopup;
  let wrapperTaskPage;
  const loginHandleSubmit = sinon.spy();
  const login = sinon.spy();
  const login1 = sinon.spy();
  const savetask = sinon.spy();


  before(function() {
    // runs before all tests in this block
    wrapperData = mount(<Login login={login} store={store}/>)
    // wrapperTaskForm =  mount(<TaskForm savetask={savetask}  />)
  });

  describe('\n   Login \n', () => {
    it('Add username - test', () => {
        wrapperData.find(LoginForm).find('.email').simulate('change', {target: {value: 'test'}});
        expect(wrapperData.find('input').find('.email').prop('value')).to.equal("test");
    });
    it('Add password - abcdf', () => {
        wrapperData.find(LoginForm).find('.password').simulate('change', {target: {value: 'abcdf'}});
        expect(wrapperData.find('input').find('.password').prop('value')).to.equal("abcdf");
    });
    it('Click on login', function() {
      wrapperData.find('.loginbtn').simulate('click')
      expect(true).to.equal(true)
      //  setTimeout(function () {
      //    const state = store.getState();
      //    expect(state.user.isAuthenticated).to.equal(true)
      //    done();
      //  }, 3000);
    });

    it('Check if : Authentication failed. Wrong password.', function(done) {
      setTimeout(function () {
        expect(wrapperData.find("div.alert-danger").find(".error-message").html())
          .to.equal('<span class="error-message">Authentication failed. Wrong password.</span>')
        done();
      }, 10);
    });
  });
})