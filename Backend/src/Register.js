
const bcrypt = require('bcrypt');

const db = require('./db');

const Joi = require('@hapi/joi');
module.exports =  {

    async save (params) {
        const { email, name, password, joined } = params;

        const schema = Joi.object({
            name: Joi.string().min(6).required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()

        })

        const {error} = schema.validate(params);
        if(error) {
            return  error.details[0].message;
        } else {
            const salt = await bcrypt.genSalt();
            let hashedPassword = await bcrypt.hash(password, salt);
    
            return db('users').returning('*').insert({ name: name, email: email, password: hashedPassword, joined: new Date() })

           
             
        }
     

        

      
               
        
    }
};