import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './Store';
// Components
import Navbar from './components/layout/Navbar';
import Merchant from './components/merchant/Index';
import MerchantEdit from './components/merchant/Edit';
import NotFound from './components/common/404';
function App() {
  return (
    <Provider store={Store}>
      <Router>
        <Navbar />
        <Switch>
          {/* <div className="App"> */}
          <Route exact path="/" component={Merchant} />
          <Route exact path="/merchant/edit/:merchant_id" component={MerchantEdit} />
          <Route component={NotFound} />
          {/* </div> */}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
