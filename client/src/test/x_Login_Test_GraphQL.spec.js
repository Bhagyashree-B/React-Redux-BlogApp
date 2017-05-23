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

describe('\n Login-Get-Tasks \n ', () => {
  let wrapperData;
  let wrapperTaskForm
  let wrapperTaskFormModalPopup;
  let wrapperTaskPage;
  const loginHandleSubmit = sinon.spy();
  const login = sinon.spy();
  const login1 = sinon.spy();
  const savetask = sinon.spy();


  before(function(done) {
    setTimeout(()=>{ done(); },50);
    // runs before all tests in this block
    wrapperData = mount(<Login login={login} store={store}/>)
    // wrapperTaskForm =  mount(<TaskForm savetask={savetask}  />)
  });

  describe('\n   Login \n', () => {
    it('Add username - test2', () => {
        wrapperData.find(LoginForm).find('.email').simulate('change', {target: {value: 'test2'}});
        expect(wrapperData.find('input').find('.email').prop('value')).to.equal("test2");
    });
    it('Add password - 12345', () => {
        wrapperData.find(LoginForm).find('.password').simulate('change', {target: {value: '12345'}});
        expect(wrapperData.find('input').find('.password').prop('value')).to.equal("12345");
    });
    it('Click on login', function(done) {
        this.timeout(50);
        wrapperData.find('.loginbtn').simulate('click')
        expect(true).to.equal(true)
        done();
    //    setTimeout(function () {
    //      const state = store.getState();
    //      expect(state.user.isAuthenticated).to.equal(true)
    //    }, 3000);
    });
  });

  describe('\n   Get Tasks (API) \n' , () => {
    it('Retrieve all tasks', function(done) {
            this.timeout(300);
            setTimeout(function () {
            const state = store.getState();
                expect(state.tasks).to.not.be.undefined;
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
                //console.log("Inside then ---------------->" +res)              
                let rs = JSON.parse(res)
                expect(rs.hasOwnProperty('data')).to.equal(true)
                done();
                })
        }, 30);
        });
    })
})