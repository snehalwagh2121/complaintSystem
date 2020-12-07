class UserSchema {
    constructor(userId, password, Phone, district){
        this.userId =userId;
        this.password =password;
        this.Phone =Phone ;
        this.district= district;   
    }

    getUserId(){
        return this.userId;
    }
    setUserId(userId){
        this.userId=userId;
    }
    getPassword(){
        return this.password;
    }
    setPassword(password){
        this.password=password;
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

module.exports=UserSchema;