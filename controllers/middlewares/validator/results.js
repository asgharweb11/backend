const { validationResult } = require("express-validator")

exports.auth = (req , res , next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array()
        return res.status(400).json({ 
            status : false,
            msg : err[0].msg
        });
    }
    next();
} 


