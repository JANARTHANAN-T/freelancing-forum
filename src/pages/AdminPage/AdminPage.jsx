import React, {useState} from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./AdminPage.css";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { respondToRequest } from "../../actions/admin";
import { setAlert } from "../../actions/alert";
function AdminPage() {
  const [nav,setNav]=useState('request');
  const [project,setProject]=useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projects = useSelector((state)=>(state.adminReducer));
  useEffect(()=>{
    if(projects && projects.data){
      setProject([...projects.data])
    }
  },[projects])
    
    const handleNavigation = (e) =>{
        if(e.target.id==='request'){
            setNav(e.target.id)
            document.getElementById(e.target.id).classList.add('admin-nav-ative')
            document.getElementById('progress').classList.remove('admin-nav-ative')
            document.getElementById('completed').classList.remove('admin-nav-ative')
        }
        else if(e.target.id==='progress'){
            setNav(e.target.id)
            document.getElementById(e.target.id).classList.add('admin-nav-ative')
            document.getElementById('request').classList.remove('admin-nav-ative')
            document.getElementById('completed').classList.remove('admin-nav-ative')
        }
        else{
            setNav(e.target.id)
            document.getElementById(e.target.id).classList.add('admin-nav-ative')
            document.getElementById('request').classList.remove('admin-nav-ative')
            document.getElementById('progress').classList.remove('admin-nav-ative')
        }
    }

    const handleAccpet = (e,id) =>{
        e.preventDefault();
        dispatch(setAlert("Accepting Project","info",2000))
        dispatch(respondToRequest({status:"accepted",p_id:id},navigate))
    }
    
    const handleReject = (e,id) =>{
      e.preventDefault(); 
       dispatch(setAlert("Rejecting Project","info",2000))
      dispatch(respondToRequest({status:"created",p_id:id},navigate))
  
    }

    console.log(project)
  return (
    <div>
      <Navbar />
      <div className="admin-nav mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div className="mx-auto fw-bold py-4 px-5 pointer admin-nav-ative" id="request" onClick={handleNavigation}>Request</div>
            <div className="mx-auto fw-bold py-4 px-5 pointer" id="progress" onClick={handleNavigation}>Progress</div>
            <div className="mx-auto fw-bold  py-4 px-5 pointer" id="completed" onClick={handleNavigation}>Completed</div>
        </div>
      </div>
      <div className="container">
      {nav==='request' &&
      <table class="table">
        <thead>
          <tr >
            <th scope="col">#</th>
            <th scope="col">Sender</th>
            <th scope="col">Receiver</th>
            <th scope="col">Project</th>
            <th scope="col">Accept</th>
            <th scope="col">Reject</th>

          </tr>
        </thead>
        <tbody>
        {project.map((p,i)=>{
          if(p.project_status==='pending-admin')
          return(
            <tr>
              <th scope="row">1</th>
              <td onClick={()=>navigate(`/profile/${p.createdBy._id}`)} >{p.createdBy.first_name}-{p.createdBy.last_name}</td>
              <td onClick={()=>navigate(`/profile/${p.developer._id}`)} >{p.developer.first_name}-{p.developer.last_name}</td>
              <td onClick={()=>navigate(`/project/show/${p._id}`)} >{p.title}</td>
              <td><button className="btn btn-outline-success" onClick={(e)=>handleAccpet(e,p._id)}>Accept</button></td>
              <td><button className="btn btn-outline-danger" onClick={(e)=>handleReject(e,p._id)}>Reject</button></td>
            </tr>
          )
        })}
        </tbody>
      </table>
      }
      {nav==='progress' &&
      <table class="table">
        <thead>
          <tr >
            <th scope="col">#</th>
            <th scope="col">Sender</th>
            <th scope="col">Receiver</th>
            <th scope="col">Project</th>
            <th scope="col">Assigned Date</th>
            <th scope="col">Status</th>

          </tr>
        </thead>
        <tbody>
        {project.map((e,i)=>{
          if(e.project_status==='pending-user' || e.project_status==='assigned' || e.project_status==='partial')
          return(
          <tr>
            <th scope="row">1</th>
              <td onClick={()=>navigate(`/profile/${e.createdBy._id}`)} >{e.createdBy.first_name}-{e.createdBy.last_name}</td>
              <td onClick={()=>navigate(`/profile/${e.developer._id}`)}>{e.developer.first_name}-{e.developer.last_name}</td>
              <td onClick={()=>navigate(`/project/show/${e._id}`)} >{e.title}</td>
            <td>12-12-2022</td>
            <td>{e.project_status}</td>
          </tr>
          )
        })}
        </tbody>
      </table>
      }
      {nav==='completed' &&
      <table class="table">
        <thead>
          <tr >
            <th scope="col">#</th>
            <th scope="col">Sender</th>
            <th scope="col">Receiver</th>
            <th scope="col">Project</th>
            <th scope="col">Assigned Date</th>
            <th scope="col">Completed Date</th>

          </tr>
        </thead>
        <tbody>
        {project.map((e,i)=>{
        if(e.project_status==='completed')
          return(
          <tr>
            <th scope="row">1</th>
            <td onClick={()=>navigate(`/profile/${e.createdBy._id}`)}>{e.createdBy.first_name}-{e.createdBy.last_name}</td>
              <td onClick={()=>navigate(`/profile/${e.developer._id}`)}>{e.developer.first_name}-{e.developer.last_name}</td>
              <td onClick={()=>navigate(`/project/show/${e._id}`)}>{e.title}</td>
            <td>12-12-2022</td>
            <td>12-12-2022</td>
          </tr>
          )
        })}
        </tbody>
      </table>
      }
      </div>
    </div>
  );
}

export default AdminPage;
