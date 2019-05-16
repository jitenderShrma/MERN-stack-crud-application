import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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
  componentDidUpdate(){
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
    this.setState({ [e.target.name]: e.target.value });
  }
  onCheckboxClick = () => {
    this.setState(
      preState => ({ isActivated: !preState.isActivated })
    )
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
  render() {
    let content;
    const { merchant, loading } = this.props.merchant;
    const { name, isActivated} = this.state;
    if (Object.keys(merchant).length === 0 || loading) {
      content = <Spinner />
    } else {
      content = (
        <div className="row">
          <div className="col col-md-12 m-auto">
            <div class="form-group my-4">
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
            <div class="form-check my-4">
              <input
                type="checkbox"
                className="form-check-input"
                id="is_activated"
                name='is_activated'
                onClick={this.onCheckboxClick}
                defaultChecked={isActivated}
              />
              <label className="form-check-label" htmlFor="is_activated">Is Activated</label>
            </div>
            <div className="input-field" style={{ paddingLeft: '0' }}>
              <label for="desc">Description</label>
              <CKEditor
                id="desc"
                editor={ClassicEditor}
                data={merchant.description}
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
              {
                merchant.modified_date ? (<span>{' | '} Modified at <Moment format='DD/MM/YYYY'>{merchant.modified_date}</Moment></span>) : null
              }
            </div>
            <button type="submit" onClick={this.onSubmit} className="btn btn-primary my-2">RE SAVE</button>
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