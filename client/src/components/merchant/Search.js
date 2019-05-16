import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMerchantByStatus, getMerchantByName } from '../../actions/merchantAction';

class Search extends Component {
  onChange = (e) => {
    if (e.target.name === 'checkbox') {
      this.name_field.value = '';
      this.props.getMerchantByStatus(e.target.checked);
    }
    if (e.target.name === 'name') {
      this.checkbox_field.checked = false;
      this.props.getMerchantByName(e.target.value);
    }
  }
  render() {
    return (
      <div>
        <h5>Search By</h5>
        <form>
          <div className="form-row align-items-center mb-2">
            <div className="col col-md-4">
              <label className="sr-only" htmlFor="inlineFormInputGroup">Username</label>
              <div className="input-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  id="inlineFormInputGroup"
                  name="name"
                  placeholder="Name"
                  onChange={this.onChange}
                  ref = {input => {this.name_field = input}}
                />
              </div>
            </div>
            <div className="col-auto">
              <div className="form-check ml-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="autoSizingCheck"
                  name="checkbox"
                  onChange={this.onChange}
                  ref = {input => {this.checkbox_field = input}}
                />
                <label className="form-check-label" htmlFor="autoSizingCheck">
                  Is Activated
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(null, { getMerchantByStatus, getMerchantByName })(withRouter(Search));