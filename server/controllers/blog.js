const model = require("../models/blog");
const User = require("../models/user");
var kue = require('kue')
  , queue = kue.createQueue();
module.exports = {
  getAll: (req, res, next) => {
    model
      .find()
      .populate("UserId")
      .then(blogs => {
        res.json(blogs);
      })
      .catch(err => {
        next(err);
      });
  },
  getByIdUser: (req, res, next) => {
    model
      .find({
        UserId: req.params.id
      })
      .then(blogs => {
        res.json(blogs);
      })
      .catch(err => {
        next(err);
      });
  },
  getById: (req, res, next) => {
    model
      .findById(req.params.id)
      .populate("UserId")
      .then(blog => {
        res.json(blog);
      })
      .catch(err => {
        next(err);
      });
  },
  create: (req, res, next) => {
      console.log(req.decoded);
    model
      .create({
        title: req.body.title,
        content: req.body.content,
        imgUrl: req.file.cloudStoragePublicUrl,
        UserId: req.decoded._id,
        category: req.body.category
      })
      .then(blog => {
          User.findById(req.decoded._id)
          .then(user => {
            queue
              .create("email", {
                email: user.email,
                text: `Hey User`,
                subject: "bloging-Simple by ariefmanda",
                html: `helo mr. ${user.name}<br><p>Terima kasih telah menggunakan aplikasi kami<p>`
              })
              .save(err => {
                if (err) {
                  next(err);
                } else {
                  res.json(blog);
                }
              });
          })
          .catch(err => {
            next(err);
          });
      })
      .catch(err => {
        next(err);
      });
  },
  edit: (req, res, next) => {
    model
      .findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        content: req.body.content,
        UserId: req.decoded._id,
        category: req.body.category
      })
      .then(blog => {
        res.json(blog)
      })
      .catch(err => {
        next(err);
      });
  },
  destroy: (req, res, next) => {
    model
      .findByIdAndRemove(req.params.id)
      .then(blog => {
        res.json(blog);
      })
      .catch(err => {
        next(err);
      });
  }
};