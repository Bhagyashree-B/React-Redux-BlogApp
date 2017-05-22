// import React from 'react';
// import { shallow } from 'enzyme';
// import { expect } from 'chai';
// import  TaskForm  from '../TaskForm';
// import sinon from 'sinon';
// import moment from 'moment';

// describe('<TaskForm>', function () {

// var passwordData = "password"
// var emailData = "email@sss.cpm"

//  it('Page is rendered correctly', () => {
//    const wrapper = shallow(<TaskForm/>);
//     expect(wrapper.type()).to.eql('div');
//   });

//  it('should have an inputs for task fields ', function () {
//     const wrapper = shallow(<TaskForm/>);
//     expect(wrapper.find('input')).to.have.length(2);
//   });

//   it('submit task button ', function () {
//     const wrapper = shallow(<TaskForm/>);
//     expect(wrapper.find('button').find('.saveTaskBtn')).to.have.length(1);
//   });

//   it('Add title', () => {
//     const wrapper = shallow(<TaskForm/>);
//     wrapper.setState({ title : "title" });
//     expect(wrapper.state().title).to.equal("title");
//   });

//   it('Add start date', () => {
//     const wrapper = shallow(<TaskForm/>);
//     wrapper.setState({ startDate : "2017-05-15T06:03:08.492Z" });
//     expect(wrapper.state().startDate).to.equal("2017-05-15T06:03:08.492Z");
//   });

//   it('Add due date', () => {
//     const wrapper = shallow(<TaskForm/>);
//     wrapper.setState({ dueDate : "2017-05-18T06:03:08.492Z" });
//     expect(wrapper.state().dueDate).to.equal("2017-05-18T06:03:08.492Z");
//   });

//   it('validate date', () => {
//     const wrapper = shallow(<TaskForm/>);
//     var isafter = moment("2017-05-18T06:03:08.492Z").isAfter("2017-05-15T06:03:08.492Z");
//     expect(isafter).to.equal(true);
//   });

//   it('Add task description', () => {
//     const wrapper = shallow(<TaskForm/>);
//     wrapper.setState({ taskContent : "taskContent" });
//     expect(wrapper.state().taskContent).to.equal("taskContent");
//   });

//   it('Add task category', () => {
//     const wrapper = shallow(<TaskForm/>);
//     wrapper.setState({ category : "food_drink" });
//     expect(wrapper.state().category).to.equal("food_drink");
//   });


// });
