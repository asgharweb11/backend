const Products = require('../../models/posts') 
exports.findProduct = async (req , res , next) => {
    try {
        console.log('user_id : ' , req.body.user_id)
        if(!Array.isArray(req.body.products)){
            return res.status(400).json({
                status : false,
                msg : 'گویا خطایی در انتخاب محصولتون پیش اومده !!'
            })
        }

        if(!req.body.user_id || req.body.user_id === undefined || req.body.user_id === null){
            return res.status(400).json({
                status : false,
                msg : 'خطا ، لطفا یکبار صفحه خود را تازه کنید !!'
            })
        }

        const {products} = req.body;
        const {user_id} = req.body
        const ids = [];
        products.map(({id}) => {
            ids.push(id)
        })

        await Products.find().where('post_id').in(ids).select({number : 1 , price : 1 , post_id : 1 , title : 1}).exec((err , data) => {
            if(err) throw err
            
            let total = 0;
            let amount = 0;
            let _ids = [];
            let status = false;
            data.map(item => {
                products.map(product => {
                    if(product.id == item.post_id){
                        if(product.number > item.number){
                            status = true;
                            return res.status(400).json({
                                status : false,
                                msg : `از محصول ${item.title} نهایتا میتوان ${item.number} تعداد سفارش داد !`
                            })
                        }

                        amount = parseInt(item.price) * product.number;
                        
                    }
                })
                _ids.push(item._id)
                total += amount
            })
            console.log('total : ' , total)
            if(status === true){
                return false;
            }
            const detailBuy = {
                ids : _ids,
                total : parseInt(total + '0'),
                user_id,
                products
            }
            req.pay = detailBuy;
            next()
        })
    } catch (error) {
        console.log('page middleware pay : ' , error)
        return res.status(200).json({
            status : false,
            msg : 'خطا ، لطفا یکبار سبد خرید خود را خالی و مجدد محصولات خود رو به سبد اضافه کنید  !!'
        })
    }
}