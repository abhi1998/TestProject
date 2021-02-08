const express = require('express'),
Category = require('../models/Categories'),
Product = require('../models/Products'),
router = express.Router();


router.get('/', (req, res) => {
    res.render('index')
})

router.get('/add-category', (req, res) => {
    res.render('add-category')
})

router.post('/add-category', (req, res) => {
    let category = new Category({
        category: req.body.category
    })

    Category.create(category)
    .then(newCategory => {
        console.log(newCategory);
        res.redirect('/view-categories')
    })
    .catch(err => {
        console.log(err);
    })
})


router.get('/view-categories', (req, res) => {
    Category.find().exec()
    .then(allCategories => {
        res.render('view-categories', {
            categories: allCategories
        })
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/update-category/:id', (req, res) => {
    Category.findById(req.params.id).exec()
    .then(foundCategory => {
        res.render('update-category', {
            category: foundCategory
        })
    })
    .catch(err => {
        console.log(err)
    })
})

router.put('/update-category/:id', (req, res) => {
    let category = {
        category: req.body.category
    }
    Category.findByIdAndUpdate(req.params.id, category).exec()
    .then(foundCategory => {
        res.redirect('/view-categories')
    })
    .catch(err => {
        console.log(err)
    })
})

router.delete('/delete-category/:id', (req, res) => {
    Category.findByIdAndDelete(req.params.id).exec()
    .then(foundCategory => {
        res.redirect('/view-categories')
    })
    .catch(err => {
        console.log(err)
    })
})


router.get('/add-product', (req, res) => {
    Category.find().exec()
    .then(allCategories => {
        res.render('add-product', {
            categories: allCategories
        })
    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/add-product', (req, res) => {
    let product = new Product({
        name: req.body.name,
        category: req.body.category
    })

    Product.create(product)
    .then(newProduct => {
        res.redirect('/view-products')
    })
    .catch(err => {
        console.log(err)
    })
})

// View Products 

// router.get('/view-products', (req, res) => {
    
//     Product.find().populate('category').exec()
//     .then(allProducts => {
//         res.render('view-products', {
//             products: allProducts
//         })
//     })
//     .catch(err => {
//         console.log(err)
//     })
// })


router.get('/view-products', (req, res) => {
    let perPage = 3
    let page = req.params.page || 1
    Product.find().populate('category')
    .skip((perPage * page) - perPage).limit(perPage).exec()
    .then(allProducts => {
        Product.countDocuments().exec((err, count) => {
            res.render('view-products', {
                products: allProducts,
                current: page,
                pages: Math.ceil(count / perPage)
            })
        })
       
    })
    .catch(err => {
        console.log(err)
    })
})


router.get('/view-products/:page', (req, res) => {
    let perPage = 3
    let page = req.params.page || 1
    Product.find().populate('category')
    .skip((perPage * page) - perPage).limit(perPage).exec()
    .then(allProducts => {
        Product.countDocuments().exec((err, count) => {
            res.render('view-products', {
                products: allProducts,
                current: page,
                pages: Math.ceil(count / perPage)
            })
        })
       
    })
    .catch(err => {
        console.log(err)
    })
})



router.get('/update-product/:id', (req, res) => {
    Product.findById(req.params.id).exec()
    .then(foundProduct => {
        Category.find().exec()
        .then(allCategories => {
            res.render('update-product', {
                product: foundProduct,
                categories: allCategories
            })
        })
    })
    .catch(err => {
        console.log(err)
    })
})

router.put('/update-product/:id', (req, res) => {

    let product = {
        name: req.body.name,
        category: req.body.category
    }

    Product.findByIdAndUpdate(req.params.id, product).exec()
    .then(upadtedProduct => {
        res.redirect('/view-products')
    })
    .catch(err => {
        console.log(err)
    })
})

router.delete('/delete-product/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id).exec()
    .then(deletedProduct => {
        res.redirect('/view-products')
    })
    .catch(err => {
        console.log(err);
    })
})


module.exports = router;