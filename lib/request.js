var db = 'requests';
var exports = module.exports = {};

function Request(url) {
    this.url = url;
    this.createDate = Date.now();
    this.executeDate = null;
    this.spider = null;
}

Request.prototype = {
    constructor: Request,
    getCreateDate: function () {
        return this.createDate;
    },
    getExecuteDate: function () {
        return this.executeDate;
    },
    getSpider: function () {
        return this.spider;
    },
    getUrl: function () {
        return this.url;
    },
};

exports.Request = Request;
exports.db = db;