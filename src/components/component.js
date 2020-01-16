import { renderVnodeToRealNode } from '../reactDom/reactDom'
export class Component {
    constructor(props) {
        this.props = props
    }

    setState(stateChange) {
        // 将修改合并到state
        console.log('setstate');
        const newState = Object.assign(this.state, stateChange);
        console.log('state:', newState);
        renderComponent(this);
    }

    //挂载卸载过程
    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    //更新过程
    componentWillReceivrProps() {

    }

    shouldCompoenentUpdate() {

    }

    componentWillUpdate() {

    }

    componentDidUpdate() {

    }

    render() {
        return ''
    }

}

export function createComponent(component, props) {
    console.log('createComponent', component)
    let instance
    if (component.prototype && component.prototype.render) {
        instance = new component(props)
    } else {
        instance = new Component(props)
        inst.constructor = component;
        inst.render = function () {
            return this.constructor(props);
        };
    }
    return instance
}

export function setComponentProps(component, props) {
    if (!component.base) {
        if (component.componentWillMount) component.componentWillMount();
    } else if (component.base && component.componentWillReceiveProps) {
        component.componentWillReceiveProps(props);
    }

    component.props = props;

    renderComponent(component);
}

export function renderComponent(component) {
    let base

    let renderer = component.render()

    if (component.base && component.componentWillUpdate) {
        component.componentWillUpdate()
    }

    base = renderVnodeToRealNode(renderer)
    if (component.base) {
        component.componentDidUpdate && component.componentDidUpdate()
    } else {
        component.base = base
        component.componentDidMount() && component.componentDidMount()
        if (component.base && component.base.parentNode) {
            component.base.parentNode.replaceChild(base, component.base);
        }
        return
    }

    if (component.base && component.base.parentNode) {
        component.base.parentNode.replaceChild(base, component.base);
    }
    component.base = base
    base._component = component
}

// export default {
//     Component,
//     createComponent,
//     setComponentProps,
//     renderComponent
// }