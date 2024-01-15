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

import Menu from './components/Menu'

/*
const CommonHeaderOld = () => {
    return <>
        <Link to="/">Home</Link>
        <Link to="/employee/create" target="_blank" >Create Employee</Link>
        <Link to="/employee/list" target="_blank">List Employees</Link>
        <Link to="/employee/payroll" target="_blank">Create Payroll</Link>
        <Link to="/employee/generatesalary" target="_blank">GenerateSalary</Link>
        <Link to="/employee/processSalary" target="_blank">Process Salary</Link>
    </>
}*/

const CommonHeader = () => (
    <Nav>
        <NavItem>
            <NavLink>
            <Link to="/">Home</Link>
            </NavLink>
        </NavItem>
        <NavItem>
            <NavLink>
            <Link to="/employee/create" target="_blank" >Create Employee</Link>
            </NavLink>
        </NavItem>
        <NavItem>
            <NavLink>
            <Link to="/employee/list" target="_blank" >List Employees</Link>
            </NavLink>
        </NavItem>        
        <NavItem>
            <NavLink>
            <Link to="/employee/payroll" target="_blank">Create Payroll</Link>
            </NavLink>
        </NavItem>
        <NavItem>
            <NavLink>
            <Link to="/employee/generatesalary" target="_blank">GenerateSalary</Link>
            </NavLink>
        </NavItem>
        <NavItem>
            <NavLink>
            <Link to="/employee/processSalary" target="_blank">Process Salary</Link>
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
]);

export default function App() {

    return <><RouterProvider router={router} ></RouterProvider></>;
}