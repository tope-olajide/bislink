import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './search.css'
import {Navbar,  NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink,
  MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter
} from "mdbreact";
import { connect } from "react-redux";
import {
signOut
} from "../../actions/authActions";
class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false,
      modal: false,
      businessName: " ",
      businessLocation: " "
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }
  toggleSearch = (e) => {
    e.preventDefault();
    this.setState({
      modal: !this.state.modal
    });
  }
  saveToState(key, value) {
    this.setState({ [key]: value });
    console.log(value);
  }
  handleBusinessSearch =() => {
    window.location = `/businesses/search/name=${this.state.businessName}/location=${this.state.businessLocation}`;
  }
  toggle = (e) => {
    this.setState({
      modal: !this.state.modal
    });
  }
signOut=()=>{
  this.props.dispatch(signOut())
}
  render() {
    return (
      <div>
        <MDBContainer>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                  <MDBModalHeader toggle={this.toggle}><FontAwesomeIcon icon="search" /> Business Search</MDBModalHeader>
                  <MDBModalBody>
                    <div className="col-md-12 search-input-wrapper">
      <input type="text" className='form-control' placeholder="Business name"
                    onChange={event => {
                      this.saveToState(
                        "businessName",
                        event.target.value
                      );
                    }}/></div>
    <div className="col-md-12 search-input-wrapper my-3"><input type="text" className='form-control' placeholder="Location" 
    onChange={event => {
      this.saveToState(
        "businessLocation",
        event.target.value
      );
    }}
    /></div>
                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn color="unique" onClick={this.toggle}>Cancel</MDBBtn>
                    <MDBBtn onClick ={this.handleBusinessSearch} color="unique">Search</MDBBtn>
                  </MDBModalFooter>
                </MDBModal>
                
              </MDBContainer> 
        
        <Navbar color="black" dark className="zindex" expand="lg" scrolling>
          <NavbarBrand href="/">
            <strong>
              <FontAwesomeIcon icon="" size="1x" />
              BISLINK
            </strong>
          </NavbarBrand>
          <NavbarToggler onClick={this.onClick} />
          <Collapse isOpen={this.state.collapse} navbar>
            <NavbarNav left>
              <NavItem active = {this.props.homePage} > 
                <NavLink to="/"> 
                  <FontAwesomeIcon icon="home" /> HOME </NavLink>
              </NavItem>
              <NavItem active = {this.props.search} >
                <NavLink to="/#" onClick={this.toggleSearch}  > {/* this.props.scrollToMyRef */}
                  <FontAwesomeIcon icon="search" /> SEARCH
                </NavLink>
              </NavItem>
            </NavbarNav>
            <NavbarNav right>
              <NavItem active ={this.props.addBusiness}>
                <NavLink to="/register-business">
                  <FontAwesomeIcon icon="folder-plus" /> ADD BUSINESS
                </NavLink>
              </NavItem>
              <NavItem active ={this.props.myProfile}>
                <NavLink to="/view-profile">
                  <FontAwesomeIcon icon="folder-plus" /> MY PROFILE
                </NavLink>
              </NavItem>
              <NavItem active ={this.props.notifications}>
                <NavLink to="/notifications">
                  <FontAwesomeIcon icon="folder-plus" /> NOTIFICATIONS
                </NavLink>
              </NavItem>
              <NavItem>
              </NavItem>
              <NavItem>
                <NavLink to='#?' onClick={this.signOut}>
                  <FontAwesomeIcon icon="user" /> LOGOUT
                </NavLink>
              </NavItem>
            </NavbarNav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
export default connect()(NavigationBar);