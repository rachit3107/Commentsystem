const request = require('request');

class Service {

    async getPosts() {
        return new Promise((resolve, reject) => {
            console.log('Here');
            let url = 'http://localhost:1337/api/posts';
            request.get(url, (err, res, body) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(body);
                }
            });
        });
    }
    async login(body) {
        return new Promise((resolve, reject) => {
            let url = 'http://localhost:1337/api/login';
            let options = {
                url: url,
                body: body,
                json: true
            }
            request.post(options, (err, res, body) => {
                if (err) {
                    reject(err);
                }
                else if(body===true){
                    resolve(body);
                }
                else{
                    reject(err);
                }
            });
        });
    }
    async getPostsData(id) {
        return new Promise((resolve, reject) => {
            let url = 'http://localhost:1337/api/getpostsdata?id=' + id;
            request.get(url, (err, res, body) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(JSON.parse(body));
                }
            });
        });
    }
    async postComment(data, id) {
        return new Promise((resolve, reject) => {

            let url = 'http://localhost:1337/api/postsdata?id=' + id;
            let options = {
                url: url,
                body: data,
                json: true
            }
            request.post(options, (err, res, body) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(body);
                }
            });
        });
    }
    async editComment(data, id) {
        return new Promise((resolve, reject) => {

            let url = 'http://localhost:1337/api/editdata?id=' + id;
            let options = {
                url: url,
                body: data,
                json: true
            }
            request.post(options, (err, res, body) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(body);
                }
            });
        });
    }
    async getCommentData(id) {
        return new Promise((resolve, reject) => {

            let url = 'http://localhost:1337/api/getcommentdata?id=' + id;
            console.log(url);
            request.get(url, (err, res, body) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(JSON.parse(body));
                }
            });
        });
    }
}

export default Service