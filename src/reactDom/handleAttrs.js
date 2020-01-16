/**
 * 将属性挂在至dom节点上
 * @param {*将要挂在的dom节点} dom 
 * @param {*属性名称} key 
 * @param {*属性值} value 
 */
export function setAttribute(dom, key, value) {
    if (key === 'className') {
        key = 'class'
    }

    if (/on\w+/.test(key)) {// onxxx事件  
        key = key.toLowerCase()
        dom[key] = value
    } else if (key === 'style') {
        if (!value || typeof value === 'string') {
            dom.style.cssText = value
        } else if (value && typeof value === 'object') {// {width: 30}
            Object.keys(value).forEach(el => {
                dom.style[el] = value[el] + typeof value[el] === 'number' ? 'px' : ''
            })
        }
    } else {  // 其余属性不做处理  直接赋值
        if (key in dom) {
            dom[key] = value || ''
        }
       
        if (value) {
            dom.setAttribute(key, value);
        } else {
            dom.removeAttribute(key);
        }
    }
}
