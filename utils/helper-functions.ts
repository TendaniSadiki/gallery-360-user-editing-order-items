import { Timestamp } from 'firebase/firestore'
const getDate = (timeStamp: Timestamp) => {
    try {
        // console.log({ timeStamp });
        const stamp = typeof timeStamp === 'string' ? JSON.parse(timeStamp) : timeStamp
        // return 27
        const fullDate = new Date(stamp.seconds * 1000)
        const date = fullDate.getDate()
        const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const month = monthArr[fullDate.getMonth()]
        const year = fullDate.getFullYear()
        // console.log({ date: { date, month, year } })
        return { date, month, year }
    } catch (error) {
        return 'undefined'
    }

}
type DateObjectType = {
    date: number,
    month: string,
    year: number
}
const formatDate = (dateObject: DateObjectType): string => {
    return `${ dateObject.date } ${ dateObject.month }, ${ dateObject.year }`
}
const createDecimalNumber = (number: number): number => {
    return Number(Number(number).toFixed(2))
}

export {
    getDate, formatDate, createDecimalNumber
}