import request from "./request";
const ENDPOINT="api/book";

const searchBook = async (searchText) => {
    const url=`${ENDPOINT}/search?keyword=${searchText}`;
    return request.get(url).then((res)=>{
        return res;
    })
};
const getAll = async (filters) => {
    let url=`${ENDPOINT}?pageSize=${filters.pageSize}&pageIndex=${filters.pageIndex}`;
    if (filters.keyWord!=="") {
        url=`${ENDPOINT}?pageSize=${filters.pageSize}&pageIndex=${filters.pageIndex}&keyword=${filters.keyWord}`;
    }
    console.log(filters);
    return request.get(url).then((res)=>{
        console.log("calling");
        return res;
    })
};
const getAllBooks = async () => {
    const url=`${ENDPOINT}/all`;
    return request.get(url).then((res)=>{
        return res;
    })
};
const getPaginatedBooks= async () => {
    const url=`${ENDPOINT}`;
    return request.get(url).then((res)=>{
        return res;
    })
};
const getById = async (id) => {
    const url = `${ENDPOINT}/byId?id=${id}`;
    return request.get(url).then((res) => {
      return res.result;
    });
  };
  const save = async (data) => {
    if (data.id) {
      const url = `${ENDPOINT}`;
      return request.put(url, data).then((res) => {
        return res;
      });
    } else {
      console.log("dataaa:",data);
      const url = `${ENDPOINT}`;
      return request.post(url, data).then((res) => {
        return res;
      });
    }
  };
const deleteBook = async (id) => {
    console.log("deleted",id);
    const url = `${ENDPOINT}?id=${id}`;
    return request.delete(url).then((res) => {
      return res;
    });
  };
  
const bookServices={searchBook,getAllBooks,getPaginatedBooks,getAll,deleteBook,getById,save};
export default bookServices;