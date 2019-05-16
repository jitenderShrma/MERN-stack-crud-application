import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './Store';
// Components
import Navbar from './components/layout/Navbar';
import Merchant from './components/merchant/Index';
import MerchantEdit from './components/merchant/Edit';
function App() {
  return (
    <Provider store={Store}>
      <Router>
        <div className="App">
          <Navbar/>
          <Route exact path="/" component={Merchant} />
          <Route exact path="/merchant/edit/:merchant_id" component={MerchantEdit} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
