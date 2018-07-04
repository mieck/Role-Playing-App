module.exports = function (app) {

    var Post = require('../controllers/Post.controller');

    app.post('/send_post', Post.SavePost);
    app.get('/list_posts', Post.ListPost);

};