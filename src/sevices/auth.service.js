import request from "./request";
const ENDPOINT="api/user";
const login=async(data)=>{
    const url=`${ENDPOINT}/Login`;
    console.log("call");
    return request.post(url,data).then((res)=>{
                return res;
    });
};
const create=async(data)=>{
    const url=`${ENDPOINT}`;
    console.log("call");
    return request.post(url,data).then((res)=>{
        return res;
    });
};
const authservice={
    create,
    login
}

export default authservice;