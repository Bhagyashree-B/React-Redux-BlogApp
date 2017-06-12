import  Login  from '../Login';
import  LoginForm  from '../LoginForm';

/**
  Test includes checks for correct and incorrect user name
**/

describe('\n Login-User-Not-Found \n ', () => {
  let wrapperData;
  const login = sinon.spy();
  const email = "john1@gmail.com"
  const password = "john123"

  before(function() {
    // runs before all tests in this block
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

    it('Check if : Authentication failed. User not found.', function() {
      expect(wrapperData.find("div.alert-danger").find(".error-message").html())
        .to.equal('<span class="error-message">Authentication failed. User not found.</span>')
    });
  });

  after(function(done) {
    wrapperData.unmount();
    done();
  });
})
