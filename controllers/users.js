'use strict'

module.exports = function (_, passport, User) {
    return {
        SetRouting: function (router) {
            router.get('/', this.landing);
            router.get('/chat', this.chat);
            router.get('/logout', this.logout);

            router.post('/signin', this.postSignin);
            router.post('/signup', this.postSignUp);
        },
        landing: function (req, res) {
            res.render('landing');
        },
        chat: function (req, res) {
            res.render('chat');
        },
        postSignin: passport.authenticate('local.login', {
            successRedirect: '/chat',
            failiureRedirect: '/',
            failiureFlash: true
        }),
        postSignUp: passport.authenticate('local.signup', {
            successRedirect: '/chat',
            failiureRedirect: '/chat',
            failiureFlash: true
        }),
        logout: function (req, res) {
            req.logout();
            req.session.destroy((err) => {
                res.redirect('/');
            });
        }
    }
}
