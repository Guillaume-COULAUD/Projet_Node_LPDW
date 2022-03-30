"use strict";

const { Service } = require('@hapipal/schmervice'); 
const Nodemailer = require('nodemailer');

module.exports = class sendMaileService extends Service {

    async createTransporter() {
        const testAccount = await Nodemailer.createTestAccount();
        return Nodemailer.createTransport({
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
        console.log('Preview URL: %s', Nodemailer.getTestMessageUrl(info));
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
        console.log('Preview URL: %s', Nodemailer.getTestMessageUrl(info));
    }

    async sendEmailUpdateFavMovie(movie) {
        const {User} = this.server.models();
        const {Moviefav} = this.server.models();

        const transporter = await this.createTransporter();
        const users = await Moviefav.query().where({ movie }).pluck('user').execute();
        if (users.length !== 0) {
            const emails = await User.query().pluck('email').whereIn( 'id', users).execute();

            const info = await transporter.sendMail({
                from: '"Moviethèque" <moviethque@gmail.com>',
                to: emails.join(', '),
                subject: 'Your favorite movie has been updated',
                text: 'Good news! One of your favorite movie has been updated!'
            });
            console.log('Preview URL: %s', Nodemailer.getTestMessageUrl(info));
        }
    }

    

   
}