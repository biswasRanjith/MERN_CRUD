import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


export default class editstudent extends Component {

    constructor (props) {
        super(props)

        this.onChangename = this.onChangename.bind(this);
        this.onChangedob = this.onChangedob.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        this.onChangeaddress = this.onChangeaddress.bind(this);
        this.onChangemobileno = this.onChangemobileno.bind(this);
        this.onChangerole = this.onChangerole.bind(this);
        this.onSubmit = this.onSubmit.bind(this);



        this.state = {
            name:'',
            dob: new Date(),
            email:'',
            password:'',
            address:'',
            mobileno:'',
            role:''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/update'+this.props.match.params.id)
          .then(response => {
            this.setState({
              name: response.data.name,
              email: response.data.firstname,
              address: response.data.lastname,
              dob: new Date(response.data.dob),
              mobileno: response.data.mobileno,
              role: response.data.role
            })   
          })
          .catch(function (error) {
            console.log(error);
          })
      }
    


    onChangename(e) {
        this.setState({
          name: e.target.value
        })
      }

      
    onChangedob(e) {
        this.setState({
          dob: Date
        })
      }

      
    onChangeemail(e) {
        this.setState({
          email: e.target.value
        })
      }

      
    onChangepassword(e) {
        this.setState({
          password: e.target.value
        })
      }
    
      onChangeaddress(e) {
        this.setState({
          address: e.target.value
        })
      }

      onChangemobileno(e) {
        this.setState({
          mobileno: e.target.value
        })
      }

      onChangerole(e) {
        this.setState({
            role: e.target.value
        })
      }

      onSubmit(e) {
        e.preventDefault();

     const details = {
          name: this.state.name,
          dob: this.state.dob,
          email: this.state.email,
          password: this.state.password,
          address: this.state.address,
          mobileno: this.state.mobileno,
          role: this.state.role,
        }
        console.log(details)

        axios.post('http://localhost:5000/update'+ this.props.match.params.id, details)

        .then(res => console.log(res.data));
  
        window.location = '/';
    }





    render() {
        return ( 
          <div>

          <h3>Edit Student</h3>
    
          <form onSubmit={this.onSubmit}>

            <div className="form-group"> 
    
              <label>Name: </label>
    
              <input  type="text"
    
                  required
    
                  className="form-control"
    
                  value={this.state.name}
    
                  onChange={this.onChangename}
    
                  />
    
            </div>
    
            <div className="form-group">
    
              <label>Date of birth: </label>
              <input 
            type="text" 
            className="form-control"
            value={this.state.dob}
            onChange={this.onChangedob}
            />
              {/* <div>
    
                <DatePicker
    
                  selected={this.state.dob}
    
                  onChange={this.onChangedob}
    
                />
    
              </div> */}
    
            </div>

            <div className="form-group">
            <label>email: </label>
            <input 
            type="text" 
            className="form-control"
            value={this.state.email}
            onChange={this.onChangeemail}
            />
            </div>

  <div className="form-group">
    
    <label>password: </label>

    <input 

        type="password" 

        className="form-control"

        value={this.state.password}

        onChange={this.onChangepassword}

        />

  </div>
    
    
  <div className="form-group">
    
    <label>mobileno: </label>

    <input 

        type="number" 

        className="form-control"

        value={this.state.mobileno}

        onChange={this.onChangemobileno}

        />

  </div>

  <div className="form-group">
    
    <label>address: </label>

    <input 

        type="text" 

        className="form-control"

        value={this.state.address}

        onChange={this.onChangeaddress}

        />

  </div>

  <div className="form-group">
    
    <label>role: </label>

    <input 

        type="text" 

        className="form-control"

        value={this.state.role}

        onChange={this.onChangerole}

        />

  </div>
  
            <div className="form-group">
    
              <input type="submit" value="Edit Student" className="btn btn-primary" />
    
            </div>
    
          </form>
    
        </div>
        )
    }
}