# react-ugh

## react's useState but for the Psychopaths

#

### install:
```
npm i react-ugh
```
#

## example with useState:
```javascript
import React, { useState, useEffect } from "react";

function ComponentName() {
  const [counter, setCounter] = useState(0);

    useEffect(() => {
        // increments counter every 2 seconds
        const interval = setInterval(() => {
            setCounter((oldValue) => (oldValue += 1));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

  return <h1>{counter}</h1>;
}

```
#

## example with react-ugh:
```javascript
import React, { useEffect } from "react";
import { useUgh } from "react-ugh";

function ComponentName() {
    
    const state = useUgh({ counter: 0 });

    useEffect(() => {
        // increments counter every 2 seconds
        const interval = setInterval(() => {
            state.counter += 1;
        }, 2000);

        return () => clearInterval(interval);
    }, [state]);

    return <h1>{state.counter}</h1>;
}

```
# 
## validate before updating state

```jsx
import React, { useEffect } from "react";
import { useUgh } from "react-ugh";

function ComponentName() {
    
    function validateCount(oldCount, newCount) {
        if (newCount <= 10) return newCount; 
        // sets state to 0 when 10 reached
        else return 0;
    }

    function counter_but_in_string_validator(oldval, newval) {
        if (newval <= 10) return String(newval);
        // converts new value to string before updating state
        else return "0";
    }

    const state = useUgh(
        { counter: 0, counter_but_in_string: "0" },
        {
            counter: validateCount,
            counter_but_in_string: counter_but_in_string_validator,
        }
    );

    useEffect(() => {
        const interval = setInterval(() => {
            state.counter += 1;
        }, 500);

        return () => clearInterval(interval);
    }, [state]);

    return <h1>{state.counter}</h1>;
}

```

# Api References

## useUgh
- type: function

```jsx
const state = useUgh(state_initial_value, validate);
// state_initial_value has to be an object
// validate is explained below
```
## validate
validate holds all your validation functions for the properties in your state_initial_value
- type: object

example:
```jsx
const state_initial_value = { counter: 0 };

function counterValidator(oldval,newval){
    console.log('state changed to:',newval,' from ',oldval)
    return newval
}

/* set counterValidator to 'counter' to apply counterValidator to every change that occurs to 'counter' property in ur state */

const validate = { counter: counterValidator };

const state = useUgh(state_initial_value, validate);

```


## why use this?
- validation before state update
- you are a Psychopath

links: 
- [github](https://github.com/xrehpicx/react-ugh)
- [npm](https://www.npmjs.com/package/react-ugh)