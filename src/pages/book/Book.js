import bookServices from "../../sevices/book.service";
import categoryservices from "../../sevices/category.service";
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
import Confirmation from "./Confirmation";
import { toast } from 'react-toastify';
const Book = () => {
  const navigate = useNavigate();
  const defaulval = { pageSize: 8, pageIndex: 0, keyWord: "" };
  const [filters, setFilters] = useState(defaulval);
  const [bookRecord, setBookRecord] = useState({
    pageIndex: 0,
    pageSize: 8,
    totalPages: 1,
    items: [],
    totalItems: 0,
  });
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const [categories, setCategories] = useState([]);
  const columns = [
    { id: "name", label: "Book Name", minWidth: 100 },
    { id: "price", label: "Price", minWidth: 100 },
    { id: "categories", label: "Categories", minWidth: 100 }
  ];
  useEffect(()=>{
    getAllCategories();
  },[]);
  const getAllCategories=()=>{
    categoryservices.getAll().then((res)=>{
        if(res){
        setCategories(res);
        }
    })
  };
  useEffect(()=>{
    const timer=setTimeout(()=>{
        // if(filters.keyWord==="") delete filters.keyWord;
        searchAllBooks({...filters});
    },[filters]);
    return ()=>clearTimeout(timer);
  },[filters])
  const searchAllBooks=(filters)=>{
        bookServices.getAll(filters).then((res)=>{
        setBookRecord(res.result);
        })
  };
  const onConfirmDelete = () => {
    bookServices
      .deleteBook(selected)
      .then((res) => {
        toast.success("Book Deleted Succeessfully!!");
        setOpen(false);
        setFilters({ ...filters, pageIndex: 1 });
      })
      .catch((e) => toast.error("Error"));
  };
  return (
    <>
      <h1 className="item-center heading">Book</h1>
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
          <div className="col a">
            <button className="btn btn-outline-primary">
              <NavLink
                to="/add-book"
                color="primary"
                style={{ textDecoration: "none" }}
              >
                Add
              </NavLink>
            </button>
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
            {bookRecord?.items?.map((row,index)=>(<TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{categories.find((c) => c.id === row.categoryId)?.name}</TableCell>
                <TableCell>
                  <button className="btn btn-outline-primary">
                    <NavLink
                    to={`/edit-book/${row.id}`}
                      color="primary"
                      style={{ textDecoration: "none" }}
                    >
                      Edit{" "}
                    </NavLink>
                  </button>
                  <button className="btn btn-outline-primary" onClick={() => {
                        setOpen(true);
                        setSelected(row.id ?? 0);
                      }}>
                    <NavLink
                      to="#"
                      color="primary"
                      style={{ textDecoration: "none" }}
                    >
                      Delete{" "}
                    </NavLink>
                  </button>
                </TableCell>
              </TableRow>))}
              {!bookRecord.items.length && (
                <TableRow className="TableRoww">
                    <TableCell colSpan={5} className="TableCell">
                        NO BOOK
                    </TableCell>
                </TableRow>
              )}
              <TablePagination
    rowsPerPageOptions={[5, 10, 25]}
    component="div"
    count={bookRecord.totalItems}
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
export default Book;
