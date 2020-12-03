const moment = require('moment-jalaali')
// const fa = require('moment/locale/fa')

exports.date = (date) => {
    const getDate = moment(date)
    const thisDate = moment(new Date())
    const isLengthDate = moment.jDaysInMonth(date)

    const year = getDate.jYear()
    const month = getDate.jMonth()
    const hourse = getDate.format('HH:mm')
    const tarikh = getDate.format('YYYY-M-D')

    // -------------- نام روز ها
    function nameDays(number){
        switch (number) {
            case 0:
                return `امروز ${hourse}`
                break;
            case 1:
                return `دیروز ${hourse}`
                break;
            case 2:
                return `دو روز پیش ${hourse}`
                break;
            case 3:
                return `سه روز پیش ${hourse}`
                break;
            case 4:
                return `پهار روز پیش ${hourse}`
                break;
            case 5:
                return `پنج روز پیش ${hourse}`
                break;
            case 6:
                return `شیش روز پیش ${hourse}`
                break;
            case getDate.jDate() >= 7 && getDate.jDate() <= 14:
                return `هفته پیش ${hourse}`
                break;
            case getDate.jDate() > 14 && getDate.jDate() <= 21:
                return  `دو هفته پیش ${hourse}`
                break;
            case getDate.jDate() > 21 && getDate.jDate() <=28:
                return  `سه هفته پیش ${hourse}`
                break;
            case getDate.jDate() > 29:
                return `چهار هفته پیش ${hourse}`
                break;
            default:
                return `چهار هفته پیش ${hourse}`
                break;
        }
    }

    // -------------- نام ماه ها
    function nameMonth(number){
        switch (number) {
            case 0:
                return `این ماه`
                break;
            case 1:
                return `یک ماه پیش`
                break;
            case 2:
                return `دو ماه پیش`
                break;
            case 3:
                return `سه ماه پیش`
                break;
            case 4:
                return `چهار ماه پیش`
                break;
            case 5:
                return `پنج پیش ماه`
                break;
            case 6:
                return `شیش ماه پیش`
                break;
            case 7:
                return `هفت ماه پیش`
                break;
            case 8:
                return `هشت ماه پیش`
                break;
            case 9:
                return `نه ماه پیش`
                break;
            case 10:
                return `ده ماه پیش`
                break;
            case 11:
                return `یازده ماه پیش`
                break;
            case 12:
                return `یکسال پیش`
                break;
            default:
                return `یکسال پیش`
                break;
        }
    }

    // -------------- نام سال ها
    function nameYear(number){
        switch (number) {
            case 0:
                return `امسال`
                break;
            case 1:
                return `یکسال پیش`
                break;
            case 2:
                return `دو سال پیش`
                break;
            case 3:
                return `سه سال پیش`
                break;
            case 4:
                return `چهار سال پیش`
                break;
            case 5:
                return `پنج سال ماه`
                break;
            case 6:
                return `شیش سال پیش`
                break;
            case 7:
                return `هفت سال پیش`
                break;
            case 8:
                return `هشت سال پیش`
                break;
            case 9:
                return `نه سال پیش`
                break;
            case 10:
                return `ده سال پیش`
                break;
            case 11:
                return `یازده سال پیش`
                break;
            default:
                return `یازده سال پیش`
                break;
        }
    }


    if(thisDate.jMonth()-1 === getDate.jMonth()){
        return nameDays(thisDate.jDate() + (isLengthDate - getDate.jDate()))
    } else if(thisDate.jMonth() === getDate.jMonth()){
        return nameDays(thisDate.jDate() - getDate.jDate())
    } else if(thisDate.jYear() === getDate.jYear()){
        return nameMonth(thisDate.jMonth() - getDate.jMonth())
    }else if(getDate.jYear() > 1410){
        return nameYear(thisDate.jYear() - getDate.jYear())
    }else {
        return tarikh
    }
    
}