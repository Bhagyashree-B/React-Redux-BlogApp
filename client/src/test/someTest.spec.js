// // import React from 'react';
// // import { shallow } from 'enzyme';
// // import { expect } from 'chai';
// //
// // // const wrapper = shallow(<App />);
// //
// // describe('(Component) App', () => {
// //   it('renders...', () => {
// //     // expect(wrapper).to.have.length(1);
// //   });
// // });
//
//
// // test.js
//  import React from 'react';
//  import { shallow } from 'enzyme';
//  import { authenticate } from '../actions';
//   import { Login } from '../Login';
//
//
// // const authenticate = require('../actions');
// const sinon = require('sinon');
// const expect = require('chai').expect;
//
// var data = {"email":"test","password":"12345"}
// var dataReturn = {"user":{"_id":"58fef0a5eda38bf393f1ca90","name":"test","email":"test"},"success":true,"message":"Enjoy your token!","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OGZlZjBhNWVkYTM4YmYzOTNmMWNhOTAiLCJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdCIsInBhc3N3b3JkIjoiMTIzNDUiLCJpYXQiOjE0OTM3Mzk0MjksImV4cCI6MTQ5Mzc0MDg2OX0.-lZrRvxE0aFiXEcBgJFnDUqvW68YKqZVtiD-JwBy3kw"}
//  const wrapper = mount(<Login />);
//
// describe('getUsers', () => {
//   context('on success', () => {
//     it('returns user data', () => {
//       // const getSpy = sinon.stub(authenticate, 'post').returns(Promise.resolve([
//       //   {type: "LOGGEDIN", user: dataReturn}
//       // ]));
//       //
//       // const output = authenticate(data);
//       // console.log("output " + output)
//       //   // wrapper.instance().showData()
//       //
//       // wrapper.instance().login(data).
//       //   then((res) => {
//       //     expect(res).to.eql([
//       //       {type: "LOGGEDIN", user: dataReturn}
//       //     ]);
//       //   })
//       //  .then(() => done(), done);
//     });
//   });
// });



//loginTest
//wrapperData.find(LoginForm).find('button').simulate('click')
// var deferred = Q.defer();
// setTimeout(function(){
//   deferred.promise.then(function(data){

//       console.log("calledNew" );

//   }).done(); // NOTE THE DONE
//  }, 5000)
// deferred.resolve();

//   let promise = new Promise((resolve, reject) => {
//         resolve();
//     });
//
//   return promise.then(() => {
//
//     setTimeout(function(){
//          console.log('waiting over.');
//         expect(true).to.be.true // successful
//         console.log(wrapperData.state('redirect'))  // prints true
//          done();
//      }, 5000)
//
//     }).catch(function(error) {
//       console.log('Request failed', error)
//     });




  //
  // it('should fetch from local storage', () => {
  //     const props = {
  //       currentUser: 'UMAIR',
  //       user: {
  //         is_key: false
  //       }
  //     };
  //
  //     const spy = sinon.spy(global.window.localStorage, "setItem");
  //     spy(props);
  //     expect(spy.calledWith( {
  //       currentUser: 'UMAIR',
  //       user: {
  //         is_key: false
  //       }
  //     }));
  //     spy.restore();
  //
  //     const stub = sinon.stub(global.window.localStorage, 'getItem');
  //     stub(props);
  //     expect(stub.calledWith(Object.keys(props)));
  //   });


    // 
    // it('response from authenticate ' , () => {
    //   console.log( JSON.parse(window.localStorage.getItem("user"))  )
    //   expect(wrapperData.state().response).to.equal(10);
    // })
