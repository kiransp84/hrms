import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import CreateEmployeeForm from './pages/maintainemployee'
import ListEmployees from './pages/listemployee';

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
                
  ]);

export default function App() {

    return <RouterProvider router={router} />;
}