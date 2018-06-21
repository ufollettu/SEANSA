const send = async (req, res) => {
    res.json({status:"success", message:"Index", data:{"version_number":"v1.0.0"}});
    // res.render('index', { title: 'Express' });
};
module.exports.send = send;