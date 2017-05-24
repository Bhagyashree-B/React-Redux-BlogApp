// import React from 'react';
// import {findDOMNode} from 'react-dom';
// import { shallow, mount } from 'enzyme';
// import chai from 'chai';
// import TestUtils from 'react-addons-test-utils';
// import configureMockStore  from 'redux-mock-store';
// import  user  from '../reducers/user';
// import  Login  from '../Login';
// import  LoginForm  from '../LoginForm';
// import  TaskFormModalPopup   from '../TaskFormModalPopup';
// import  Dashboard from '../Dashboard';
// import  {dataBycategory , allData } from '../Dashboard';
// import  TaskForm  from '../TaskForm';
// import  TaskPage  from '../TasksPage';
// import TasksList from '../TasksList';
// import sinon from 'sinon';
// import thunk from 'redux-thunk'
// import moment from 'moment';
// import store from '../store/createStore';
// const middlewares = [ thunk ]
// const mockStore = configureMockStore(middlewares)
// chai.config.includeStack = true;
// global.chai = chai;
// global.AssertionError = chai.AssertionError;
// global.Assertion = chai.Assertion;
// global.expect = chai.expect;
// global.assert = chai.assert;
// import $ from 'jquery';
//
// describe('\n Dashboard-Graph-Link \n ', () => {
//   let wrapperData;
//   const fetchChartData = sinon.spy();
//   var spy  ;
//   var assert = sinon.assert;
//   before(function() {
//     // spy = sinon.spy(global.window.object, global.window.method);
//     // spy = sinon.spy(global.window.spyConfig.object, global.window.spyConfig.method);
//     wrapperData = mount(<Dashboard fetchChartData={fetchChartData} store={store}/>)
//   });
//   describe('\n Dashboard \n', () => {
//       it ("Track single link", function() {
//       //     $('a.tasklink').click();
//       //     assert.called(spy);
//
//       console.log(wrapperData.html());
//         let a = TestUtils.findRenderedDOMComponentWithTag(wrapperData, 'a');
//         let domNode = a.getDOMNode();
//         expect(domNode.getAttribute('href')).to.equal('/records/2');
//       });
//   });
//
//   afterEach(function() {
//       // spy.restore();
//   });
// });
