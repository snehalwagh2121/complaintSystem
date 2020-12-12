const dbObj=require('../server.js');
const { resolve } = require('path');
const officerOperations={
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
    },
    changeStatus(complaint){
        return new Promise((resolve, reject)=>{
            const changeStatus=`update complaint set status='${complaint.newComplaintStatus}' where cid=${complaint.complaintId}`;
            dbObj.db.query(changeStatus, (err, result)=>{
                console.log('query executed to change status :'+changeStatus);
                if(err){
                    reject('error while updating the status');
                }else{
                    resolve(result);
                }
            });
        })
    },
    officersContact(){
        return new Promise((resolve, reject)=>{
            const getContacts='select * from officers';
            dbObj.db.query(getContacts, (err, result)=>{
                if(err){
                    reject('error while fetching the officers contacts. Error: '+err);
                }else{
                    resolve(result);
                }
            })
        })
    }
}

module.exports=officerOperations;