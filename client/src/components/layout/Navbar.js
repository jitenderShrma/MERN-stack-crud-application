import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export default class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
        <Link to="/" className="navbar-brand text-primary m-auto">Merchant</Link>
         </nav>
      </div>
    )
  }
}
