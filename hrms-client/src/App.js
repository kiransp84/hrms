import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import CreateEmployeeForm from './pages/maintainemployee'
import ListEmployees from './pages/listemployee';
import CreatePayroll from './pages/payroll';
import GenerateSalary from './pages/generatesalary';

import Menu from './components/Menu'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Menu />,
    },
    {
      path: "/employee/create",
      element: <CreateEmployeeForm />,
    },
    {
        path: "/employee/modify",
        element: <CreateEmployeeForm />
    },
    {
        path: "/employee/list",
        element: <ListEmployees />,
    },
    {
        path: "/employee/payroll",
        element: <CreatePayroll />,
    },    
    {
        path: "/employee/generatesalary",
        element: <GenerateSalary />,
    },                    
  ]);

export default function App() {

    return <RouterProvider router={router} />;
}