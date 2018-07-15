'use strict'

module.exports = function (_, passport, Users, async) {
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
            const name = req.params.name;

            async.parallel([
                function(callback){
                    Users.findOne({'username': req.user.username})
                        .populate('request.userId')
                        .exec((err,result)=>{
                            callback(err,result);
                        })
                }
            ],(err,results)=>{
                const result1 = results[0];
                res.render('chat', {title: 'anochat', user:req.user,data:result1});
            });
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
