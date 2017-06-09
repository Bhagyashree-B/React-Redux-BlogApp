import  Login  from '../Login';
import  LoginForm  from '../LoginForm';
import  TaskFormModalPopup   from '../TaskFormModalPopup';
import  TaskForm  from '../TaskForm';
import  TaskPage  from '../TasksPage';
import TasksList from '../TasksList';

export const LOGOUT = 'LOGOUT';
export function logout() {
   return {
      type: LOGOUT
   }
}

/**
  Usecase for on successful login add task and then delete task
**/

describe('\n Login-AddTask-DeleteTask \n ', () => {
  let taskTitle = "Get some cookies" + " - " + Math.floor(10000 + Math.random() * 90000)
  let wrapperData;
  let wrapperTaskFormModalPopup;
  let wrapperTaskPage;
  const login = sinon.spy();
  const savetask = sinon.spy();
  const email = "john@gmail.com"
  const password = "john123"

  before(function() {
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
        const state = store.getState();
        if(typeof state.user.isAuthenticated !== "undefined"){  
          unsubscribe()
          done();
        }
      }
    });
    it('Login successfull', function(done) {       
      const state = store.getState();
      expect(state.user.isAuthenticated).to.be.true
      if(state.user.isAuthenticated)
        done();
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
        wrapperTaskFormModalPopup.find(TaskForm).find('.taskContent').simulate('change', {target: {value: 'with milk'}});
        expect(wrapperTaskFormModalPopup.find('input').find('.taskContent').prop('value')).to.not.equal(null);
    });
    it('Add task status', () => {
        wrapperTaskFormModalPopup.find(TaskForm).find('.status').simulate('change', {target: {value: 'to_be_done'}});
        expect(wrapperTaskFormModalPopup.find('select.status').find('option')).to.not.equal(null);
    });
    it('Add task priority', () => {
        wrapperTaskFormModalPopup.find(TaskForm).find('.category').simulate('change', {target: {value: 'high'}});
        expect(wrapperTaskFormModalPopup.find('select.category').find('option')).to.not.equal(null);
    });
    it('Click to add task and Close modal popup', function(done){
      wrapperTaskFormModalPopup.find(TaskForm).find('.saveTaskBtn').simulate('click')
      done();
    });
  });

  describe('\n   Delete task \n', () =>  {
      it('Getting all tasks', function(done) {
        const fetchtasks =  sinon.spy();
        const deletetask = sinon.stub();
        wrapperTaskPage = mount(<TaskPage fetchtasks={fetchtasks} deletetask={deletetask} store={store}  />)
        let unsubscribe = store.subscribe(handleChange)
        function handleChange() {
          let {tasks} = store.getState()
          if(store.getState().tasks.length > 0){
            unsubscribe()
            done();
          }
        }
      });

      it('Displaying all tasks', function() {
        expect(wrapperTaskPage.find(TasksList).html()).to
            .not.equal("<div><p>There are no tasks yet in your collection.</p></div>");
      });

      it('Delete task - ' + taskTitle, function(done) {
        let {tasks} = store.getState()
        wrapperTaskPage.find('button.deleteTask').last().simulate('click')
        let unsubscribe = store.subscribe(handleChange)
        function handleChange() {
          const tasksLength = store.getState().tasks
          if(tasks.length > 1 && tasks.length !== tasksLength.length){
            expect(tasks.length).to.equal(tasksLength.length + 1)
            unsubscribe()
            done();
          }
        }
      });
  });
  
  after(function(done) {
    store.dispatch(logout())
    wrapperData.unmount();
    done();
  });
});
