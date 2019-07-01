const fs = require('fs')
const customerService = require("../../services/customer-service")

//fetch customers with a range [-6.257664, 53.339428]
const getCustomers = (req, res, next) => {
    customerService.fetchCustomers([-6.257664, 53.339428])
        .then((data) => res.status(200).json(data))
        .catch(err => res.json(err));
}

//fetch cutomers from seed and insert in DB
const createCustomers = (req, res, next) => {
    fs.readFile("./db/seeds/customers.txt", "utf-8", (err, data) => {
        if (err) {
            console.log(err)
            return res.status(404).json({ error: err })
        }
        let CustomersCollection = data.split("\n").map(JSON.parse);
        customerService.insertCustomers(CustomersCollection)
            .then((data) => res.status(200).json({ data: data }))
            .catch(err => res.json({ error: err,msg:"duplicate key error collection  or connection error with database" }));
    })
}
module.exports = {
    getCustomers,
    createCustomers
}