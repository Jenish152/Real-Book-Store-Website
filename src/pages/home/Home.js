import { React, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/auth.context";
import styled from "styled-components";
import bookServices from "../../sevices/book.service";
import { useNavigate } from "react-router-dom";
import categoryservices from "../../sevices/category.service";
import Pagination from "@mui/material/Pagination";
import { toast } from "react-toastify";
import { useCartContext } from "../../context/cart.context";
import shared from "../../utils/shared";
import {  Button, FormControl,Select , InputLabel, MenuItem,TextField } from '@mui/material';

const Home = () => {
  const [sortby, setSortby] = useState("");
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
  const [categories, setCategories] = useState([]);
  const sort = (e) => {
    let value = e.target.value;
    console.log(value);
    setSortby(value);
    let b;

    bookRecord.items.sort((a, b) => {
      if (a.name < b.name) {
        return value === "A-Z" ? -1 : 1;
      }
      if (a.name > b.name) {
        return value === "A-Z" ? 1 : -1;
      }
      return 0;
    });
    setBookRecord(bookRecord);
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  const getAllCategories = () => {
    categoryservices.getAll().then((res) => {
      if (res.result) {
        setCategories(res.result);
      }
    });
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      // if(filters.keyWord==="") delete filters.keyWord;
      searchAllBooks({ ...filters });
    }, [filters]);
    return () => clearTimeout(timer);
  }, [filters]);
  const searchAllBooks = (filters) => {
    bookServices.getAll(filters).then((res) => {
      setBookRecord(res.result);
    });
  };
  const cartContext = useCartContext();

  const authContext = useAuthContext();
  const addToCart = (book) => {
    shared.addToCart(book, authContext.user.id).then((res) => {
      if (res.error) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        cartContext.updateCart();
      }
    });
  };

  return (
    <>
      <>
        <Wrapper>
          <h1>Book Listing</h1>

          <div className="container">
            <div className="row">
              <div className="col a">No. of Books: {bookRecord.totalItems}</div>
              <div className="col a">
              <TextField
                        type="text"
                        variant='outlined'
                        color='primary'
                        label="SEARCH..."
                        onChange={(e) => {
                            setFilters({
                              ...filters,
                              keyWord: e.target.value,
                              pageIndex: 1,
                            });
                          }}
                        fullWidth
                    />
              </div>
              
              <div className="col a">
              <FormControl color='primary' variant='outlined' fullWidth>
                         <InputLabel id="demo-simple-select-label">Sort By</InputLabel>   
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    variant='outlined'
                                    value={sortby}
                                    label="role"
                                    
                                    onChange={sort}
                                >
                                    <MenuItem value={"A-Z"}>A-Z</MenuItem>
                                    <MenuItem value={"Z-A"}>Z-A</MenuItem>
                                </Select>
                </FormControl>
               
              </div>
            </div>
            <div className="row">
              {bookRecord.items.length !== 0 ? (
                bookRecord.items.map((book,index) => {
                  return (
                    
                      <div className="card col-4" key={index}>
                        <img
                          src={book.base64image}
                          className="card-img-top"
                          alt="..."
                          height="200px"
                        />
                        <div className="card-body">
                          <h5 className="card-title">
                            {book.name.substring(0, 18) + "..."}
                          </h5>
                          <span className="category">{book.category}</span>
                          <p className="card-text">
                            {book.description.substring(0, 30)}
                          </p>
                          <p className="price">MRP. {book.price}</p>
                          <Button
                            className="btn-outline-primary btn"
                            variant="contained"
                            type="button"
                            color="primary"
                            onClick={()=>{
                                addToCart(book)
                            }}
                          >
                            Add to cart
                          </Button>
                        </div>
                      </div>
                    
                  );
                })
              ) : (
                <h3>No Books Found!!</h3>
              )}
              <div className="m-4">
                <Pagination
                  count={bookRecord.totalPages}
                  page={filters.pageIndex}
                  onChange={(e, newPage) => {
                    setFilters({ ...filters, pageIndex: newPage });
                  }}
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                  sx={{ alignContent: "center" }}
                />
              </div>
            </div>
          </div>
        </Wrapper>
      </>
    </>
  );
};

const Wrapper = styled.section`
  .pagination {
    display: flex;
    justify-content: center;
  }
  .row {
    margin-top: 2rem;
  }
  .form-select {
    width: 75%;
    display: inline;
  }
  .price {
    font-weight: bold;
    font-size: 20px;
    color: grey;
  }
  .sort {
    margin-left: 2rem;
  }
  .category {
    color: grey;
    font-weight: bold;
    font-size: 18px;
  }
  .description {
    height: 40px;
  }
  h1 {
    text-align: center;
    margin: 1rem;
  }
  h4 {
    font-weight: bold;
  }
  .card {
    width: 22%;
    padding: 0;
    margin: 1rem;
    box-shadow: 2px 2px 2px 2px lightgrey;
  }
  @media only screen and (max-width: 600px) {
    .card {
      width: 90%;
      padding: 0;
      margin: 1rem;
    }
    .a {
      width: 100%;
    }
  }
`;
export default Home;
