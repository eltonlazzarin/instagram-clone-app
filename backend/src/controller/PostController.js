const Post = require('../models/Post');
const sharp = require('sharp'); // to resize img
const path = require('path');
const fs = require('fs'); // filesystem


module.exports = {
    async index(req, res){
        const posts = await Post.find().sort('-createdAt'); // pulls posts in descending order - new posts at the top of the feed
        
        return res.json(posts)
    },

    async store(req, res){
        const {author, place, description, hashtags} = req.body;
        const { filename: image } = req.file;

        const[name] = image.split('.');
        const fileName = `${name}.jpg`;

        await sharp(req.file.path) // resizes image to 500px
            // return res.json(req.file) all informations
             
            .resize(500)  // resize 500px
            .jpeg({quality: 70}) // 70% quality
            .toFile( // export to a new file
                path.resolve(req.file.destination, 'resizeds', fileName) // resolve to get to resize folder
            );

            fs.unlinkSync(req.file.path); // delete img from patch uploads, original file

        const post = await Post.create({ // await waits until finalized and put into database
            author,
            place,
            description,
            hashtags,
            image: fileName,
        })

        req.io.emit('post', post); // send a message with the post name with all data to io

        return res.json(post);
    }
};