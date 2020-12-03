const Buys = require('../../models/buys')
const Personal = require('../../models/personals')
const Products = require('../../models/posts')
const {v4 : uuidv4} = require('uuid')
const pay = require('payir');
const gateway = new pay('test')
// ------ methods ----------
const { RandomInt } = require('../../../methods/validator')

const SERVER = process.env.SERVER
const CLIENT = process.env.CLIENT



exports.paying = (req , res) => {
    const {total , ids , products} = req.pay
    if(total < 10000 || typeof total !== 'number'){
        return res.status(400).json({
            status : false,
            msg : 'قیمت شما باید بیشتر از 10.000 ریال باشد !!'
        })
    }

    gateway.send(total , `${SERVER}/payment/verify`)
        .then(link => {
            const split = link.split('/')
            const transId = split[split.length - 1];
            res.status(200).json({
                status : true,
                link,
                data : {
                    total,
                    ids,
                    transId,
                    products
                }
            })
        })
        .catch(error => {
            console.log('page payment/ : ' , error)
            res.status(400).json({
                status : false,
                msg : 'خطای سرور !!'
            })
        })
}


exports.verify = async (req , res) => {
    try {

        const verify = await gateway.verify(req.body);
        const {total , ids , transId , products} = req.body
        const user_id = req.body.user_id;
        const {factorNumber , transactionId , amount , cardNumber} = verify
    
        if(parseInt(total) !== parseInt(amount)){
            console.log('total : ' , total)
            return res.status(400).json({
                status : false,
                msg : 'متوجه درخواست شما نمیشوم !'
            })
        }

        const findTransId = await Buys.findOne({trans_id : transId})

        if(findTransId !== null){
            return res.status(400).json({
                status : false,
                msg : 'متوجه درخواست شما نمیشوم !'
            })
        }
        // 1.712.000

        await Products.find().where('_id').in(ids).select({shop_id : 1 , price : 1 , post_id : 1}).exec(async (err , data) => {
            if(err) throw err

            for(let item of data){
                let where = {shop_id : item.shop_id}
                let doc = await Personal.findOne(where)
                for(let pro of products){
                    if(pro.id === item.post_id){
                        let darsad = ((parseInt(item.price * pro.number)) * 80) / 100;
                        let wallet = parseInt(doc.wallet)
                        console.log('kife : ' , wallet)
                        doc.wallet = wallet + darsad;
                        await doc.save()
                    }
                }
            }

            let totals = String(total).split('')
            totals.pop()
            const totalBuy = totals.join('')
            // ---------------------------------------
            const insertBuy = await new Buys({
                user_id,
                posts : products,
                total : totalBuy,
                trans_id : transId,
                factor : factorNumber !== undefined ? factorNumber : RandomInt(10000000 , 99999999)
            })
            await insertBuy.save()
            // ----------------------
            const dataSuccess = {
                posts : ids,
                total : totalBuy,
                trans_id : transId,
                factor : factorNumber
            }

            res.status(200).json({
                status : true,
                msg : 'از خرید شما سپاس گذاریم ، 20 ثانیه دیگر به صفحه خرید ها منتقل میشوید !!',
                data : dataSuccess
            })

        })

    
    } catch (error) {
        console.log('error : ' , error)
        res.status(200).json({
            status : false
        })
    }
    
}



exports.status = (req , res) => {
    const {status , token} = req.query
    res.redirect(`${CLIENT}/payment/${status}`)
}