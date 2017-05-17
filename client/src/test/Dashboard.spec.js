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
//
//
// describe('\n Dashboard-Graph-Link \n ', () => {
//   let wrapperData;
//   const fetchChartData = sinon.spy();
//     // console.log(wrapperTaskPage.find(TasksList).html());
//   before(function() {
//     // const context = { router: { isActive: (a, b) => true } };
//     // const renderedComponent = shallow(<NavLink to="/home" />, { context });
//     // connectedShowPost = TestUtils.renderIntoDocument(<Provider store={store}><Dashboard fetchChartData={fetchChartData} store={store}/></Provider>);
//     // runs before all tests in this block
//     wrapperData = mount(<Dashboard chartData={{""}} fetchChartData={fetchChartData} store={store}/>)
//     // wrapperTaskForm =  mount(<TaskForm savetask={savetask}  />)
//   });
//   describe('\n Dashboard \n', () => {
//     it('Add username', () => {
//       console.log(wrapperData.debug());
//         //  wrapperData.find(LoginForm).find('.email').simulate('change', {target: {value: 'test'}});
//         //  var input = <input name="email" class="form-control email" value="test" placeholder="Email">
//         // console.log(wrapperData.find(LoginForm).ref('email').text());
//         //  expect(wrapperData.ref('email').prop('value')).to.equal("4");
//     });
//   });
// });
