
const siteRouter = require("./site");
const authRoutes = require("./auth");
const express = require("express");

function route(app) {

    app.use('/api/auth', authRoutes);
    app.use("/", siteRouter);

}

module.exports = route;
