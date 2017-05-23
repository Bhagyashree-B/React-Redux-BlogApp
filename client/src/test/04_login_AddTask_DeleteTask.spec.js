import React from 'react';
import {findDOMNode} from 'react-dom';
import { shallow, mount } from 'enzyme';
import chai from 'chai';
import TestUtils from 'react-addons-test-utils';
import configureMockStore  from 'redux-mock-store';
import glQuery from '../service/HttpGraphQl'
import  {taskDeleted, deletetask}  from '../actions';
import  user  from '../reducers/user';
import  Login  from '../Login';
import  App  from '../App';
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

export const LOGOUT = 'LOGOUT';
export function logout() {
   return {
      type: LOGOUT
   }
}

describe('\n Login-AddTask-DeleteTask \n ', () => {
  let wrapperData;
  let wrapperTaskForm
  let wrapperTaskFormModalPopup;
  let wrapperTaskPage;
  const loginHandleSubmit = sinon.spy();
  const login = sinon.spy();
  const savetask = sinon.spy();
  const logoutUser = sinon.spy();
  let userState;
  before(function(done) {
    setTimeout(()=>{ done(); },50);
    wrapperData = mount(<Login login={login} store={store}/>)
  });

  describe('\n   Login \n', () => {
    it('Add username', () => {
        wrapperData.find(LoginForm).find('.email').simulate('change', {target: {value: 'test'}});
        expect(wrapperData.find('input').find('.email').prop('value')).to.equal("test");
    });
    it('Add password', () => {
        wrapperData.find(LoginForm).find('.password').simulate('change', {target: {value: '12345'}});
        expect(wrapperData.find('input').find('.password').prop('value')).to.equal("12345");
    });
    it('Login successfull', function(done) {
      this.timeout(100);
      wrapperData.find('.loginbtn').simulate('click')
       setTimeout(function () {
         const state = store.getState();
         expect(state.user.isAuthenticated).to.equal(true)
         done();
       }, 30);
    });
    it('Add user auth token to local storage', () => {
      const stateUser = JSON.stringify(store.getState().user);
      const spy = sinon.spy(global.window.localStorage, "setItem");
      spy(stateUser);
      expect(spy.calledWith( {
        stateUser
      }));
      spy.restore();
      // const stub = sinon.stub(global.window.localStorage, 'getItem');
      // stub(stateUser);
      // expect(stub.calledWith(Object.keys(stateUser)));
      // stub.restore();
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
    it('Add title - Get some cookies', () => {
        wrapperTaskFormModalPopup.find(TaskForm).find('.title').simulate('change', {target: {value: 'Get some cookies'}});
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
        wrapperTaskFormModalPopup.find(TaskForm).find('.taskContent').simulate('change', {target: {value: 'milk'}});
        expect(wrapperTaskFormModalPopup.find('input').find('.taskContent').prop('value')).to.not.equal(null);
    });
    it('Add task status', () => {
        wrapperTaskFormModalPopup.find(TaskForm).find('.status').simulate('change', {target: {value: 'inprogress'}});
        expect(wrapperTaskFormModalPopup.find('select.status').find('option')).to.not.equal(null);
    });
    it('Add task category', () => {
        wrapperTaskFormModalPopup.find(TaskForm).find('.category').simulate('change', {target: {value: 'high'}});
        expect(wrapperTaskFormModalPopup.find('select.category').find('option')).to.not.equal(null);
    });
    it('Click to add task and Close modal popup', function(done){
      userState = store.getState().user;
      wrapperTaskFormModalPopup.find(TaskForm).find('.saveTaskBtn').simulate('click')
      done();
    });
  });

    describe('\n   Delete task \n', () =>  {
      it('Delete task - Get some cookies', function(done) {
          const fetchtasks =  sinon.spy();
          const deletetask = sinon.stub();
          wrapperTaskPage = mount(<TaskPage fetchtasks={fetchtasks} deletetask={deletetask} store={store}  />)
          setTimeout(function () {
            let {tasks} = store.getState()
            wrapperTaskPage.find('button.deleteTask').last().simulate('click')
            setTimeout(function () {
              const tasksLength = store.getState().tasks
              expect(tasks.length).to.equal(tasksLength.length + 1)
              done();
            }, 80);
        }, 80);
      });
    });

    // after(function(done) {
    //   store.dispatch(logout())
    //   // wrapperData.unmount();
    //   // wrapperTaskFormModalPopup.unmount();
    //   // wrapperTaskPage.unmount();
    //   console.log("after all------------------")
    //   done();
    // });
});
