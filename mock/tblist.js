'use strict';
const qs = require('qs');
const mockjs = require('mockjs');
const PAGESIZE = 10

let tableListData = {};
if (!global.tableListData) {
  const data = mockjs.mock({
    'data|20': [{
      'id|+1': 1,
     address: '@domain',
     usrname: '@name',
     password: '@string(6,10)',
     topic: /center-\d{1}-\d{1}/,
     'type|1':['oracle', 'mysql'],
     server:'@ip',
     'status|1': ['start', 'stop'],
     timestamp:'@datetime("yyyyMMdd HH:mm:ss")'
    }],
    page: {
      total: 20,
      current: 1
    }
  });
  tableListData = data;
  global.tableListData = tableListData;
} else {
  tableListData = global.tableListData;
}

function truckData(data, cur, size){
  const pageSize = size || PAGESIZE;
  return data.slice((cur - 1) * pageSize, cur * pageSize);
}

module.exports = {

  'GET /api/tblist' (req, res) {
    const query = qs.parse(req.query);

    let newData = tableListData.data.concat();
    
    const currentPage = query.page || 1;
    const data = truckData(tableListData.data, currentPage);

    tableListData.page.current = currentPage * 1;

    setTimeout(function () {
      res.json({
        success: true,
        data,
        page: tableListData.page
      });
    }, 500);

  },

  'POST /api/tblist' (req, res) {
    setTimeout(function () {
      const newData = qs.parse(req.body);
      const lastData = tableListData.data[tableListData.data.length - 1];

      newData.id = lastData.id + 1;

      tableListData.data.push(newData);

      tableListData.page.total = tableListData.data.length;

      global.tableListData = tableListData;

      res.json({
        success: true,
        data: truckData(tableListData.data, tableListData.page.current),
        page: tableListData.page
      });
    }, 500);
  },

  'DELETE /api/tblist' (req, res) {
    setTimeout(function () {
      const query = qs.parse(req.body);

      tableListData.data = tableListData.data.filter(item => item.id != query.id)

      tableListData.page.total = tableListData.data.length;

      global.tableListData = tableListData;

      res.json({
        success: true,
        data: truckData(tableListData.data, tableListData.page.current),
        page: tableListData.page
      });
    }, 500);
  },

  'PUT /api/tblist' (req, res) {
    setTimeout(function () {
      const editItem = qs.parse(req.body);

      tableListData.data = tableListData.data.map(item => item.id == editItem.id ? editItem: item);
      
      global.tableListData = tableListData;

      res.json({
        success: true,
        data: tableListData.data,
        page: tableListData.page
      });
    }, 500);
  }

};
