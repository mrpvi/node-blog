import mongoose from "mongoose";
const { Schema, model } = mongoose;


const PostSchema = new Schema({
    title: String,
    summery: String,
    content: String,
    cover: String,
}, {
    timestamps: true
});

const PostModel = model('Post', PostSchema);

export default PostModel;