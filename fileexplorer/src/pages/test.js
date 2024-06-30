import connect from '../util/connect.js'

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