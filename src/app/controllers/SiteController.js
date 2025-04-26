const { mongoose } = require("mongoose");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");




class SiteController {
    home(req, res) {
        res.render("home");
    }

    login(req, res) {
        res.render('login', { layout: false }); // Không dùng layout mặc định
    }


}

module.exports = new SiteController();