# pull-dom-mutants
[pull-stream](http://pull-stream.github.io/) source of mutations to a dom element using [Mutation Observer](https://developer.mozilla.org/en/docs/Web/API/MutationObserver). Emits [Mutation Records](https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord)


## Example 
```js
var pullMutant = require('../')
var pull = require('pull-stream')
var test = require('tape')

test('emitter emits a value when child element appended', function (t) {
  var elem = document.createElement('main')
  var child = document.createElement('h1')
  pull(
    pullMutant(elem, {childList: true}),
    pull.take(1),
    pull.drain(function (mutation) {
      var addedChild = mutation.target.querySelector('h1')
      t.equal(addedChild, child)
      t.end()
      window.close()
    })
  )

  t.false(elem.querySelector('h1'))
  elem.appendChild(child)
})

```
## API

```js
  pullMutants(elem [, opts])
```
Where opts are the options to pass along to [Mutation Observer](https://developer.mozilla.org/en/docs/Web/API/MutationObserver), defaults to `{childList: true}`
