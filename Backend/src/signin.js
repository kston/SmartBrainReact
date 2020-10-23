const bcrypt = require('bcrypt');

const db = require('./db');

const Joi = require('@hapi/joi');
const { json } = require('body-parser');
const { string } = require('@hapi/joi');

module.exports = {
    async login(params) {
        const { email, password, joined } = params;

        // Form validation

        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })

        const {error} = schema.validate(params);
        if(error) {
            return  error.details[0].message;
        } else {
            //check if the user is saved in the DB
            const userPassword =  (await db('users').where({email: email,
                }).select( 'password').then(data => data.map(item => item.password)))[0]

             if(userPassword === null) {
                 return "user not registed"
             }  else {
                 
                if(await bcrypt.compare(password, userPassword)){

                    return db('login').returning('*').insert({  email: email, hash: userPassword, logintime: new Date() })
                    
                }else {
                    return "password not match"
                }
             }  
               
             
        }
    }
}