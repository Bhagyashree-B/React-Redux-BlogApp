import  TaskForm  from '../TaskForm';
import moment from 'moment';

/**
  Includes tests for add task form UI component
**/

describe('\n TaskForm-Validation \n ', function () {
  var passwordData = "password"
  var emailData = "email@sss.cpm"

 it('Page is rendered correctly', () => {
   const wrapper = shallow(<TaskForm/>);
    expect(wrapper.type()).to.eql('div');
  });

 it('should have an inputs for task fields ', function () {
    const wrapper = shallow(<TaskForm/>);
    expect(wrapper.find('input')).to.have.length(2);
  });

  it('submit task button ', function () {
    const wrapper = shallow(<TaskForm/>);
    expect(wrapper.find('button').find('.saveTaskBtn')).to.have.length(1);
  });

  it('Add title', () => {
    const wrapper = shallow(<TaskForm/>);
    wrapper.setState({ title : "title" });
    expect(wrapper.state().title).to.equal("title");
  });

  it('Add start date', () => {
    const wrapper = shallow(<TaskForm/>);
    wrapper.setState({ startDate : "2017-05-15T06:03:08.492Z" });
    expect(wrapper.state().startDate).to.equal("2017-05-15T06:03:08.492Z");
  });

  it('Add due date', () => {
    const wrapper = shallow(<TaskForm/>);
    wrapper.setState({ dueDate : "2017-05-18T06:03:08.492Z" });
    expect(wrapper.state().dueDate).to.equal("2017-05-18T06:03:08.492Z");
  });

  it('validate date', () => {
    const wrapper = shallow(<TaskForm/>);
    var isafter = moment("2017-05-18T06:03:08.492Z").isAfter("2017-05-15T06:03:08.492Z");
    expect(isafter).to.equal(true);
  });

  it('Add task description', () => {
    const wrapper = shallow(<TaskForm/>);
    wrapper.setState({ taskContent : "taskContent" });
    expect(wrapper.state().taskContent).to.equal("taskContent");
  });

  it('Add task status', () => {
    const wrapper = shallow(<TaskForm/>);
    wrapper.setState({ status : "to_be_done" });
    expect(wrapper.state().status).to.equal("to_be_done");
  });

  it('Add task priority', () => {
    const wrapper = shallow(<TaskForm/>);
    wrapper.setState({ category : "high" });
    expect(wrapper.state().category).to.equal("high");
  });
});
