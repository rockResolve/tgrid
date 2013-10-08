//#region Ckecks with "null" and "undefined".
function isNull(target: any): boolean {
    return target == null;
}

function isNotNull(target: any): boolean {
    return target != null;
};

function isUndefined(target: any): boolean {
    return typeof target == "undefined";
};

function isNotUndefined(target: any): boolean {
    return typeof target != "undefined";
};

function isNoU(target: any): boolean {
    return isUndefined(target) || isNull(target);
};

function isNotNoU(target: any): boolean {
    return isNotUndefined(target) && isNotNull(target);
};

function isFunction(target: any): boolean {
    var getType = {};
    return target && getType.toString.call(target) === '[object Function]';
}

function insertAfter(target: any, add:any):void {
    if (target.nextSibling == null) {
        target.parentElement.appendChild(add);
    } else {
        target.nextSibling.insertBefore(add);
    }
}

//#endregion