import  Login  from '../Login';
import  LoginForm  from '../LoginForm';
import Dashboard from '../Dashboard';

/**
  Includes API testing for login and verify data on graph
**/

describe('\n Login-VerifyGraphdata (API) \n ', () => {
  let wrapperData;
  let wrapperChartData;
  const login = sinon.spy();
  const fetchChartData =  sinon.spy();
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
  });

  describe('\n Verify tasks on graph \n' , () => {
    it('Render Dashboard view', function(done) {
     wrapperChartData = mount(<Dashboard fetchChartData={fetchChartData} store={store}  />)
     
     let unsubscribe = store.subscribe(handleChange)
     function handleChange() {
        unsubscribe()
        done();
      }
    });
    it('Validate navigation link', function() {
      expect(wrapperChartData.find("a.tasks-link").prop('href')).to.equal("/tasks")
    });
    it('Test tasks in Pie chart', function() {       
      const state = store.getState();
      let allValuesExists = true;
      let pieChartDom = wrapperChartData.find("#pie_chart svg text")
      let filteredDataPoints = pieChartDom.map( e => {
        let txt = e.text()
        txt = txt.split(":")[1].trim()
        return Number(txt) 
      })

      state.chartData.dataBycategory.data.map( val => {
        if(filteredDataPoints.indexOf(val.count) === -1 )
          allValuesExists = false
      })
      expect(allValuesExists).to.be.true
    });
    it('Test tasks in Bar chart', function() {       
      const state = store.getState();
      let allValuesExists = true;
      let barChartDom = wrapperChartData.find("#bar_chart svg g.x g.tick text")

      let filteredDataPoints = barChartDom.map( e => {
        let txt = e.text()
        txt = txt.split(":")[1].trim()
        return Number(txt) 
      })

      state.chartData.dataBycategory.data.map( val => {
        if(filteredDataPoints.indexOf(val.count) === -1 )
          allValuesExists = false
      })
      expect(allValuesExists).to.be.true
    });
  })
})