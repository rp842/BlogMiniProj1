// Import modules
import express from 'express';
import path from 'path'; 

const app = express();
const PORT = 3000;

// express js
app.set('view engine', 'ejs');

// ensures path to public
app.use(express.static(path.join(process.cwd(), 'public')));

// middleware, turns form submissions into javascript objects
app.use(express.urlencoded({ extended: true }));

// create array to store posts 
let posts = [];

// route for posts 
app.get('/', (req, res) => {
    res.render('index', { posts: posts });
});

// Route for about page 
app.get('/about', (req, res) => {
    res.render('about');
});

// Route for the edit page
app.get('/edit/:id', (req, res) => {
    const postId = req.params.id;
    const post = posts.find(p => p.id === postId);
    if (post) {
        res.render('edit', { post: post });
    }
});

// Route to update a post
app.post('/edit/:id', (req, res) => {

    // retrieve post id
    const postId = req.params.id;
    const updatedPost = {
        id: postId,
        // Allows updating title 
        title: req.body.title,

        // Allows updating body text 
        bodyText: req.body.bodyText,

        // Allows updating username 
        username: req.body.username, 

        // Allows updating date
        date: req.body.date 
    };
    // updates posts
    posts = posts.map(post => post.id === postId ? updatedPost : post);

    // redirect to homepage
    res.redirect('/');
});

// Route to delete a post
app.post('/delete/:id', (req, res) => {
    const postId = req.params.id;
    posts = posts.filter(post => post.id !== postId);
    res.redirect('/');
});

// handles the form submission and creates post
app.post('/submit', (req, res) => {
    const newPost = {

        // generate unique id for each post based on time submitted
        id: Date.now().toString(),

        // retrieves submitted title
        title: req.body.title,

        // retrieves submitted text
        bodyText: req.body.bodyText,

        // retrieves username
        username: req.body.username,

        // generates current date
        date: new Date().toLocaleDateString() 
    };

    // adds post to array 
    posts.push(newPost);

    // redirect user to home page when after submission 
    res.redirect('/');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});
