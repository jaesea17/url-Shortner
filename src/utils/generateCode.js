module.exports.generateRandomString = function (length) {
    const characters = 'ab78cABCdefDEFghijklmnopGHI45JKLMN0123OPqrstuvwxyzQRST69UVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
