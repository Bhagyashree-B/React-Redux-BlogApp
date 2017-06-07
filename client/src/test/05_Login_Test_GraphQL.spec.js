import React from 'react';
import {findDOMNode} from 'react-dom';
import { shallow, mount } from 'enzyme';
import chai from 'chai';
import TestUtils from 'react-addons-test-utils';
import configureMockStore  from 'redux-mock-store';
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


/**
  Includes API testing for login and get task
**/

describe('\n Login-Get-Tasks (API) \n ', () => {
  let wrapperData;
  let wrapperTaskForm
  let wrapperTaskFormModalPopup;
  let wrapperTaskPage;
  const loginHandleSubmit = sinon.spy();
  const login = sinon.spy();
  const login1 = sinon.spy();
  const savetask = sinon.spy();
  const email = "john@gmail.com"
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
    it('Login successfull', function(done) {
      const state = store.getState();
      expect(state.user.isAuthenticated).to.be.true
      if(state.user.isAuthenticated)
        done();
    });
  });

  describe('\n   Get Tasks (API) \n' , () => {
    it('Retrieve all tasks', function(done) {
        const state = store.getState();
        let user = state.user
        // let payload = '{ tasks( userId : "'+ user._id +'") { id, userId, status, title, category, startDate , dueDate , taskContent}}'
        let payload = '{ chartByCategory( userId : "'+ user._id +'", statusValue : "inprogress" ) { dataBycategory { total, data {status, count} } , allData { count, userName} } }'
        new Promise(function(resolve, reject) {
          let request= new XMLHttpRequest();
          request.open("POST", "http://localhost:8080/graphql?query="+payload, true);
          request.setRequestHeader("Content-Type", "application/graphql");
          if(user && user.token)
              request.setRequestHeader("x-access-token", user.token);
          request.send(payload);
          request.onreadystatechange = () => {
              if (request.readyState === 4) {
              resolve(request.responseText)
              }
          }
        }).then(res => {
          let rs = JSON.parse(res)
          expect(rs.hasOwnProperty('data')).to.equal(true)
          done();
        }).catch(err=>{
          done(err);
        })
      });
    })

  after(function(done) {
    wrapperData.unmount();
    done();
  });
})
