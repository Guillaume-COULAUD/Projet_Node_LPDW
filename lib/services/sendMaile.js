"use strict";

const { Service } = require('@hapipal/schmervice'); 
const nodemailer = require('nodemailer');

module.exports = class sendMaileService extends Service {

    async createTransporter() {
        const testAccount = await nodemailer.createTestAccount();
        return nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            },
        });
    }
    async sendMailSignIn(email) {
        const transporter = await this.createTransporter();
        const info = await transporter.sendMail({
            from: '"Moviethèque" <moviethque@gmail.com>',
            to: email, // list of receivers
            subject: 'Welcome in Moviethéque',
            text: 'Your registration has been taken into account.'
        });
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

    async sendMailCreatedMovie(movie) {
        const {User} = this.server.models();

        const transporter = await this.createTransporter();
        const usersEmail = await User.query().pluck('email').execute();

        const info = await transporter.sendMail({
            from: '"Moviethèque" <moviethque@gmail.com>',
            to: usersEmail.join(', '), 
            subject: 'A new movie has created',
            text: 'The movie ' + movie.titre + ' realized by ' + movie.realisateur + ' is now available.'
        });
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

   
}