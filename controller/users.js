const dbObj=require('../server.js');
const userSchema=require('../models/userSchema.js');
const { resolve } = require('path');
const userOperations={
    authenticate(user, isUser){
        console.log('is user: '+isUser);
       return new Promise((resolve, reject)=>{
           if(isUser)
            authSql="select * from users where username='"+user.userId+"' and password ='"+user.password+"'";
           else
            authSql="select * from officers where username='"+user.userId+"' and password ='"+user.password+"'";
            dbObj.db.query(authSql, (err, result)=>{
                console.log('query executed : '+authSql);
                if(err)
                    return reject( new Error({msg: err}));
                else if(result.length>0)
                    return resolve({user: result[0]});
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
                    return resolve({user: result[0]});
            });
        })
    },
    addComplaint(complaint,imageName,userId){
        return new Promise((resolve, reject)=>{
            const addComplaint= `insert into complaint(uid, complaint, image, district) values(${userId},'${complaint.grievanceDtl}','${imageName}','${complaint.district}')`;
            dbObj.db.query(addComplaint, (err, result)=>{
                console.log('query executed : '+addComplaint);
                if(err)
                    return reject( new Error({msg: err}));
                else
                    return resolve({msg: 'complaint regitered successfully'});
            });
        })
    },
    getAllComplaints(userId){
        return new Promise((resolve, reject)=>{
            // if()
            const getAllComplaints=`select * from complaint where uid= ${userId}`;
            dbObj.db.query(getAllComplaints, (err, result)=>{
                console.log('query executed to get tracking :'+getAllComplaints);
                if(err){
                    reject('error while fetching the complaints');
                }else{
                    resolve(result);
                }
            });
        });
    },
    getAllOfficerComplaints(officerId){
        return new Promise((resolve, reject)=>{
            const getAllComplaintsforOfficer=`select u.username, u.phone, c.* from complaint c left join users u on u.uid=c.uid left join officers f on f.taluka=c.district where f.fid=${officerId}`;
            dbObj.db.query(getAllComplaintsforOfficer, (err, result)=>{
                console.log('query executed to get tracking :'+getAllComplaintsforOfficer);
                if(err){
                    reject('error while fetching the complaints');
                }else{
                    resolve(result);
                }
            });
        });
        
    }
}

module.exports=userOperations;
