const mongoose = require('mongoose');


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.DB_URL)
}

let db = mongoose.connection;
db.once('open', () => console.log('mongodb connect successfully :-)'))