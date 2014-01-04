/**
 *
 * Created with IntelliJ IDEA.
 * User: sanojimaru
 * Date: 2014/01/04
 * Time: 20:57
 * To change this template use File | Settings | File Templates.
 */
var crypto = require('crypto');

function md5hex(src) {
    var md5 = crypto.createHash('md5');
    md5.update(src, 'utf8');
    return md5.digest('hex');
}

module.exports.md5hex = md5hex;
