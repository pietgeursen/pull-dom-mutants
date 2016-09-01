var pullMutant = require('../')
var pull = require('pull-stream')
var test = require('tape')

test('emitter emits a value when child element appended', function (t) {
  const elem = document.createElement('main')
  const child = document.createElement('h1')
  pull(
    pullMutant(elem, {childList: true}),
    pull.take(1),
    pull.drain(function (mutation) {
      t.ok(mutation)
      var target = mutation.target
      addedChild = target.querySelector('h1')
      t.deepEqual(addedChild, child)
      t.end()
      window.close()
    })
  )

  elem.appendChild(child)
})
