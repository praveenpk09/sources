const express = require('express');

var cors = require('cors');

var app = express();

var mongo = require('mongodb');
var multer =require('multer');
var bodyParser = require('body-parser');
app.use(bodyParser.json())
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt');
const saltRounds = 10;
var url = "mongodb+srv://myntraassesment:B3T9qQMjiX8KeuqF@myntra.hymre.mongodb.net/myntra";

app.use(cors());
  
const fileStorageEngine =multer.diskStorage({
    destination:(req,file,cb) =>{
    cb(null, './assets')
    },
    filename: (req,file,cb) =>{
        cb(null, Date.now() + "--" + file.originalname);
    },
});
const upload = multer({
    storage:fileStorageEngine
});
app.post("/single",upload.single("image"),
(req,res) => {
    console.log("req",req.file);
    res.send("single file upload success")
});
app.post('/signup', (req, res) => {

    console.log("Backend req", req.body);
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("myntra");

        var num = req.body.phonenumber;
        var name = req.body.firstname;
        var gmail = req.body.email;
        var setpasswords = req.body.confirm;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(setpasswords, salt);
        var myobj = {
            firstname: name,
            Phonenumber: num,
            email: gmail,
            password: hash
        }
        dbo.collection("customer").insertOne(myobj, function (err, result) {
            if (err) throw err;
            // if(result=='' || result== null){
            //     return result.status(200).json({
            //         status:false,
            //         description: "no products to display"
            //     })
            // }else{
            // if(res.status(200)){

            return res.status(200).json({
                status: true,
                description: result
                //     })
                // }else{
                //     return res.status.json({
                //         status:false,
                //         description:result
                //     }) 
            })
        }

        )

    })
})
app.use(bodyParser.json());
app.get('/productlists', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("myntra");
        // var userId=localStorage.getItem('userId')
        // console.log(userId)

        dbo.collection("products").find({}).toArray(function (err, result) {
            if (err) throw err;
            if (result == '' || result == null) {
                return result.status(200).json({
                    status: false,
                    description: "no products to display"
                })
            } else {
                return res.status(200).json({
                    status: true,
                    description: result
                })
            }

        })

    })
})
app.get('/myorders', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("myntra");
        dbo.collection("transaction").find({}).toArray(function (err, result) {
            if (err) throw err;
            // console.log('result',result)
            if (result == '' || result == null) {
                return result.status(200).json({
                    status: false,
                    description: "no products to display"
                })
            } else {
                return res.status(200).json({
                    status: true,
                    description: result
                })
            }

        })

    })
})
app.post('/profile', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("myntra");
        // var userId=localStorage.getItem('userId')
       console.log('req',req)
        var User = req.body.user;
        console.log('id',req.body.user)
        dbo.collection("customer").find({_id:ObjectId(User)}).toArray(function (err, result) {
            console.log(result)
            if (err) { throw err;

            }else {
                return res.status(200).json({
                    status: true,
                    description: result
                })
            }

        })

    })
})
// app.get('/username', (req, res) => {
//     MongoClient.connect(url, function (err, db) {
//         if (err) throw err;
//         var dbo = db.db("myntra");
//         dbo.collection("user").find({firstname}).toArray(function (err, result) {
//             if (err) throw err;
//             if (result == '' || result == null) {
//                 return result.status(200).json({
//                     status: false,
//                     description: "no products to display"
//                 })
//             } else {
//                 return res.status(200).json({
//                     status: true,
//                     description: result
//                 })
//             }

//         })

