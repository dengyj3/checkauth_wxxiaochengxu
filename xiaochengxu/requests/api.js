const API_BASE = "http://localhost:8080/checkauth/authInst";//放https地址请求

module.exports = {
  API_INST_SEARCH: API_BASE + "/fuzzyQueryDetail",
  API_INST_DETAIL: API_BASE + "/query",
  API_INST_DETAIL_INFO: API_BASE + "/queryDetailByInstCode"
}
