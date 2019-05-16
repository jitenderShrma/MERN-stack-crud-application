import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import Spinner from '../common/Spinner';
import Search from './Search';
import AddMerchant from './Add';
import { getMerchants, deleteMerchant, addMerchant } from '../../actions/merchantAction';
class Index extends Component {
  constructor() {
    super();
    this.state = {
      name: null,
      description: '',
      isActivated: false,
      perPage: 10,
      currentPage: 1,
      currentMerchants: []
    }
  }
  componentDidMount() {
    this.props.getMerchants();
  }
  onDelete = (merchant_id) => {
    this.props.deleteMerchant(merchant_id);
  }
  onDescChange = (data) => {
    this.setState({ description: data })
    // this.setState(
    //   preState => ({ isActivated: !preState.isActivated })
    // )
  }
  onChange = (e, data) => {
    if (e.target.name === 'isActivated') {
      this.setState({ [e.target.name]: e.target.checked });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }
  onSubmit = () => {
    const newMerchant = {
      name: this.state.name,
      isActivated: this.state.isActivated,
      description: this.state.description
    }
    this.props.addMerchant(newMerchant);
  }
  onPagClick = (id) => {
    this.setState({
      currentPage: Number(id)
    });
  }
  onPreNext = (status) => {
    let { currentPage } = this.state;
    if (status === 'pre') {
      this.setState({ currentPage: Number(currentPage - 1) });
    } else if (status === 'next') {
      this.setState({ currentPage: Number(currentPage + 1) });
    }
  }
  render() {
    let content;
    const { loading, merchants } = this.props.merchant;
    const { errors } = this.props;
    const { name, isActivated, perPage, currentPage } = this.state;
    if (merchants.length === 0 || loading) {
      content = <Spinner />
    } else {
      if (merchants.nomerchantfound) {
        content = <h5>No Merchants found</h5>
      } else {
        // Logic for get current merchant
        const indexOfLastPage = currentPage * perPage;
        const indexOfFirstPage = indexOfLastPage - perPage;
        const currentMerchants = (merchants || []).slice(indexOfFirstPage, indexOfLastPage);
        // Logic for display pagination page
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(merchants.length / perPage); i++) {
          pageNumbers.push(i);
        }
        content = (
          <div>
            <br></br>
            <h3 className="text-center">Merchants List</h3>
            <hr></hr>
            <div className="row">
              <div className="col">
                <Search />
                <table className="table mb-2">
                  <thead>
                    <tr>
                      <th scope="col">Serial No.</th>
                      <th scope="col">Name</th>
                      <th scope="col">Description</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      currentMerchants.map((each, index) => (
                        <tr key={index}>
                          <th scope="row" >{
                            index + 1
                          }</th>
                          <td>{each.name}</td>
                          <td>{each.description.substring(0, 20)} ....</td>
                          <td><Link to={`/merchant/edit/${each._id}`} className="ml-3"><i className="fas fa-edit blue-text"></i></Link></td>
                          <td>
                            <a href="#!" onClick={this.onDelete.bind(this, each._id)} className="ml-3">
                              <i className="fas fa-trash-alt text-danger"></i>
                            </a>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>

                {/* Pagination */}
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className={classnames('page-item', { 'disabled': currentPage === 1 })}>
                      <a
                        className="page-link"
                        href="#!"
                        aria-label="Previous"
                        onClick={this.onPreNext.bind(this, 'pre')}
                      >
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                      </a>
                    </li>
                    {
                      pageNumbers.map((number, i) => (
                        <li
                          className={classnames('page-item', { 'active': currentPage === number })}
                          key={number}
                          id={number}
                          onClick={this.onPagClick.bind(this, number)}
                        >
                          <a className="page-link" href="#!" >
                            {number}
                          </a>
                        </li>
                      ))
                    }
                    <li className={classnames('page-item', { 'disabled': currentPage === pageNumbers[pageNumbers.length - 1] })}>
                      <a
                        className="page-link"
                        href="#!"
                        aria-label="Next"
                        onClick={this.onPreNext.bind(this, 'next')}
                      >
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        )
      }
    }
    return (
      <div className="container">
        {content}
        <AddMerchant
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          onDescChange={this.onDescChange}
          name={name}
          isActivated={isActivated}
          errors={errors} />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  merchant: state.merchant,
  errors: state.errors
});
export default connect(mapStateToProps, { getMerchants, deleteMerchant, addMerchant })(Index);