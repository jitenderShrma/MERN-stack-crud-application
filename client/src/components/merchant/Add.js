import React, { Component } from 'react'
import classnames from 'classnames';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


class Add extends Component {
  render() {
    const { onChange,
      onSubmit,
      onDescChange,
      name,
      isActivated,
      errors
    } = this.props;
    return (
      <div>
        <button className="bg-primary fixed-button wobble" type="button" data-toggle="modal" data-target="#add-merchant-modal" >
          <i className="fas fa-plus"></i>
        </button>

        {/* Modal Content */}
        <div className="modal fade" id="add-merchant-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add Merchant</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className={classnames('form-control', { 'is-invalid': errors.name })}
                    id="name"
                    placeholder="Enter Name"
                    name="name"
                    onChange={onChange}
                    value={name}
                  />
                  <div className="invalid-feedback">{errors.name}</div>
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="isActivated"
                    name="isActivated"
                    defaultChecked={isActivated}
                    onChange={onChange}
                  />
                  <label className="form-check-label" htmlFor="isActivated">Is Activate</label>
                </div>
                <div className="input-field" style={{ paddingLeft: '0' }}>
                  <label htmlFor="desc">Description</label>
                  <CKEditor
                    id="desc"
                    editor={ClassicEditor}
                    name="description"
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      let s_i = data.indexOf('<p>')
                        + 3;
                      onDescChange(data.substring(s_i, data.indexOf('</p>')))
                    }}
                    config = {
                      { toolbar: [[]] }
                    }
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" onClick={onSubmit} className="btn btn-primary">Save Merchant</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Add;