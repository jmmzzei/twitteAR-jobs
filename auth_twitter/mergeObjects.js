const mergeObjs = (obj1, obj2) => {
    for (var attr in obj2) {
        obj1[attr] = obj2[attr];
    }
    return obj1;
};

module.exports = mergeObjs
