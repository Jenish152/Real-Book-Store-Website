
import { useState,useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/material';
import Confirmation from "../book/Confirmation";
import { toast } from 'react-toastify';
import { useAuthContext } from "../../context/auth.context";
import userService from "../../sevices/user.service";
const Users = () => {
    const authContext = useAuthContext();
    const [filters, setFilters] = useState({ pageSize: 8, pageIndex: 0, keyWord: "" });
    const [userList, setUserList] = useState({
      pageIndex: 0,
      pageSize: 10,
      totalPages: 1,
      items: [],
      totalItems: 0,
    });
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(0);
  
    const navigate = useNavigate();
  
    useEffect(() => {
      const timer = setTimeout(() => {
        if (filters.keyword === "") delete filters.keyword;
        getAllUsers({ ...filters });
      }, 500);
      return () => clearTimeout(timer);
    }, [filters]);
  
    const getAllUsers = async (filters) => {
      await userService.getAllUsers(filters).then((res) => {
        if (res) {
          setUserList(res);
        }
      });
    };
  
    const columns = [
      { id: "firstName", label: "First Name", minWidth: 100 },
      { id: "lastName", label: "Last Name", minWidth: 100 },
      {
        id: "email",
        label: "Email",
        minWidth: 170,
      },
      {
        id: "roleName",
        label: "Role",
        minWidth: 130,
      },
    ];
  
    const onConfirmDelete = async () => {
      await userService
        .deleteUser(selectedId)
        .then((res) => {
          if (res) {
            toast.success("User delted Successfully..");
            setOpen(false);
            setFilters({ ...filters });
          }
        })
        .catch((e) => toast.error("Some Error Occured"));
    };
  return (
    <>
      <h1 className="item-center heading">Users</h1>
      <div className="container justify-content-left">
        <div className="row">
          <div className="col a">
            <input
              type="text"
              className="form-control"
              placeholder="search"
              onChange={(e) => {
                setFilters({
                  ...filters,
                  keyWord: e.target.value,
                  pageIndex: 1,
                });
              }}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          
        </div>
        <TableContainer component={Paper} className="m-3">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            
          {columns.map((column) => (
                <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
            
              ))}
              <TableCell> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {userList?.items?.map((row,index)=>(<TableRow key={`${index}-${row.id}-${row.email}`}>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.role}</TableCell>
                <TableCell>
                  <button className="btn btn-outline-primary" onClick={() => {
                        navigate(`/edit-user/${row.id}`);
                      }}>
                      Edit
                  </button>
                  {row.id !== authContext.user.id && (
                  <button className="btn btn-outline-primary" onClick={() => {
                    setOpen(true);
                    setSelectedId(row.id ?? 0);
                  }}>
                      Delete
                  </button>
                     )}
                </TableCell>
              </TableRow>))}
              {!userList.items.length && (
                <TableRow className="TableRoww">
                    <TableCell colSpan={5} className="TableCell">
                        NO Users
                    </TableCell>
                </TableRow>
              )}
              <TablePagination
    rowsPerPageOptions={[5, 10, 25]}
    component="div"
    count={userList.totalItems}
    rowsPerPage={filters.pageSize || 0}
    page={filters.pageIndex-1}
    onPageChange={(e,newpage)=>{
        setFilters({...filters,pageIndex:newpage+1});
    }}
    onRowsPerPageChange={(e)=>{
        setFilters({...filters,pageIndex:1,pageSize:Number(e.target.value)})
    }}
/>
        
          
        </TableBody>
      </Table>
    </TableContainer>

    <Confirmation
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => onConfirmDelete()}
          title="Delete book"
          description="Are you sure you want to delete this book?"
        />
      </div>
    </>
  );
};
export default Users;
