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
