import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import conveter from 'number-to-words';
import Moment from 'react-moment';
import { updateMerchant, getMerchantById } from '../../actions/merchantAction';
import Spinner from '../common/Spinner';

class Edit extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      isActivated: false
    }
  }
  componentDidMount() {
    const { merchant_id } = this.props.match.params;
    this.props.getMerchantById(merchant_id);
  }
  componentDidUpdate() {
    // M.updateTextFields();
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.merchant.loading) {
      const { merchant } = nextProps.merchant;
      this.setState({
        name: merchant.name,
        isActivated: merchant.isActivated,
        description: merchant.description
      });
    }
  }
  onChange = (e) => {
    if (e.target.name === 'isActivated') {
      this.setState({ [e.target.name]: e.target.checked });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  onSubmit = () => {
    const mearchantData = {
      merchant_id: this.props.match.params.merchant_id,
      name: this.state.name,
      isActivated: this.state.isActivated,
      description: this.state.description
    }
    this.props.updateMerchant(mearchantData, this.props.history);
  }
  turnChangeIntoArr = (changes) => {
    const trunIntoArr = [];

    changes.sort((a, b) => a - b).forEach((date, index) => {
      const d = new Date(date);
      if (index + 1 === changes.length) {
        trunIntoArr.push(`last change maked on ${d.toLocaleDateString()} at ${d.toLocaleTimeString()}`);
      } else {
        trunIntoArr.push(`${conveter.toWordsOrdinal(index + 1)} change maked on ${d.toLocaleDateString()} at ${d.toLocaleTimeString()}`);
      }
    });
    return trunIntoArr.reverse();
  }
  render() {
    let content;
    const { merchant, loading } = this.props.merchant;
    const { name, isActivated } = this.state;
    if (Object.keys(merchant).length === 0 || loading) {
      content = <Spinner />
    } else {
      const changesArray = this.turnChangeIntoArr(merchant.changes_history)
      content = (
        <div className="row">
          <div className="col col-md-12 col-sm-12 m-auto">
            <div className="form-group my-4">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                onChange={this.onChange}
                disabled
              />
            </div>
            <div className="form-check my-4">
              <input
                type="checkbox"
                className="form-check-input"
                id="is_activated"
                name='isActivated'
                checked={isActivated}
                onClick={this.onChange}
              />
              <label className="form-check-label" htmlFor="is_activated">Is Activated</label>
            </div>
            <div className="input-field" style={{ paddingLeft: '0' }}>
              <label htmlFor="desc">Description</label>
              <CKEditor
                id="desc"
                editor={ClassicEditor}
                data={merchant.description}
                config={
                  { toolbar: [[]] }
                }
                onChange={(event, editor) => {
                  const data = editor.getData();
                  let s_i = data.indexOf('<p>')
                    + 3;
                  this.setState({ description: data.substring(s_i, data.indexOf('</p>')) })
                }}
              />
            </div>
            <div className="my-3">
              Created at {
                <Moment format='DD/MM/YYYY'>{merchant.created_date}</Moment>
              }
            </div>
            <button type="submit" onClick={this.onSubmit} className="btn btn-primary my-2">RE SAVE</button>
            <br></br>
            <hr></hr>
            <p className="font-weight-bold">Previous changes </p>
            <ul className="list-group">
              {
                changesArray.length === 0 ?
                  <p>Not found.</p> :
                  (
                    changesArray.map(each =>
                      <li className="list-group-item font-weight-normal small-font">
                      {each.charAt(0).toUpperCase() + each.slice(1)}
                      </li>
                    )
                  )
              }
            </ul>
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        {content}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  merchant: state.merchant
});
export default connect(mapStateToProps, { getMerchantById, updateMerchant })(withRouter(Edit));