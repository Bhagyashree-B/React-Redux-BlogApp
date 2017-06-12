import  Login  from '../Login';
import  LoginForm  from '../LoginForm';
import  TaskFormModalPopup   from '../TaskFormModalPopup';
import  TaskForm  from '../TaskForm';
import  TaskPage  from '../TasksPage';
import TasksList from '../TasksList';

/**
  Usecase for on successful login add task and then view tasks
**/

export const LOGOUT = 'LOGOUT';
export function logout() {
   return {
      type: LOGOUT
   }
}

describe('\n Login-AddTask-ViewTask \n ', () => {
  let taskTitle = "Get milk - " + Math.floor(10000 + Math.random() * 90000)
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
    it('Login successfull', function(done) {
        wrapperData.find('.loginbtn').simulate('click')

        /* Adding a change listener. It will be called any time an action is dispatched, 
           and some part of the state tree may potentially have changed. */
        // This returns a function that unsubscribes the change listener.
        let unsubscribe = store.subscribe(handleChange)
        function handleChange() {
          const state = store.getState();
          if(state.user)
            expect(state.user.isAuthenticated).to.equal(true)
          else
            expect(true).to.equal(false)

          // unsubscribe the change listener
          unsubscribe()
          done();
        }
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
        wrapperTaskFormModalPopup.find(TaskForm).find('.taskContent').simulate('change', {target: {value: 'only full cream milk'}});
        expect(wrapperTaskFormModalPopup.find('input').find('.taskContent').prop('value')).to.not.equal(null);
    });
      it('Add task status', () => {
        wrapperTaskFormModalPopup.find(TaskForm).find('.status').simulate('change', {target: {value: 'inprogress'}});
        expect(wrapperTaskFormModalPopup.find('select.status').find('option')).to.not.equal(null);
    });
    it('Add task priority', () => {
        wrapperTaskFormModalPopup.find(TaskForm).find('.category').simulate('change', {target: {value: 'medium'}});
        expect(wrapperTaskFormModalPopup.find('select.category').find('option')).to.not.equal(null);
    });
    it('Click to add task and Close modal popup', function(done){
        wrapperTaskFormModalPopup.find(TaskForm).find('.saveTaskBtn').simulate('click')
        done();
    });
  });

  describe('\n   View task \n', () =>  {
      it('Getting all tasks', function(done) {
        const fetchtasks =  sinon.spy();
        const deletetask = sinon.spy();
        wrapperTaskPage = mount(<TaskPage fetchtasks={fetchtasks} deletetask={deletetask} store={store}  />)
        
        /* Adding a change listener. It will be called any time an action is dispatched, 
           and some part of the state tree may potentially have changed. */
        // This returns a function that unsubscribes the change listener.
        let unsubscribe = store.subscribe(handleChange)
        function handleChange() {
          // unsubscribe the change listener
          unsubscribe()
          done();
        }
      });
      it('Displaying all tasks', function() {
        expect(wrapperTaskPage.find(TasksList).html()).to
            .not.equal("<div><p>There are no tasks yet in your collection.</p></div>");
      });
      it('Displayed task - '+ taskTitle, function() {
        let titleExists
        const texts = wrapperTaskPage.find(TasksList).find(".panel-heading").map(node => titleExists = node.text() === taskTitle ? true : false );
        expect(titleExists).to.equal(true);
      });
  });

  after(function(done) {
    //store.dispatch(logout())
    wrapperTaskPage.unmount();
    wrapperData.unmount();
    wrapperTaskFormModalPopup.unmount();
    done();
  });
});
