import request from "./request";

const ENDPOINT = "api/user";

const getAllUsers = async (params) => {
    let url=`${ENDPOINT}?pageSize=${params.pageSize}&pageIndex=${params.pageIndex}`;
    if (params.keyWord!=="") {
        url=`${ENDPOINT}?pageSize=${params.pageSize}&pageIndex=${params.pageIndex}&keyword=${params.keyWord}`;
    }
  return request.get(url).then((res) => {
    return res.result;
  });
};

const getAllRoles = async () => {
  const url = `${ENDPOINT}/roles`;
  return request.get(url).then((res) => {
    return res.result;
  });
};

const getById = async (id) => {
  const url = `${ENDPOINT}/byId?id=${id}`;
  return request.get(url).then((res) => {
    return res.result;
  });
};

const deleteUser = async (id) => {
  const url = `${ENDPOINT}?id=${id}`;
  return request.delete(url).then((res) => {
    return res;
  });
};

const update = async (data) => {
  const url = `${ENDPOINT}`;
  return request.put(url, data).then((res) => {
    return res;
  });
};

const updateProfile = async (data) => {
  const dataa={"id": data.id,
  "email": data.email,
  "firstName": data.firstName,
  "lastName": data.lastName,
  "roleId": data.roleId,
  "role": data.role,
  "password": data.password};
  const url = `${ENDPOINT}`;
  console.log(dataa);
  return request.put(url, dataa).then((res) => {
    console.log(res);
    return res.result;
  });
};

const userService = {
  getAllUsers,
  getAllRoles,
  getById,
  deleteUser,
  update,
  updateProfile,
};

export default userService;