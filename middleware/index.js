

const isauth = async(req, res, next) => {
    if(!req.user) {
        return res.redirect('back')
    } 

    return next()
}

const notauth = async(req, res, next) => {
    if(req.user) {
        return res.redirect('back')
    }

    return next()
}

module.exports = {
    isauth, 
    notauth
}