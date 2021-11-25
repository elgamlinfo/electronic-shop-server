const Category = require('../models/category.model');

/************start add category************/
let addCategory = (req, res) => {
    Category.findOne({name: req.body.name}, (err, categ) => {
        if(categ) return res.json({'error': 'cateory exist!'});
        let category = new Category(req.body);
        category.save()
            .then((categ) => {
                res.send(categ)
            })
            .catch(err => {
                res.send(err);
            })
    })

}
/************end add category************/

/************start  update category************/
let updateCategory = (req, res) => {
    // console.log(req.param.id)
    Category.findOne({_id: req.params.id}, (err, categ) => {
        if(!categ) return res.json({'error': 'cateory not exist!'});
        let objKeys = Object.keys(req.body);
        let validKeys = ["name", "icon"]
        let isValid = objKeys.every(key => validKeys.includes(key))
        if(!isValid) {
            return res.send('invalid credentials');
        }
        objKeys.forEach((key) => {
            categ[key] = req.body[key];
        });
        categ.save()
            .then((categData) => {
                res.send(categData);
            })
            .catch(err => {
                res.send(err);
            })
    })
}
/************end update category************/



module.exports = {
    addCategory,
    updateCategory
}