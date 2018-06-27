'use strict'

export function read (file) {
    var promise = new Promise(function (resolve, reject) {
        if (!file) {
            reject('File path required');
        }
        var reader = new FileReader();
        reader.onload = function (e) {
            var contents = e.target.result;
            resolve(contents);
        };
        reader.readAsText(file);
    });
    return promise;
}