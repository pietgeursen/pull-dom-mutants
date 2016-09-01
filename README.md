# pull-dom-mutants
[pull-stream](http://pull-stream.github.io/) source of mutations to a dom element using [Mutation Observer](https://developer.mozilla.org/en/docs/Web/API/MutationObserver). Emits [Mutation Records](https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord)


## Example
```js
var pull = require('pull-stream')

var elem = document.createElement('main')
var child = document.createElement('h1')
    
var elemMutations = pullMutant(elem)

pull(
  elemMutations,
  pull.log()
)

elem.appendChild(child) // Emits a new mutation.

```
## API

```js
  var pullMutants = require('pull-dom-mutants')
  pullMutants(elem [, opts])
```
Where opts are the options to pass along to [Mutation Observer](https://developer.mozilla.org/en/docs/Web/API/MutationObserver), defaults to `{childList: true}`
