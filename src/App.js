import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route } from "react-router-dom";

import  Navbar from "./components/navbar.component";
import  studentlist from "./components/studentlist.component";
import  editstudent from "./components/editstudent.component";
import  addstudent from "./components/addstudent.component";
import  deletestudent from "./components/deletestudent.component";


function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br />
      <Route path = "/" exact component={studentlist} />
      <Route path = "/register" exact component={addstudent } />
      <Route path = "/update" exact component={editstudent} />
      <Route path = "/deletestudent" exact component={deletestudent} />
      </div>
    </Router>

   
  );
}

export default App;
