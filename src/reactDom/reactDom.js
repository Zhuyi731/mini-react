import { setAttribute } from './handleAttrs'
import { createComponent, setComponentProps } from '../components/component'
// ReactDom.render(
//     <App/>,
//     document.querySelector('#root')
//   );

/**
 * 
 * @param {*通过jsx编译成的vnode对象} vnode 
 * @param {*需要绑定至的节点} rootElement 
 * @return 将vnode渲染至rootElement
 */
export const render = function (vnode, rootElement) {
    return rootElement.appendChild(renderVnodeToRealNode(vnode))
}

/**
 * 将vnode渲染成dom对象
 * @param {*通过jsx编译成的vnode对象} vnode 
 */
export const renderVnodeToRealNode = function (vnode) {
    let vnodeType = typeof vnode
    if (null === vnode || undefined === vnode || vnodeType === 'boolean') {
        vnode = ''
    }

    if (vnodeType === 'number') {
        vnode = String(vnode)
        vnodeType = 'string'
    }

    //说明是文本节点  直接返回
    if (vnodeType === 'string') {
        let textNode = document.createTextNode(vnode);
        return textNode;
    }

    //默认jsx对象 结构如下
    // {
    //     tag:'div',
    //     attrs:{'name':'123','id':'321','className':'xxx'},
    //     children:[]
    // }
    if (vnodeType === 'object') {

        if (typeof vnode.tag === 'function') { //说明是组件
            // todo  待处理
            const component = createComponent(vnode.tag, vnode.attrs);
            //设置属性
            setComponentProps(component, vnode.attrs)
            //返回的是真实dom对象
            return component.base;
        }

        // 创建该标签的对应dom节点
        let realNode = document.createElement(vnode.tag)
        // 如果有属性,则往标签上添加属性
        if (vnode.attrs) {
            let value
            let attrs = vnode.attrs
            Object.keys(attrs).forEach(key => {
                value = attrs[key]
                setAttribute(realNode, key, value)
            })
        }
        // 如果有子节点 则需要递归
        if (vnode.children) {
            vnode.children.forEach(child => {
                render(child, realNode)
            })
        }
        return realNode
    } else {
        // 如果走到这一步不是object 说明传入的vnode对象有问题  
        throw new Error('ReactDom.render(vnode, root) vnode should be number string object')
    }
}
