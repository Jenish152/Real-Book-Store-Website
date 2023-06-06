import request from "./request";

const ENDPOINT = "api/category";

const getAll = async (filters) => {
  let url = `${ENDPOINT}/all`;
  if (filters) {
     url=`${ENDPOINT}?pageSize=${filters.pageSize}&pageIndex=${filters.pageIndex}`;
    if (filters.keyWord!=="") {
        url=`${ENDPOINT}?pageSize=${filters.pageSize}&pageIndex=${filters.pageIndex}&keyword=${filters.keyWord}`;
    }
  }
  return request.get(url).then((res) => {
    return res.result;
  });
};

const getById = async (id) => {
  const url = `${ENDPOINT}/byId?id=${id}`;
  return request.get(url).then((res) => {
    return res;
  });
};

const deleteCategory = async (id) => {
  const url = `${ENDPOINT}?id=${id}`;
  return request.delete(url).then((res) => {
    return res;
  });
};

const save = async (data) => {
  if (data.id) {
    const url = `${ENDPOINT}`;
    return request.put(url, data).then((res) => {
      return res;
    });
  } else {
    const url = `${ENDPOINT}`;
    return request.post(url, data).then((res) => {
      return res;
    });
  }
};

const categoryservices = { getAll, getById, deleteCategory, save };

export default categoryservices;