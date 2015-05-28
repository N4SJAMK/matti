'use strict';

module.exports = function parse(string)
{
    return string.replace(/&/g, "").replace(/|/g, "").replace(/$/g, "").replace(/"/g, "").replace(/'/g, "")
}