//     })
// })
app.post('/login', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("myntra");
        console.log(req.body);
        var Email = req.body.email;
        var Password = req.body.password;
        // dbo.collection("customer").find({email:Email}).toArray(function(err,result)
        // {
        //     console.log("chek", result[0].password)
        //     hashpassword=result[0].password;
        // })
        // bcrypt.compareSync(Password,hashpassword)


        dbo.collection("customer").find({email:Email}).toArray(function (err, result) {
            hashpassword = result[0].password;
            if (bcrypt.compareSync(Password, hashpassword)) {



                console.log(result)
                if (err) throw err;
                if (result == '' || result == null) {
                    return res.status(200).json({
                        status: false,
                        description: "User not found"
                    })
                } else {
                    return res.status(200).json({
                        status: true,
                        description: result
                    })
                }

            }else{
                return res.status(200).json({
                    status:false,
                    description:"Password not found"
                })
            }
        })

    })

})
app.post('/checkout', (req, res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("myntra");
  var Data = req.body.details;
  var userData=req.body.user;
//   var time=req.body.displaytime;
  var date=req.body.displayDate;
  console.log('Neram',date)
  var obj={
    users:userData,
    // displaytime:time,
    displayDate:date,
      productData:Data,
      
      
  }
  
  dbo.collection("transaction").insertOne(({obj:obj}), function (err, result) {
      console.log(obj)
      if (err) throw err;
      if (result == '' || result == null) {
          return res.status(200).json({
              status: false,
              description: "Products not found"
          })
      } else {
          return res.status(200).json({
              status: true,
              description: result
          })
      };
  });
});
})
app.post('/update', (req, res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("myntra");
  var User = req.body.user;
  var updat = req.body.firstname;
  var myquery={_id:ObjectId(User)};
  console.log('id',myquery)
  var newValues={$set:{firstname:updat}}
        dbo.collection("customer").updateOne(myquery,newValues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
});
})
app.post('/productlist', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("myntra");
        var myobj = [{
            id: 1,
            category: "Chudi",
            price: 100,
            prod_image: "../images/111.jpg",
            name: "From delhi",
        }, {
            id: 3,
            category: "Kurta Sets",
            price: 299,
            prod_image: "../images/113.jpg",
            name: "From Tamilnadu",
            gender: "girls"
        },
        {
            id: 4,
            category: "Lehanga",
            price: 399,
            prod_image: "../images/114.jpg",
            name: "From Dubai",
            gender: "boys"
        },
        {
            id: 5,
            category: "Kurta Sets",
            price: 499,
            prod_image: "../images/115.jpg",
            name: "From Kerala",
            gender: "girls"
        },
        {
            id: 6,
            category: "Kurtas",
            price: 599,
            prod_image: "../images/1.jpg",
            name: "From Mumbai",
            gender: "boys"
        },
        {
            id: 7,
            category: "Kurta Sets",
            price: 699,
            prod_image: "../images/2.jpg",
            name: "From Tamilnadu",
            gender: "girls"
        },
        {
            id: 8,
            category: "Kurtas",
            price: 799,
            prod_image: "../images/3.jpg",
            name: "From Dubai",
            gender: "boys"
        },
        {
            id: 9,
            category: "Kurtas",
            price: 899,
            prod_image: "../images/4.jpg",
            name: "From Kerala",
            gender: "girls"
        },
        {
            id: 10,
            category: "Lehanga",
            price: 999,
            prod_image: "../images/5.jpg",
            name: "From Mumbai",
            gender: "boys"
        },
        {
            id: 12,
            category: "Kurta Sets",
            price: 199,
            prod_image: "../images/6.jpg",
            name: "From Tamilnadu",
            gender: "boys"
        },
        {
            id: 13,
            category: "Lehanga",
            price: 699,
            prod_image: "../images/7.jpg",
            name: "From Dubai",
            gender: "girls"
        },
        {
            id: 14,
            category: "Kurtas",
            price: 599,
            prod_image: "../images/8.jpg",
            name: "From Kerala",
            gender: "girls"
        },
        {
            id: 15,
            category: "Kurtas",
            price: 199,
            prod_image: "../images/9.jpg",
            name: "From Mumbai",
            gender: "boys"
        },
        {
            id: 16,
            category: "Kurta Sets",
            price: 899,
            prod_image: "../images/10.jpg",
            name: "From Tamilnadu",
            gender: "boys"
        },
        {
            id: 17,
            category: "Kurta Sets",
            price: 699,
            prod_image: "../images/11.jpg",
            name: "From Dubai",
            gender: "girls"
        },
        {
            id: 18,
            category: "Clothing sets",
            price: 599,
            prod_image: "../images/12.jpg",
            name: "From Kerala",
            gender: "boys"
        },
        {
            id: 19,
            category: "Lehangap",
            price: 799,
            prod_image: "../images/13.jpg",
            name: "From Mumbai",
            gender: "boys"
        },
        {
            id: 20,
            category: "Kurta",
            price: 899,
            prod_image: "../images/14.jpg",
            name: "From Tamilnadu",
            gender: "boys"
        },
        {
            id: 21,
            category: "Kurta Sets",
            price: 699,
            prod_image: "../images/15.jpg",
            name: "From Dubai",
            gender: "girls"
        },
        {
            id: 22,
            category: "Clothing sets",
            price: 599,
            prod_image: "../images/16.jpg",
            name: "From Kerala",
            gender: "boys"
        },
        {
            id: 23,
            category: "Kurtas",
            price: 799,
            prod_image: "../images/17.jpg",
            name: "From Mumbai",
            gender: "boys"
        },
        {
            id: 24,
            category: "Kurta",
            price: 899,
            prod_image: "../images/18.jpg",
            name: "From Tamilnadu",
            gender: "girls"
        },
        {
            id: 25,
            category: "Clothing sets",
            price: 699,
            prod_image: "../images/19.jpg",
            name: "From Dubai",
            gender: "girls"
        },
        {
            id: 26,
            category: "Clothing sets",
            price: 599,
            prod_image: "../images/20.jpg",
            name: "From Kerala",
            gender: "boys"
        },
        {
            id: 27,
            category: "Clothing sets",
            price: 799,
            prod_image: "../images/21.jpg",
            name: "From Mumbai",
            gender: "girls"
        },
        {
            id: 28,
            category: "Kurta",
            price: 899,
            prod_image: "../images/22.jpg",
            name: "From Tamilnadu",
            gender: "girls"
        },
        {
            id: 29,
            category: "Shall",
            price: 699,
            prod_image: "../images/23.jpg",
            name: "From Dubai",
            gender: "boys"
        },
        {
            id: 30,
            category: "Shall",
            price: 599,
            prod_image: "../images/24.jpg",
            name: "From Kerala",
            gender: "boys"
        },
        {
            id: 31,
            category: "Shall",
            price: 799,
            prod_image: "../images/25.jpg",
            name: "From Mumbai",
            gender: "boys"
        },
        {
            id: 32,
            category: "Kurta",
            price: 899,
            prod_image: "../images/26.jpg",
            name: "From Tamilnadu",
            gender: "girls"
        },
        {
            id: 34,
            category: "Sherwani",
            price: 699,
            prod_image: "../images/27.jpg",
            name: "From Dubai",
            gender: "boys"
        },
        {
            id: 33,
            category: "Shall",
            price: 599,
            prod_image: "../images/28.jpg",
            name: "From Kerala",
            gender: "girls"
        },
        {
            id: 34,
            category: "Shall",
            price: 799,
            prod_image: "../images/112.jpg",
            name: "From Mumbai",
            gender: "boys"
        },
        {
            id: 35,
            category: "Lehanga",
            price: 899,
            prod_image: "../images/113.jpg",
            name: "From Tamilnadu",
            gender: "girls"
        },
        {
            id: 36,
            category: "Sherwani",
            price: 699,
            prod_image: "../images/114.jpg",
            name: "From Dubai",
            gender: "boys"
        },
        {
            id: 37,
            category: "Shall",
            price: 599,
            prod_image: "../images/115.jpg",
            name: "From Kerala",
            gender: "boys"
        },
        {
            id: 38,
            category: "Sherwani",
            price: 799,
            prod_image: "../images/112.jpg",
            name: "From Mumbai",
            gender: "boys"
        },
        {
            id: 39,
            category: "Kurta",
            price: 899,
            prod_image: "../images/113.jpg",
            name: "From Tamilnadu",
            gender: "boys"
        },
        {
            id: 30,
            category: "Sherwani",
            price: 699,
            prod_image: "../images/114.jpg",
            name: "From Dubai",
            gender: "boys"
        },
        {
            id: 41,
            category: "Sherwani",
            price: 599,
            prod_image: "../images/115.jpg",
            name: "From Kerala",
            gender: "boys"
        },
        {
            id: 42,
            category: "Sherwani",
            price: 799,
            prod_image: "../images/112.jpg",
            name: "From Mumbai",
            gender: "boys"
        },
        {
            id: 43,
            category: "Kurta",
            price: 899,
            prod_image: "../images/113.jpg",
            name: "From Tamilnadu",
            gender: "boys"
        },
        {
            id: 44,
            category: "Lehanga",
            price: 699,
            prod_image: "../images/114.jpg",
            name: "From Dubai",
            gender: "boys"
        },
        {
            id: 45,
            category: "Shall",
            price: 599,
            prod_image: "../images/115.jpg",
            name: "From Kerala",
            gender: "boys"
        },
        {
            id: 46,
            category: "Kurtas",
            price: 599,
            prod_image: "../images/1.jpg",
            name: "From Mumbai",
            gender: "boys"
        },
        {
            id: 47,
            category: "Kurta Sets",
            price: 699,
            prod_image: "../images/2.jpg",
            name: "From Tamilnadu",
            gender: "girls"
        },
        {
            id: 48,
            category: "Kurtas",
            price: 799,
            prod_image: "../images/3.jpg",
            name: "From Dubai",
            gender: "boys"
        },
        {
            id: 49,
            category: "Kurtas",
            price: 899,
            prod_image: "../images/4.jpg",
            name: "From Kerala",
            gender: "girls"
        },
        {
            id: 50,
            category: "Lehanga",
            price: 999,
            prod_image: "../images/5.jpg",
            name: "From Mumbai",
            gender: "boys"
        },

        ];
        dbo.collection("products").insertMany(myobj, function (err, result) {
            if (err) throw err;
            if (result == '' || result == null) {
                return res.status(200).json({
                    status: false,
                    description: "no products to display"
                })
            } else {
                return res.status(200).json({
                    status: true,
                    description: result
                })
            }
            db.close();
        });
    });
})

app.listen(8090, () => console.log('Assessment1 api runs on http://localhost:8090/'));