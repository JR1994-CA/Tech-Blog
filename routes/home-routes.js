const router = require('express').Router();

const { Post, User, Comment } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
        attributes: ['id', 'title', 'content', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'post_id',
                    'user_id',
                    'created_at',
                ],
                // Order the posts from most recent to least
                order: [['created_at', 'DESC']],

                // From the User table, include the post creator's user name
                // From the Comment table, include all comments
                include: { model: User, attributes: ['username'] },
            },
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'post_id',
                    'user_id',
                    'created_at',
                ],
                include: {
                    model: User,
                    attributes: ['username'],
                },
            },
        ],
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));

            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//LOGIN
router.get('/login', (req, res) => {
    // If a session exists, redirect the request to the homepage
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

//SIGNUP
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});


// get single post
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'content', 'title', 'created_at'],
        include: [
            {
              model: Comment,
              attributes: [
                'id',
                'comment_text',
                'post_id',
                'user_id',
                'created_at',
              ],
              include: { model: User, attributes: ['username'] },
            },
            {
              model: Comment,
              attributes: [
                'id',
                'comment_text',
                'post_id',
                'user_id',
                'created_at',
              ],
            },
          ],
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            const post = dbPostData.get({ plain: true });

            res.render('single-post', {
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;
