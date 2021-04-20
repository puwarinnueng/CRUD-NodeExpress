//routes เอาไว้ เข้าถึงข้อมูล เพิ่มข้อมูล ลบข้อมูล อัปเดตข้อมูล
const { query, request } = require('express');
let express = require('express');
let router = express.Router();
//import file เชื่อม database
let dbCon = require('../lib/db');


//แสดงข้อมูลหนังสือ //get คือดึงออกมา
router.get('/', (req, res, next) => {
    //query ข้อมูลใน db //method query //rowsเป็น callback function ที่เก็บค่าที่ดึงมา
    dbCon.query('SELECT * FROM books ORDER BY id asc', (err, rows ,result) => {
        //  if(err){
        //      req.flash('error', err);
        //      res.render('books', { data: '' });
        //  }
        //  else{
        //      res.render('books', { data: rows });
        //  }
        res.send(rows)
       
    })
});

//โหลดหน้า add book
router.get('/add',function(req,res,next) {
     res.render('books/add',{
         name: '',
         auther: ''
     })
    //  res.redirect('/books')
})
//เพิ่มข้อมูลหนังสือใหม่
router.post('/add',function(req,res,next){
    let name = req.body.name;
    let auther = req.body.auther;
    let errors = false; 

    if(name.length === 0 || auther.length === 0){
         errors = true;
         //set flash message
         req.flash('error','Please enter name and auther');
         //render to add.ejs with flash message
         res.render('books/add',{
             name: name,
             auther: auther
         })
    }

    //if no error //สร้างตัวแปรมาเก็บข้อมูลจาก form
    if(!errors){
          let form_data = {
              name: name,
              auther: auther
          }
          //insert data
          dbCon.query('INSERT INTO books set ?', form_data, function(err,result){
              if(err){
                  req.flash('error' , err)

                  res.render('books/add',{
                      name: form_data.name,
                      auther: form_data.auther
                  })
              }else{
                  req.flash('success','Book successfully add');
                  res.redirect('/books')
              }
          })
    }
})

//โหลดหน้า edit book
router.get('/edit/(:id)',function(req,res,next) {
    // สร้างตัวแปรมาเก็บ id
    let id = req.params.id;

    dbCon.query('select * from books where id = ' +id,function(err,rows,fields){
        if(rows.length <= 0){
            req.flash('error','book not found id' + id)
            res.redirect('/books');
        }else{
            res.render('books/edit',{
                title: 'edit book',
                id: rows[0].id,
                name: rows[0].name,
                auther: rows[0].auther
            })
        }
    });
});

// ส่งข้อมูลไปแก้ไข update
router.post('/update/:id',function(req,res,next){
    //เอาข้อมูลมาจาก from
    let id = req.params.id;
    let name = req.body.name;
    let auther = req.body.auther;
    let errors = false;

    if(name.length === 0 || auther.length === 0){
        errors = true;
        res.flash('error','please enter name and');
        res.render('books/edit',{
            id: req.params.id,
            name: name,
            auther: auther

        })
    }
    //if no error
    if(!errors){
        let form_data = {
             name: name,
             auther: auther
        }
        //update query
        dbCon.query("update books set ? where id=" + id, form_data,(err,result)=>{
              if(err){
                  req.flash('error',err);
                  res.render('books/edit', {
                      id: req.params.id,
                      name: form_data.name,
                      auther: form_data.auther
                  })
              }else{
                  req.flash('success','book update');
                  res.redirect('/books');
              }
        })
    }
})

//ลบข้อมูล
router.get('/delete/(:id)',function(req,res,next){
    let id = req.params.id;

    dbCon.query('delete from books where id=' + id, function(err,sesult){
    
        if(err){
            req.flash('error',err),
            res.redirect
        }else{
            req.flash('success','book delete');
            res.redirect('/books')
        }
    })
})

module.exports = router;