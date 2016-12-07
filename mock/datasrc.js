'use strict';
const qs = require('qs');
const mockjs = require('mockjs');
// const numeral = require('numeral');
const PAGESIZE = 10

let datasrcData = {};
if (!global.datasrcData) {
  const data = mockjs.mock({
    'data|20': [{
      'id|+1': 1,
     tbname: '@word' ,
     tbdesp: '@paragraph(0,2)',
     dbname: '@word',
     key: '@word(4, 10)',
     config: '@string',
     'fields|2-5': /[A-Z]{5,10}\,/,
     'cpstatus|1': ['start', 'stop'],
     cptbname: '@word',
     'cmpcfg|1': ['start', 'stop'],
     'indexcfg|0-3':[{
        'id|+1': 1,
        where: '@string',
        'type|1': ['TO_MANY', 'TO_ONE'],
        updatetime:'@datetime("yyyyMMdd HH:mm:ss")',
        size:'@natural',
        'status|1': ['uncpmt', 'cpmt'],
     }]
    }],
    page: {
      total: 20,
      current: 1
    }
  });
  datasrcData = data;
  global.datasrcData = datasrcData;
} else {
  datasrcData = global.datasrcData;
}

function truckData(data, cur, size){
  const pageSize = size || PAGESIZE;
  return data.slice((cur - 1) * pageSize, cur * pageSize);
}

module.exports = {

  'GET /api/dtsrc' (req, res) {
    const query = qs.parse(req.query);

    let newData = datasrcData.data.concat();

    if(query.id){

      const data = newData.filter(item => item.id == query.id);

      if(data.length > 0){

        setTimeout(function () {
          res.json({
            success: true,
            data: data[0],
          });
        }, 500);
      }else{
        setTimeout(function () {
          res.json({
            success: false,
            data: {},
            msg: 'ID is not existed!'
          });
        }, 500);
      }


    } else {
      const pageSize = query.pageSize || 10;
      const currentPage = query.page || 1;
      const data = truckData(datasrcData.data, currentPage);

      datasrcData.page.current = currentPage * 1;

      setTimeout(function () {
        res.json({
          success: true,
          data,
          page: datasrcData.page
        });
      }, 500);
    }

  },

  'POST /api/dtsrc' (req, res) {
    setTimeout(function () {
      const newData = qs.parse(req.body);
      const filterData = datasrcData.data.filter(item => item.tbname == newData.tbname);

      if(filterData.length){

        res.json({
          success: false,
          data: {},
          msg: 'Table Name is already existed!'
        });

      }else{

        const lastData = datasrcData.data[datasrcData.data.length - 1];

        newData.id = lastData.id + 1;

        newData.indexcfg = newData.indexcfg || [];

        datasrcData.data.push(newData);

        datasrcData.page.total = datasrcData.data.length;

        global.datasrcData = datasrcData;

        res.json({
          success: true,
          data: newData,
          msg: 'Created successfully!'
        });
      }

      
    }, 500);
  },

  'DELETE /api/dtsrc' (req, res) {
    setTimeout(function () {
      const query = qs.parse(req.body);

      datasrcData.data = datasrcData.data.filter(item => item.id != query.id);

      datasrcData.page.total = datasrcData.data.length;

      global.datasrcData = datasrcData;

      res.json({
        success: true,
        data: truckData(datasrcData.data, datasrcData.page.current),
        page: datasrcData.page
      });
    }, 500);
  },

  'PUT /api/dtsrc' (req, res) {
    setTimeout(function () {
      const editItem = qs.parse(req.body);

      editItem.id = +editItem.id;
      editItem.indexcfg = editItem.indexcfg || [];

      datasrcData.data = datasrcData.data.map(item => item.id == editItem.id ? editItem : item);
      //   function (item) {
      //   if (item.id == editItem.id) {
      //     return editItem;
      //   }
      //   return item;
      // });

      global.datasrcData = datasrcData;

      res.json({
        success: true,
        msg: 'Modified successfully!'
      });
    }, 500);
  }

};
