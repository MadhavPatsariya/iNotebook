const mongoose = require('mongoose');
const mongoDbUri = 'mongodb://localhost:27017/inotebook?directConnection=true';
const establishConnection = () => {
    try{
        mongoose.connect(mongoDbUri)
        console.log('Connection Established sucessfully!')
    }
    catch(error){
        console.log(error)
        process.exit()
    }
}

module.exports = establishConnection;