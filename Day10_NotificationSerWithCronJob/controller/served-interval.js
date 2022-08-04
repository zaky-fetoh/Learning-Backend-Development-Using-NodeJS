const serverdInterval = {
    start: 0, end: 0,
};

exports.setServedInterval = function (start, end) {
    try {
        serverdInterval.start = start;
        serverdInterval.end = end;
        return true;
    } catch (e) {
        return false;
    }
}

exports.getServedInterval = function () {
    return serverdInterval
}

exports.isWithenServedInterval = function(date){
    if(date < serverdInterval.start) return false;
    else if ( serverdInterval.end < date) return false; 
    else return true; 
}
