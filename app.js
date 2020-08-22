const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const adminRoutes = require('./routes/adminRoutes')
const blogRoutes = require('./routes/blogRoutes')

const app = express()

const dbURL = 'mongodb+srv://ali:alibaba@cluster0-ekvmj.mongodb.net/node-blog?retryWrites=true&w=majority'
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.redirect('/blog')
})

app.use('/blog', blogRoutes)
app.use('/admin', adminRoutes)


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