import { useState, useRef } from 'react'


const states = {};
export function useUgh(state = {}, validation, label) {

    const ref = useRef(false)

    const [stateval, setState] = useState(state)


    if (!ref.current) {
        ref.current = convertToProxy({ ...stateval }, setState, validation, label)
        return ref.current
    }
    if (label && states[label]) {

        ref.current = [...states[label]][0].proxy
    }
    return ref.current
}

function convertToProxy(state, setState, validation, label) {

    const handler = {
        set: function (target, prop, value) {

            try {
                if (validation && typeof (validation[prop]) === 'function') {
                    target[prop] = validation[prop](target[prop], value, target)
                }
                else {
                    target[prop] = value
                }

                if (label) {
                    updateState(label, { ...target })
                } else {
                    setState({ ...target })
                }

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
    const proxy = new Proxy(state, handler)

    if (label) {

        if (states[label] && states[label].add) {
            states[label].add({ state, setState, proxy })
        } else {
            states[label] = new Set([{ state, setState, proxy }])
        }

    }
    return proxy
}

function updateState(label, newstate) {
    const sets = [...states[label]].forEach(set => set.setState({ ...newstate }))
}