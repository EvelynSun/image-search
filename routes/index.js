

module.exports = function(app) {
    app.get('/',function(req,res,next){
        res.render('index', {
            title:"BaseJump:Image Search Abstraction Layer",
            search_url:"https://evelyn-image-search1.herokuapp.com/api/imagesearch/lolcats%20funny?offset=10",
            recent_url:"https://evelyn-image-search1.herokuapp.com/api/imagesearch/latest"
        });
    })
}