const model = require('../models/blog');
const User = require('../models/user');
module.exports = {
  getAll: (req,res,next)=>{
    model.find()
    .populate('UserId')
    .then(blogs=>{
      res.json(blogs)
    })
    .catch(err=>{
      next(err)
    })
  },
  getByIdUser: (req,res,next)=>{
    model.find({
      UserId:req.params.id
    })
    .then(blogs=>{
      res.json(blogs)
    })
    .catch(err=>{
      next(err)
    })
  },
  getById: (req,res,next)=>{
    model.findById(req.params.id)
    .populate('UserId')
    .then(blog=>{
      res.json(blog)
    })
    .catch(err=>{
      next(err)
    })
  },
  create: (req,res,next)=>{
    model.create({
      title: req.body.title,
      content: req.body.content,
      imgUrl: req.file.cloudStoragePublicUrl,
      UserId: req.decoded._id,
      category: req.body.category
    })
    .then(blog=>{
      res.json(blog)
    })
    .catch(err=>{
      next(err)
    })
  },
  edit: (req,res,next)=>{
    model.findByIdAndUpdate(req.params.id,{
      title: req.body.title,
      content: req.body.content,
      UserId: req.decoded._id,
      category: req.body.category
    })
    .then(blog=>{
      res.json(blog)
    })
    .catch(err=>{
      next(err)
    })
  },
  destroy: (req,res,next)=>{
    model.findByIdAndRemove(req.params.id)
    .then(blog=>{
      res.json(blog)
    })
    .catch(err=>{
      next(err)
    })
  }
}

// queue.create('email',{
//     email:data.UserId.email,
//     text: `Anda mendapatkan Jawaban baru untuk pertanyaan ${data.QuestionId.question}`,
//     subject: 'HacktivOverFlor-Simple by ariefmanda',
//     html: `<p>Anda mendapatkan Jawaban baru untuk pertanyaan: ${data.QuestionId.question}<p><br>
//     Please check in : <a href="http://overflow.feedomain.tk">Hacktiv Over Flow Simple</a>`
//   }).save(err=>{
//     if(err){
//       next(err)
//     }else{
//       res.json(answers)
//     }
//   })
