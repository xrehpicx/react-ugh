import { useState, useRef } from 'react'


window.states = {};
export function useUgh(state = {}) {

    const ref = useRef(false)

    const [stateval, setState] = useState(state)
    if (!ref.current) {
        ref.current = convertToProxy(stateval, setState)
        return ref.current
    }
    return ref.current
}

function convertToProxy(state, setState) {

    const handler = {
        set: function (target, prop, value) {
            try {
                target[prop] = value

                setState({ ...target[prop] })
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        },
        get: function (target, prop) {
            return target[prop]
        }
    }
    return new Proxy(state, handler)
}