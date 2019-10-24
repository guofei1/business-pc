import store from '@/store/index'
let stateData = store.state.navData

export function getArrChildById (id, children = stateData) {
    let childrenData = [];
    let curChildrenData = [];
    function findChildren (data, id) {
        for (let i in data) {
            if (data[i]['id'] == id ) {
                curChildrenData.push(data[i]);
            }
        }
    }
    findChildren(children, id);
    let  lastOne = curChildrenData[curChildrenData.length-1];
    function getChildrenData (curdata) {
        if (curdata['id']) {
            childrenData.push(curdata['id']);
        }
        if (curdata['children']) {
            for (let i in curdata['children']) {
                getChildrenData(curdata['children'][i]);
            }
        }
    }
    getChildrenData(lastOne);
    return childrenData;
}
export function getInfoChildById(children, id, sid) {
    let curChildrenData = [];
    function findChildren (data, id) {
        for (let i in data) {
            if (data[i]['id'] == id ) {
                return data[i];
            }
        }
    }
    let  childrenData = findChildren(children, id);
    function getChildrenData (curdata) {
        if (curdata['children']) {
            for (let i in curdata['children']) {
                if (curdata['children'][i]) {
                    curChildrenData.push(curdata['children'][i]);
                    getChildrenData(curdata['children'][i]);
                }
            }
        }
    }
    getChildrenData(childrenData);
    return curChildrenData;
}
export function getBreadcrumb (children, id, sid) {
    let curChildrenData = [];
    function findChildren (data, id) {
        for (let i in data) {
            if (data[i]['id'] == id ) {
                curChildrenData.push(data[i]);
                if (sid != '') {
                    let sidInfo = sid.split('-');
                    for (let j in sidInfo) {
                        if (data[i]['children']) {
                            findChildren(data[i]['children'], sidInfo[j]);
                        }
                    }
                }
            }
        }
    }
    findChildren(children, id);
    return curChildrenData;
}
export function getDetailBreadcrumb(children,categoryId) {
    let childrenData = [];
    function findChildren (children, cid) {
        for (let i in children) {
            if (children[i]['id'] == cid) {
                childrenData.push(children[i]);
            } else {
                if (children[i]['children']) {
                    findChildren(children[i]['children'], cid);
                }
            }
        }
    }
    findChildren(children, categoryId);
    return childrenData;
}
