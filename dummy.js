const mongoose = require('mongoose');
const User = require(__dirname+'/user');

mongoose.connect("mongodb://localhost:27017/naman_tsf_db");

const dummyUsers = [
    {
        name: 'Amit',
        mnumber:9867657885,
        email: 'amit80@gmail.com',
        credits: 10000
    },
    {
        name: 'Arjun',
        mnumber:9866657885,
        email: 'arjun199@gmail.com',
        credits: 7000
    },
    {
        name: 'Yashi',
        mnumber:9867674856,
        email: 'yashi@gmail.com',
        credits: 4500
    },
    {
        name: 'Vaibhavi',
        mnumber:9867657646,
        email: 'ios@yahoo.com',
        credits: 8600
    },
    {
        name: 'Kunika',
        mnumber:9867656535,
        email: 'kunika@gmail.com',
        credits: 7500
    },
    {
        name: 'Rewa',
        mnumber:9867647885,
        email: 'rewa@yahoo.com',
        credits: 6900
    },
    {
        name: 'Karimi',
        mnumber:9867657775,
        email: 'karimi09@gmail.com',
        credits: 3000
    },
    {
        name: 'Aman',
        mnumber:9867658765,
        email: 'aman32@yahoo.com',
        credits: 2100
    },
    {
        name: 'Vikrant',
        mnumber:9867699995,
        email: 'vikrant87@gmail.com',
        credits: 5300
	}
]

User.insertMany(dummyUsers,function(err,res){
  if(err){
    console.log(err);
  }else{
    console.log(res);
  }
});
