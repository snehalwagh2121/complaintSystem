const dbObj=require('../server.js');
const userSchema=require('../models/userSchema.js');
const userOperations={
    getUsers(user){
       return new Promise((resolve, reject)=>{
           const authSql="select * from users where username='"+user.userId+"' and password ='"+user.password+"'";
           dbObj.db.query(authSql, (err, result)=>{
                console.log('query executed : '+authSql);
                if(err)
                    return reject( new Error({msg: err}));
                else if(result.length>0)
                    return resolve({msg: 'User created successfully'});
                else
                    return reject( new Error({msg: 'Invalid Username or Password'}))
                });
            })
    },
    createUser(user){
        return new Promise((resolve, reject)=>{
            const createSql="insert into users(phone, taluka, username, password) values ('"+user.contact+"','"+user.address+"','"+user.userId+"','"+user.password+"');";
            dbObj.db.query(createSql, (err, result)=>{
                console.log('query executed : '+createSql);
                if(err)
                    return reject( new Error({msg: err}));
                else
                    return resolve({msg: 'User created successfully'});
            });
        })
    }
}

module.exports=userOperations;
