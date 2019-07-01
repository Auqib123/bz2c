
// const mongoose = require('../db/connection/connection')
const { CustomerModel } = require("../db/models/customer.model")

//Saving the customer data in database
const insertCustomers = async (customersData) => {
    try {
        for (let cd of customersData) {
            let customer = {
                "user_id": cd["user_id"],
                "name": cd["name"],
                "location": {
                    "type": 'Point',
                    "coordinates": [+cd.longitude, +cd.latitude]
                },


            }
            let customerDetail = new CustomerModel(customer)
            const result = await customerDetail.save()
            console.log("data saved", result)
        }
        return { msg: "saved data sucessfully" }
    }
    catch (err) {
        
        console.log(err)
        throw new Error(err)
    }
}
//Reading the customer data from database
const fetchCustomers = async (coordinates) => {
    try {
        let pipeline = [{
            $geoNear: {
                near: { type: "Point", coordinates },
                distanceField: "dist.calculated",
                maxDistance: 100000,
                distanceMultiplier: 0.001,
                spherical: true
            }
        },
        {
            $project: { _id: 0, name: 1, user_id: 1 }
        },
        {
            $sort: { user_id: 1 }
        },
        ]
        let data = await CustomerModel.aggregate(pipeline)
        return { data }
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

module.exports = {
    insertCustomers,
    fetchCustomers
};
