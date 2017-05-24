import React from 'react';
import {findDOMNode} from 'react-dom';
import { shallow, mount } from 'enzyme';
import chai from 'chai';
import TestUtils from 'react-addons-test-utils';
import  user  from '../reducers/user';
import  Login  from '../Login';
import  LoginForm  from '../LoginForm';
import  TaskFormModalPopup   from '../TaskFormModalPopup';
import  Modal   from '../TaskFormModalPopup';
import  TaskForm  from '../TaskForm';
import  TaskPage  from '../TasksPage';
import TasksList from '../TasksList';
import sinon from 'sinon';
//import moment from 'moment';
import store from '../store/createStore';

chai.config.includeStack = true;
global.chai = chai;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.expect = chai.expect;
global.assert = chai.assert;
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

export const LOGOUT = 'LOGOUT';
export function logout() {
   return {
      type: LOGOUT
   }
}

describe('\n Login-AddTask-ViewTask \n ', () => {
  let taskTitle = "Get milk"
  let wrapperData;
  let wrapperTaskForm
  let wrapperTaskFormModalPopup;
  let wrapperTaskPage;
  const loginHandleSubmit = sinon.spy();
  const login = sinon.spy();
  const login1 = sinon.spy();
  const savetask = sinon.spy();
  const logoutUser = sinon.spy();
  const email = "john@gmail.com"
  const password = "john123"

  before(function() {
    
    wrapperData = mount(<Login login={login} store={store}/>)
    // wrapperTaskForm =  mount(<TaskForm savetask={savetask}  />)
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
    it('Login successfull', function(done) {
      // if(!store.getState().user.isAuthenticated)
       wrapperData.find('.loginbtn').simulate('click')
       setTimeout(function () {
         const state = store.getState();
         if(state.user)
          expect(state.user.isAuthenticated).to.equal(true)
        else
          expect(true).to.equal(false)
         done();
       }, 20);
    });

    it('Add user auth token to local storage', () => {
      const stateUser = JSON.stringify(store.getState().user);
      const spy = sinon.spy(global.window.localStorage, "setItem");
      spy(stateUser);
      expect(spy.calledWith( {
        stateUser
      }));
      spy.restore();
      
    });
  });


  describe('\n   Add task \n' , () => {
    it('Open New task window', function(done) {
      wrapperTaskFormModalPopup = mount(<TaskFormModalPopup savetask={savetask} store={store}  />)
      done();
    });
    it('Open modal popup', function() {
        wrapperTaskFormModalPopup.find('.modalBtn').simulate('click')
        
    });
    it('Add title - ' + taskTitle, () => {
        wrapperTaskFormModalPopup.find(TaskForm).find('.title').simulate('change', {target: {value: taskTitle}});
        expect(wrapperTaskFormModalPopup.find('input').find('.title').prop('value')).to.not.equal(null);
    });
    it('Add start date', () => {
        wrapperTaskFormModalPopup.find(TaskForm).find('.startDate').simulate('change', {target: {value: '2017-05-15T06:03:08.492Z'}});
        expect(wrapperTaskFormModalPopup.find('input').find('.startDate').prop('value')).to.not.equal(null);
    });
    it('Add due date', () => {
        wrapperTaskFormModalPopup.find(TaskForm).find('.dueDate').simulate('change', {target: {value: '2017-05-15T06:03:08.492Z'}});
        expect(wrapperTaskFormModalPopup.find('input').find('.startDate').prop('value')).to.not.equal(null);
    });
    it('Add task description', () => {
        wrapperTaskFormModalPopup.find(TaskForm).find('.taskContent').simulate('change', {target: {value: 'tt'}});
        expect(wrapperTaskFormModalPopup.find('input').find('.taskContent').prop('value')).to.not.equal(null);
    });
      it('Add task status', () => {
        wrapperTaskFormModalPopup.find(TaskForm).find('.status').simulate('change', {target: {value: 'inprogress'}});
        expect(wrapperTaskFormModalPopup.find('select.status').find('option')).to.not.equal(null);
    });
    it('Add task category', () => {
        wrapperTaskFormModalPopup.find(TaskForm).find('.category').simulate('change', {target: {value: 'food_drink'}});
        expect(wrapperTaskFormModalPopup.find('select.category').find('option')).to.not.equal(null);
    });
    it('Click to add task and Close modal popup', function(done){
        wrapperTaskFormModalPopup.find(TaskForm).find('.saveTaskBtn').simulate('click')
        done();
    });
  });

  describe('\n   View task \n', () =>  {
      it('Displaying all tasks', function(done) {
        this.timeout(150);
        const fetchtasks =  sinon.spy();
        const deletetask = sinon.spy();
        wrapperTaskPage = mount(<TaskPage fetchtasks={fetchtasks} deletetask={deletetask} store={store}  />)
        setTimeout(function () {
          expect(wrapperTaskPage.find(TasksList).html()).to.not.equal("<div><p>There are no tasks yet in your collection.</p></div>");
          done();
        }, 30);
      });
      it('Displayed task - '+ taskTitle, function(done) {
        this.timeout(150);
        setTimeout(function () {
          let titleExists
          const texts = wrapperTaskPage.find(TasksList).find(".panel-heading").map(node => titleExists = node.text() === taskTitle ? true : false );
          expect(titleExists).to.equal(true);
          done();
        }, 40);
      });
  });

  after(function(done) {
    store.dispatch(logout())
    done();
  });
});
