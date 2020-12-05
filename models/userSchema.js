class UserSchema {
    constructor(fName, lName, Phone, district){
        this.fName =fName;
        this.lName =lName;
        this.Phone =Phone ;
        this.district= district;   
    }

    getfName(){
        return this.fName;
    }
    setfName(fName){
        this.fName=fName;
    }
    getlName(){
        return this.lName;
    }
    setlName(lName){
        this.lName=lName;
    }
    getPhone(){
        return this.Phone;
    }
    setPhone(Phone){
        this.Phone=Phone;
    }
    getdistrict(){
        return this.district;
    }
    setdistrict(district){
        this.district=district;
    }
}

module.exports.UserSchema=UserSchema;