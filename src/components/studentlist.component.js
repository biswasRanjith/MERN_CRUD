import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Student = props => (

  <tr>

    <td>{props.Student.name}</td>

    <td>{props.Student.email}</td>

    <td>{props.Student.address}</td>

    <td>{props.Student.role}</td>

    <td>

      <Link to={"/update"+props.Student._id}>edit</Link> | <a href="#" onClick={() => { props.deletestudent(props.Student.email) }}>delete</a>

    </td>

  </tr>

)

export default class studentlist extends Component {

    constructor(props) {
        super(props);
        this.deletestudent = this.deletestudent.bind(this)
        this.state = {Student: []};
      }
    
    
  componentDidMount() {
    axios.get('http://localhost:5000/students')
      .then(response => {
        this.setState({ Student: response.data })
      })
      .catch((error) => {
        console.log(error);

      })

  }

  deletestudent(email) {

    axios.delete('http://localhost:5000/deletestudent?email='+email)
      .then(response => { console.log(response.data)});
    this.setState({
      Student: this.state.Student.filter(el => el.email !== email)
      
    })

  }


  Studentlist() {
    return this.state.Student.map(Students => {
      return <Student Student={Students} deletestudent={this.deletestudent} key={Students._id}/>;
    })
  }


    
    render() {
        return ( 

          <container>

          <h3>Student List</h3>
  
          <table className="table">
  
            <thead className="thead-light">
  
              <tr>
  
                <th>name</th>
  
                <th>email</th>
  
                <th>address</th>
  
                <th>role</th>

                <th> operations </th>
  
  
              </tr>
  
            </thead>
  
            <tbody>
  
              { this.Studentlist() }
  
            </tbody>
  
          </table>
  
        </container>        )
    }
}