// test.js
import axios from "axios";

import dayjs from 'dayjs'


const formattedTime = dayjs().format('YYYY-MM-DD');
const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const connect = {
  eroll: (ref) => {
    const url = 'http://127.0.0.1:8443/api/eroll';
    const data = {
      id: rand(1000, 9999),
      username: ref.name,
      password: ref.password
    };
    return axios.post(url, data);
  },

  Login: (ref) => {
    const url = 'http://127.0.0.1:8443/api/login';
    const data = {
      username: ref.name,
      password: ref.password
    };
    return axios.post(url, data);
  },

  insertNote: (ref) => {
    const url = 'http://127.0.0.1:8443/api/insert';
    const data = {
      userid: ref.userid,
      noteid:rand(1,100000),
      title:ref.title,
      date:formattedTime,
      info:ref.info,
    };
    return axios.post(url, data);
  },

  getAllNote: (ref) => {
    const url = 'http://127.0.0.1:8443/api/getAll';
    const data = {
      userid: ref.userid,
    };
    return axios.post(url, data);
  },
  delete: (ref) => {
    const url = 'http://127.0.0.1:8443/api/delete';
    const data = {
      userid: ref.userid,
      noteid: ref.noteid,
    };
    return axios.post(url, data);
  },
  update: (ref) => {
    const url = 'http://127.0.0.1:8443/api/modify';
    const data = {
      userid: ref.userid,
      noteid: ref.noteid,
      title:ref.title,
      info:ref.info,
      date:formattedTime,
    };
    return axios.post(url, data);
  }
};

export default connect;
 //alert(window.innerHeight)
    /*alert(this.headBarHeight)*/
    /*
    connect.Login({
      name: '张三',
      password: '123456'
    }).then(res => {
      console.log(res)
    })
    
    connect.insertNote({
      userid:1001,
      title:'123',
      info:'hahaha',
    }).then(res => {
      console.log(res)
    })
    
    connect.getAllNote({
      userid:1001,
    }).then(res => {
      console.log(res)
    })
      
      connect.delete({
      userid:1001,
      noteid:1
    }).then(res => {
      console.log(res)
    })
      
      connect.update({
      userid:1001,
      noteid:4023,
      title:'对吧',
      info:'是这样的'
    }).then(res => {
      console.log(res)
    })
      */