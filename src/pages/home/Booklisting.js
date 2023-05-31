import {React,useMemo,useState,useEffect} from "react";
import {NavLink} from "react-router-dom";
import { useAuthContext } from "../../context/auth.context";
import styled from "styled-components";
import bookServices from "../../sevices/book.service";
import { Pagination } from "@mui/material";
const Booklisting=()=>{
  const [books,setAllBooks]=useState([]);
  const [sortby,setSortby]=useState("");
  const [text,setText]=useState("");
  const [page,setPage]=useState(0);
  const sort=(e)=>{
     let value=e.target.value;
     console.log(value);
     setSortby(value);
     let b;
    
         books.sort((a,b)=>{
            if(a.name<b.name)
            {
                return value==="A-Z"?-1:1;
            }
            if(a.name>b.name)
            {
                return value==="A-Z"?1:-1;
            }
            return 0;
        })
     setAllBooks(books);

  }

  const search=async(e)=>{
     setText(e.target.value);
    
    if(e.target.value)
    {
     res=await bookServices.searchBook(e.target.value);
     setAllBooks(res.result);
     setPage(Math.ceil(res.result.length/5))
    }
    else{
        res=await bookServices.getAllBooks();
        setAllBooks(res.result)
        setPage(Math.ceil(res.result.length/5))
    }
}
   let res;
    useEffect(()=>{
        const fetchData=async()=>{
            res=await bookServices.getAllBooks();
            setAllBooks(res.result)
            console.log("bookx",books);
            setPage(Math.ceil(res.result.length/5))
        }
       
        if(books.length===0)
            fetchData();
          
        
    },[])
    const authContext = useAuthContext();
    return(<>
    <>
    <Wrapper>
    <h1>Book Listing</h1>

    <div className="container">
        <div className="row">
            <div className="col a">
                No. of Books: {books.length}
            </div>
            <div className="col a">
            <input type="text" className="form-control" placeholder="search" onChange={search} value={text} aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
        <div className="col a">
       <span className="sort"> Sort:&nbsp;&nbsp;
        <select className="form-select" aria-label="Default select example" onChange={sort} value={sortby}>
            <option value="A-Z" selected  hidden>Choose Here</option>
          <option  value="A-Z">A-Z</option>
        <option  value="Z-A">Z-A</option>
        </select>
        </span>
        </div>
        </div>
    <div className="row">

{books.length!==0? books.map((book)=>{
    return(
    <>
    <div className="card col-4">
  <img src={book.base64image} className="card-img-top" alt="..." height="200px"/>
  <div className="card-body">
    <h5 className="card-title">{book.name.substring(0,18)+"..."}</h5>
    <span className="category">{book.category}</span>
    <p className="card-text">{ book.description.substring(0,30)}</p>
    <p className="price">MRP. {book.price}</p>
    <button className="btn btn-outline-primary" style={{position:"fixed",
    }}><NavLink  to="/cart" color="primary" style={{textDecoration:"none"}}>Add to Cart</NavLink></button>
  </div>
</div>
    
</>
    )
}):<h3>No Books Found!!</h3>}

</div>
<Pagination count={page} className="pagination" size="large" color="secondary"/>
    </div>
    </Wrapper>
    </>
    </>)
}

const Wrapper = styled.section`
.pagination{
    display:flex;
    justify-content:center;
}
.row{
    margin-top:2rem;
}
.form-select{
    width:75%;
    display:inline;
}
.price{
    font-weight:bold;
    font-size:20px;
    color:grey;
}
.sort{
    margin-left:2rem;
}
.category{
    color:grey;
    font-weight:bold;
    font-size:18px;
}
.description{
    height:40px;
}
 h1{
    text-align:center;
    margin:1rem;
 }
 h4{
    font-weight:bold;
 }
 .card{
    width:22%;
    padding:0;
    margin:1rem;
    box-shadow:2px 2px 2px 2px lightgrey;
 }
 @media only screen and (max-width: 600px) {
    .card{
        width:90%;
        padding:0;
        margin:1rem;
     }
     .a{
        width:100%;
     }
  }
`;
export default Booklisting;