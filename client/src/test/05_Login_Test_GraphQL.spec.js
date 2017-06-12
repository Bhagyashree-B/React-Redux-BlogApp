import  Login  from '../Login';
import  LoginForm  from '../LoginForm';

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

/**
  Includes API testing for login and get task
**/

describe('\n Login-Get-Tasks (API) \n ', () => {
  let wrapperData;
  const login = sinon.spy();
  const email = "john@gmail.com"
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
    it('Login successfull', function(done) {
      const state = store.getState();
      expect(state.user.isAuthenticated).to.be.true
      if(state.user.isAuthenticated)
        done();
    });
  });

  describe('\n   Get Tasks (API) \n' , () => {
    it('Retrieve all tasks', function(done) {
        const state = store.getState();
        let user = state.user
        let payload = '{ chartByCategory( userId : "'+ user._id +'", statusValue : "inprogress" ) { dataBycategory { total, data {status, count} } , allData { count, userName} } }'
        new Promise(function(resolve, reject) {
          let request= new XMLHttpRequest();
          request.open("POST", "http://localhost:8080/graphql?query="+payload, true);
          request.setRequestHeader("Content-Type", "application/graphql");
          if(user && user.token)
              request.setRequestHeader("x-access-token", user.token);
          request.send(payload);
          request.onreadystatechange = () => {
              if (request.readyState === 4) {
                resolve(request.responseText)
              }
          }
        }).then(res => {
          let rs = JSON.parse(res)
          expect(rs.hasOwnProperty('data')).to.equal(true)
          done();
        }).catch(err=>{
          done(err);
        })
      });
    })

  after(function(done) {
    wrapperData.unmount();
    done();
  });
})
