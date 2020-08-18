const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blogs')

const app = express()

const dbURL = 'mongodb+srv://ali:alibaba@cluster0-ekvmj.mongodb.net/node-blog?retryWrites=true&w=majority'
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// app.get('/add', (req, res) => {
//     const blog = new Blog({
//         title: 'Yeni Yazi 2',
//         short: 'kisa Aciklama',
//         long: 'uzun aciklama'
//     })

//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => console.log(err))
// })

// app.get('/all', (req, res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => console.log(err))
// })

// app.get('/single', (req, res) => {
//     Blog.findById('5f3a5ebe77cf700793ca9967')
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => console.log(err))
// })


app.get('/', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'Anasayfa', blogs: result })
        })
        .catch((err) => console.log(err))
})

app.get('/blog/:id', (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then((result) => {
            res.render('blog', { title: 'Detay', blog: result })
        })
        .catch((err) => {
            res.status(404).render('404', {
                title: 'Sayfa Bulunamadi '
            })
        })

})

app.get('/admin', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('admin', { title: 'Admin', blogs: result })
        })
        .catch((err) => console.log(err))
})

app.get('/admin/add', (req, res) => {
    res.render('add', { title: 'yeni yazi' })
})

app.post('/admin/add', (req, res) => {
    const blog = new Blog(req.body)

    blog.save()
        .then((result) => {
            res.redirect('/')
        })
        .catch((err) => {
            console.log(err);
        })
})

app.delete('/admin/delete/:id', (req, res) => {
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ link: '/admin' })
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'Hakkimizda' })
})

app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

app.get('/login', (req, res) => {
    res.render('login', { title: 'Giris' })
})

app.use((req, res) => {
    res.status(404).render('404', {
        title: 'Sayfa Bulunamadi '
    })
})  