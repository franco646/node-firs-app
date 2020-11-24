exports.notFoundError = (req, res, next) => {
    res.status(404).render('404');
}