const User = require('./models/User')
const bcrypt = require('bcrypt')
async function createAdmin() {
    try {
        let user = await User.findOne({ email: 'adarsh@yopmail.com'});
        if(user) {
            console.log('user updated successfully...');
        } else {
            user = new User();
            user.firstName = 'Adarsh';
            user.lastName = 'Kumar';
            user.mobileNo = '8381868429'
            user.email = 'adarsh@yopmail.com';
            let password = bcrypt.hashSync('123456', 10);
            user.password = password;
            user.userType = 'admin';
            await user.save();
            console.log('user created successfully...');
        }
    } catch (err) {
        console.log(err)
    }
}
module.exports = createAdmin