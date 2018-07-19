module.exports = function (app) {

    var Post = require('../controllers/Post.controller');

    app.post('/send_post', Post.SavePost);
    app.get('/list_posts', Post.ListPost);
    app.post('/edit_post', Post.EditPost);
    app.post('/find_one_post', Post.findOnePost);

};