import fs from 'fs';
import path from 'path';
import UserModel from '../models/user';
import bcrypt from 'bcrypt';
import  jwt  from 'jsonwebtoken';
import PostModel from '../models/post';

const salt = bcrypt.genSaltSync(11);
const secret = 'dvklnsdvknslvn32980#$)sdfv^&sdlkn';

function getHome(requset, response) {
    
    return response.send("Home Controller")
}

async function postLogin(requset, response) {
    const { username, password } = requset.body;
    const userDoc = await UserModel.findOne({ username: username });
    
    if (!userDoc) {
        return response.status(404).json({
            message: 'user not found',
            isAuth: false,
        })
    }

    const isPasswordCompare = bcrypt.compareSync(password, userDoc.password);

    if (isPasswordCompare) {
        
        jwt.sign({ username, id:userDoc._id }, secret, {}, (err, token) => {
          if(err){ throw err };
          response.cookie('token', token).json({
            message: 'ok',
            isAuth: true
          });
        })
    }else {
        return response.status(400).json({
            message: 'wrong credentials',
            isAuth: false,
        })
    }
}

function getProfile(requset, response) {
    const { token } = requset.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
      if (err) throw err;
      response.json(info)
    })
}

function postLogout(requset, response) {
    response.cookie('token', '').json({isLoggedOut: true});
}

async function postRegister(requset, response) {
    // const { user, pwd } = requset.body;
    try {
        const userDoc = await UserModel.create({ 
            username: process.env.ADMIN_USER,
            password: bcrypt.hashSync(process.env.ADMIN_PASS, salt)
        });
        response.json(userDoc);

    } catch (error) {
        response.status(400).json(error);
    }
    // response.json({responseData: { user, pwd }})
}

async function postCreatePost(requset, response) {
    const { originalname, path } = requset.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    const currentPath = newPath.substring("public/".length);

    const { title, summery, content, cover } = requset.body;
    const postDoc = await PostModel.create({
        title,
        summery,
        content,
        cover: currentPath,
    })
   response.json(postDoc);
}

async function getPost(requset, response) {
    response.json(await PostModel.find());
}

async function getSinglePost(request, response) {
        const { id } = request.params;
        const postDoc = await PostModel.findById(id).exec();

        if (!postDoc) {
            return response.status(404).json({ error: 'Post not found' });
        }

        response.json(postDoc);
}

function getNotFound(requset, response) {
    return response.status(404).json({
        status: 404,
        message: "404 route not found"
    })
}

export { 
    getHome,
    postLogin,
    postRegister,
    getProfile,
    postCreatePost,
    getPost,
    getSinglePost,
    postLogout,
    getNotFound,
}