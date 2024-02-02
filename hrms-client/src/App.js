import React from 'react';
import {
    createBrowserRouter,
    createHashRouter,
    RouterProvider,
    Link
} from "react-router-dom";
import {Nav,NavItem,NavLink} from "reactstrap";

import CreateEmployeeForm from './pages/maintainemployee'
import ListEmployees from './pages/listemployee';
import CreatePayroll from './pages/payroll';
import GenerateSalary from './pages/generatesalary';
import ProcessSalary from './pages/processsalary';

import Master from './pages/master';
//import Reports from './pages/reports';

import Menu from './components/Menu'

const CommonHeader = () => (
    <Nav>
        <NavItem>
            <NavLink>
            <Link to="/" className="hrms-menu-link" title="Back to Home">Home</Link>
            </NavLink>
        </NavItem>
        <NavItem>
            <NavLink>
            <Link to="/masters/create" target="_blank" className="hrms-menu-link" title="Maintain Designation and Company " >Maintain Masters</Link>
            </NavLink>
        </NavItem>         
        <NavItem>
            <NavLink>
            <Link to="/employee/create" target="_blank" className="hrms-menu-link" title="Create an Employee" >Create Employee</Link>
            </NavLink>
        </NavItem>
        <NavItem>
            <NavLink>
            <Link to="/employee/list" target="_blank" className="hrms-menu-link" title="View or Modify Employees" >List Employees</Link>
            </NavLink>
        </NavItem>        
        <NavItem>
            <NavLink>
            <Link to="/employee/payroll" target="_blank" className="hrms-menu-link" title="Manage payscale of an Employee" >Create Payroll</Link>
            </NavLink>
        </NavItem>
        <NavItem>
            <NavLink>
            <Link to="/employee/generatesalary" target="_blank" className="hrms-menu-link" title="Edit Attendamce Data and Generate Salary of an Employee" >GenerateSalary</Link>
            </NavLink>
        </NavItem>
        <NavItem>
            <NavLink>
            <Link to="/employee/processSalary" target="_blank" className="hrms-menu-link" title="Generate Various Reports against a Company" >Process Salary</Link>
            </NavLink>
        </NavItem>                  
    </Nav>
);


const WrappedComponent = ({ children }) => {
    return <><CommonHeader />{children} </>
}
const router = createHashRouter([
    {
        path: "/",
        element: <Menu />,
    },
    {
        path: "/masters/create",
        element: <WrappedComponent><Master /></WrappedComponent>,
    },    
    {
        path: "/employee/create",
        element: <WrappedComponent><CreateEmployeeForm /></WrappedComponent>,
    },
    {
        path: "/employee/modify",
        element: <WrappedComponent><CreateEmployeeForm /></WrappedComponent>
    },
    {
        path: "/employee/list",
        element: <WrappedComponent><ListEmployees /></WrappedComponent>,
    },
    {
        path: "/employee/payroll",
        element: <WrappedComponent><CreatePayroll /></WrappedComponent>,
    },
    {
        path: "/employee/generatesalary",
        element: <WrappedComponent><GenerateSalary /></WrappedComponent>,
    },
    {
        path: "/employee/processSalary",
        element: <WrappedComponent><ProcessSalary /></WrappedComponent>,
    },
    /*{
        path: "/general/reports",
        element: <WrappedComponent><Reports /></WrappedComponent>,
    },*/
    
]);

export default function App() {

    return <><RouterProvider router={router} ></RouterProvider></>;
}