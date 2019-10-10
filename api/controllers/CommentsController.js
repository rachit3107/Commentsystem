


let posts = [
    {
        'Id': 1,
        'title': 'Basics of NodeJs',
        'data': 'All about NodeJs. You can learn NodeJs from https://www.w3schools.com/nodejs/nodejs_intro.asp.',
        'comments': []
    },
    {
        'Id': 2,
        'title': 'Basics of ReactJs',
        'data': 'All about ReactJs. You can learn ReactJs from https://www.w3schools.com/whatis/whatis_react.asp.',
        'comments': []
    }
];
let users = [
    {
        'username': 'rachit3107',
        'password': 'tophire'
    },
    {
        'username': 'tophire',
        'password': 'tophire'
    },
    {
        'username': 'rentmojo',
        'password': 'tophire'
    }
];

module.exports = {
    async login(req, res) {
        let userF = req.body;
        console.log(userF);
        let response = users.find(user => {
            return user.username == userF.email
        });
        if (response.password == userF.password) {
            res.json(true);
        }
        else {
            res.json(false);
        }
    },
    async getPosts(req, res) {
        res.set("Access-Control-Allow-Origin", "*");
        res.json(posts);
    },
    async getPostsData(req, res) {
        let response = posts.find(post => {
            return post.Id == req.query.id
        });
        res.set("Access-Control-Allow-Origin", "*");
        let comments = await Comment.find({
            postId: req.query.id,
            parentComment: 0
        });
        response['comments'] = comments;
        return res.json(response);
    },
    async postData(req, res) {
        try {
            let date = new Date();
            let commentId = date.getMonth() + '' + date.getDate() + date.getYear() + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds();
            if (req.body.parentObject) {
                let comment = await Comment.findOne({
                    commentId: req.body.parentObject
                });
                console.log('Helloo', comment);
                await Comment.create({
                    commentId: commentId,
                    commentData: req.body.content,
                    parentComment: req.body.parentObject,
                    postId: comment.postId,
                    user: req.body.user
                });
            }
            else {
                await Comment.create({
                    commentId: commentId,
                    commentData: req.body.content,
                    postId: req.query.id,
                    user: req.body.user
                });
            }
            // let responseObj ={
                
            // }
            res.set("Access-Control-Allow-Origin", "*");
            res.json(commentId);
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    },
    async getCommentData(req, res) {
        let comments = await Comment.find({
            parentComment: req.query.id
        })
        console.log(comments);
        res.json(comments);
    },
    async getChildCommentData(req, res) {
        try {
            let commentData = await Comment.find({
                parentComment: req.query.id
            });
            res.json(commentData);
        } catch (err) {

        }
    },
    async deleteData(req, res) {
        try {
            let data = await Comment.destroy({});
            res.json(data);
        } catch (err) {
            console.log(err);
            res.json('Noo')
        }
    },
    async editData(req, res){
        let id = req.query.id;
        await Comment.updateOne({ commentId:id })
        .set({
            commentData:req.body.data
        });
        res.json(200);
    }
}