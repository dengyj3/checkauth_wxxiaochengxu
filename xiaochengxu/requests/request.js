var api = require('./api.js');
var utils = require('../utils/util.js');

/**
 * 网路请求
 */
function request(url, data, successCb, errorCb, completeCb) {
    wx.request({
        url: url,
        method: 'GET',
        data: data,
        success: function(res) {
            if (res.statusCode == 200)
                utils.isFunction(successCb) && successCb(res.data);
            else
                console.log('请求异常', res);
        },
        error: function() {
            utils.isFunction(errorCb) && errorCb();
        },
        complete: function() {
            utils.isFunction(completeCb) && completeCb();
        }
    });
}

/**
 * 搜索
 */
function requestSearchInstByKeyWord(data, successCb, errorCb, completeCb) {
  request(api.API_INST_SEARCH, data, successCb, errorCb, completeCb);
}

/**
 * 获取服务详细信息
 */
function requestInstDetail(id, data, successCb, errorCb, completeCb) {
  request(api.API_INST_DETAIL, data, successCb, errorCb, completeCb);
}

/**
 * 获取认证详情信息
 */
function requestInstDetailInfo(id, data, successCb, errorCb, completeCb) {
  request(api.API_INST_DETAIL_INFO, data, successCb, errorCb, completeCb);
}

/**
 * 关键字是否是tag
 */
function requestHasTag(tag, successCb, errorCb, completeCb) {
  request(api.API_INST_SEARCH, {tag: tag, count: 1}, successCb, errorCb, completeCb);
}
/**
 * 提交用户建议
 */
function requestUserAdvice(data, successCb, errorCb, completeCb){
  request(api.API_USER_ADVICE, data, successCb, errorCb, completeCb);
}
/**
 * 提交用户建议
 */
function requestGetTopN(data, successCb, errorCb, completeCb){
  request(api.API_INST_TOPN, data, successCb, errorCb, completeCb);
}
/**
 * 搜索
 */
function requestHotQuery(data, successCb, errorCb, completeCb) {
  request(api.API_INST_HOTQUERY, data, successCb, errorCb, completeCb);
}
module.exports = {
  requestSearchInstByKeyWord: requestSearchInstByKeyWord,
  requestInstDetail: requestInstDetail,
  requestInstDetailInfo : requestInstDetailInfo,
  requestUserAdvice: requestUserAdvice,
  requestGetTopN: requestGetTopN,
  requestHotQuery: requestHotQuery
}

