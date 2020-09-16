# react-ugh

### react's useState but for the Psychopaths

### install:
```
npm i react-ugh
```
#

## example without react-ugh:
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

# Labels
### Share state between components witout any parent wrappers or passing props
```jsx
function App() {
    // state will be shared between Comp1 and Comp2
  return (
    <div className="App">
      <Comp1 />
      <Comp2 />
    </div>
  );
}

function Comp1() {

  const state = useUgh({ counter: 0 }, "global-counter-label");
  // useUgh(initial_state, validate, label)

  useEffect(() => {
    const interval = setInterval(() => {
      state.counter += 1;
    }, 500);

    return () => clearInterval(interval);
  }, [state]);

  return <h1>{state.counter}</h1>;
}


function Comp2() {
    const state = useUgh("global-counter-label");
    // just give the same label as in Comp1 to share state and thats it
    return <h1>{state.counter}</h1>;
}
```

## validate before updating state
pass in custom validation functions for each individual property

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

    const validator = {
      counter: validateCount,
      counter_but_in_string:counter_but_in_string_validator,
    }

    // validator object can be defined only while defining the state
    const state = useUgh({ counter: 0, counter_but_in_string: "0" }, validator);

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
const state = useUgh(state_initial_value, validate, label);
// state_initial_value has to be an object
// other args are explained below
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

## label
label holds an identifier using which you can get any state across components with no wrappers or passing any props from one component to the other
- type: string
#
## why use this?
- validation before state update
- share state between components without caring about any wrappers or setup
- you are a Psychopath

links: 
- [github](https://github.com/xrehpicx/react-ugh)
- [npm](https://www.npmjs.com/package/react-ugh)