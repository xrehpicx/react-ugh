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

## why use this?
- its the best way to mess with people just starting of with react
- you are a Psychopath

links: 
- [github](https://github.com/xrehpicx/react-ugh)
- [npm](https://www.npmjs.com/package/react-ugh)