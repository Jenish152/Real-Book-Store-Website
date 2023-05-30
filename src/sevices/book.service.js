import request from "./request";
const ENDPOINT="api/book";
const searchBook=async(searchtext)=>{
    const url=`${ENDPOINT}/search?keyword=${searchtext}`;
    console.log("call");
    return request.get(url).then((res)=>{
        
                return res;
    });
};
const bookservices={searchBook};
export default bookservices;
