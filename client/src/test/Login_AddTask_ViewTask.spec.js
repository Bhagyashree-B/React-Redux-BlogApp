import React from 'react';
import {findDOMNode} from 'react-dom';
import { shallow, mount } from 'enzyme';
import chai from 'chai';
import TestUtils from 'react-addons-test-utils';
import configureMockStore  from 'redux-mock-store';
import  {savetask}  from '../actions';
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
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
chai.config.includeStack = true;
global.chai = chai;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.expect = chai.expect;
global.assert = chai.assert;


describe('\n Login-AddTask-ViewTask \n ', () => {
  let wrapperData;
  let wrapperTaskForm
  let wrapperTaskFormModalPopup;
  let wrapperTaskPage;
  const login = sinon.spy();
  const savetask = sinon.spy();
  const tasks = {
	"tasks": [{
		"_id": "59006deb5390dc1df4fe6d01",
		"title": "tashdjksak",
		"taskContent": "asdhjakshdjka"
	}, {
		"_id": "5903321518552a35c81c0db4",
		"title": "test",
		"taskContent": "test desc"
	}, {
		"_id": "5911c21e5a8f731ee8b47cd2",
		"title": "Title from test",
		"taskContent": "description from test "
	}]
};
  const fetchtasks =  sinon.spy(TaskPage.prototype, 'componentDidMount');
  const deletetask = sinon.spy();


  before(function() {
    // runs before all tests in this block
    wrapperData = mount(<Login login={login} store={mockStore({})} />)
    wrapperTaskForm =  mount(<TaskForm savetask={savetask}  />)
    wrapperTaskFormModalPopup = mount(<TaskFormModalPopup savetask={savetask} store={mockStore({})}  />)
    wrapperTaskPage = mount(<TaskPage fetchtasks={fetchtasks} deletetask={deletetask} store={mockStore({})}  />)
  });

  describe('\n Login \n', () => {
    it('Add username', () => {
        wrapperData.find(LoginForm).find('.email').simulate('change', {target: {value: 'test'}});
    });
    it('Add password', () => {
        wrapperData.find(LoginForm).find('.password').simulate('change', {target: {value: '12345'}});
    });
    it('Click to login', () => {
        wrapperData.find(LoginForm).find('button').simulate('click')
    });
  });


  describe('\n Add task \n' , () => {
    it('Open modal popup', () => {
        // console.log(wrapperTaskFormModalPopup.debug());
        wrapperTaskFormModalPopup.find('.modalBtn').simulate('click')
    });
    it('Add title', () => {
        wrapperTaskFormModalPopup.find(TaskForm).find('.title').simulate('change', {target: {value: 'Title from test'}});
        //  expect(wrapperTaskForm.state().title).to.equal("foo");
    });
    it('Add task description', () => {
        wrapperTaskFormModalPopup.find(TaskForm).find('.taskContent').simulate('change', {target: {value: 'description from test '}});
        //  expect(wrapperTaskFormModalPopup.find(TaskForm).find('.taskContent').value()).to.equal("foo");
    });
    it.skip('Add start date', () => {
        console.log(moment().format('LLLL'));
        wrapperTaskForm.setState({ startDate: moment().format('LLLL') });
        expect(wrapperTaskForm.state().startDate).to.equal(moment().format('LLLL'));
    });
    it.skip('Add due date', () => {
        wrapperTaskForm.setState({ dueDate: "foo" });
        expect(wrapperTaskForm.state().dueDate).to.equal("foo");
    });
    it('Click to add task and Close modal popup', () => {
        wrapperTaskFormModalPopup.find(TaskForm).find('.saveTaskBtn').simulate('click')
        // wrapperTaskForm.find('button').simulate('click')
        // console.log(  wrapperTaskFormModalPopup.debug());
        // if(wrapperTaskForm.state().loading == true){
        //   console.log("In true");
        //   console.log(  wrapperTaskFormModalPopup.debug());
        //   // console.log(wrapperTaskFormModalPopup.instance().props)
        //   // var data = {"title":"title","taskContent":"description"}
        //   //  const op =  savetask(data).then(
        //   //   () => { },
        //   // );
        // }
        // else{
        //   console.log("In false");
        // }
     });
  })

  describe('\n View task \n', () => {
    it('Get data from database', () => {
        // expect(wrapperTaskPage.WrappedComponent).to.not.be.null
        expect(fetchtasks.calledOnce).to.equal(true);
    });
    it('Set data to props of Taskpage ', () => {
        wrapperTaskPage.setProps({ tasks: tasks });
        expect(wrapperTaskPage.props().tasks).to.equal(tasks);
    });
    it('Displaying tasks', () => {
        // console.log(wrapperTaskPage.find(TasksList).html());
        expect(wrapperTaskPage.find(TasksList).html()).to.not.equal("<div><p>There are no tasks yet in your collection.</p></div>");
    });
  });
});
