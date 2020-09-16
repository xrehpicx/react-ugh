import { v1 } from 'uuid';
import { useState, useRef } from 'react'


const states = {};
export default function useUgh(state = {}, label, validation) {
    if (typeof label === 'object') {
        validation = label
        label = null;
    }
    label = label || v1();
    if (!state && label) throw new Error('bruh, u passed nothing, no state or label,smh')
    let setup = useRef(null);

    const [s, setS] = useState(state)

    if ((typeof state === 'object') && label) {
        if (states[label]) return states[label].proxy;

        const proxy = createProxy(s, label, validation);
        states[label] = {
            proxy,
            setStates: new Set([setS]),
        }
        setup.current = true;
        return proxy

    } else if (typeof state === 'string') {
        if (!states[state]) {
            throw new Error('you are trying to access a labeled state thats not set yet>', state);
        }
        if (!setup.current) {
            setup.current = true
            states[state].setStates.add(setS)
            return states[state].proxy;
        }
        return states[state].proxy;
    }

}

function createProxy(s, label, validation) {
    return new Proxy(s, {
        set: (target, prop, val) => {

            try {
                if (validation && typeof (validation[prop]) === 'function') {
                    target[prop] = validation[prop](target[prop], val, target)
                }
                else {
                    target[prop] = val
                }


            } catch (error) {
                console.log(error)
                return false
            }

            renderall(label);
            return 1;
        }
    });
}

function renderall(label) {
    for (const setState of states[label].setStates) {
        setState({})
    }
}