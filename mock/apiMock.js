var Mock = require('mockjs');
//http://mockjs.com/examples.html
exports.apiMock = function (Router) {
  Router.get('/getZoneList', function (req, res) {
    var json = Mock.mock({
      "code": "200",
      "content|1-10": [
        {
          "zoneId|+1": 0,
          "zoneName": /((杨浦)|(浦东)|(静安))[A-Z][0-9]区/
        }
      ],
      "message": "模拟mock成功"
    })
    res.json(json)
  })
  Router.get('/goods', function (req, res) {
    var json = require('./respone/goods.json')
    res.json(json)
  })
  Router.get('/seller', function (req, res) {
    var json = require('./respone/seller.json')
    res.json(json)
  })
  Router.get('/ratings', function (req, res) {
    var json = require('./respone/ratings.json')
    res.json(json)
  })
}
