export default (regObj) => {
    console.log(regObj)
    return {
        type: 'REGISTER_ACTION',
        payLoad: regObj
    }
}