// const API_BASE = "http://localhost:8080/checkauth";//放https地址请求
const API_BASE = "https://www.renzhengbao.org/checkauth";//放https地址请求

module.exports = {
  API_INST_SEARCH: API_BASE + "/authInst/fuzzyQueryDetail",
  API_INST_DETAIL: API_BASE + "/authInst/query",
  API_INST_DETAIL_INFO: API_BASE + "/authInst/queryDetailByInstCode",
  API_USER_ADVICE: API_BASE + "/userAdvice/submit",
  API_INST_TOPN: API_BASE + "/authInst/getTopN",
  API_INST_HOTQUERY: API_BASE + "/authInst/hotQuery"
}
