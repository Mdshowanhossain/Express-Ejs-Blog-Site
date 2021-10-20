const express = require('express');
const Blog = require('../../models/blogSchema');
const PopularBlog = require('../../models/popularBlog/popularBlog')
const auth = require('../../middlewares/auth');
const router = express.Router();
const sohan = require('../../middlewares/sohan');


const RegistrationSchema = require('../../models/registration');



router.get('/', sohan, async  (req, res) => {
    try {
        const findAdmin = await RegistrationSchema.findOne({ role: 'admin' });
        // res.render('admin')



            const adminBlogData = await Blog.find();




            res.render('admin.ejs', { adminBlogData: adminBlogData });
    

    } catch (err) {
        console.log(err.message)
    }
});

router.get('/:id',sohan, async (req, res) => {
    try {
        const editBlog = await Blog.findById({ _id: req.params.id });
        res.render('adminEditBlog', { editBlog: editBlog });
    } catch (err) {
        console.log(err.message);
    }
});

router.post('/adminedit/:id',sohan, async (req, res) => {
    const { category, title, description } = req.body;
    try {
        await Blog.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                category: category,
                title: title,
                description: description,
            }
        });
        res.redirect('/admin')
    } catch (err) {
        console.log(err.message);
    }
});

router.get('/delete/:id',sohan, async (req, res) => {
    try {
        await Blog.findByIdAndDelete({ _id: req.params.id });
        res.redirect('/admin');
    } catch (err) {
        console.log(err.message);
    }
});
// HANDLEING USER DATA

module.exports = router;