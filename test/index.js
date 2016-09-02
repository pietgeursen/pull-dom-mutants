var pullMutant = require('../')
var pull = require('pull-stream')
var many = require('pull-many')
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
    })
  )

  t.false(elem.querySelector('h1'))
  elem.appendChild(child)
})

test('can have multiple mutants subscribed to different elements', function (t) {
  t.plan(4)
  var elem = document.createElement('main')
  var child = document.createElement('h1')
  var elem1 = document.createElement('main')
  var child1 = document.createElement('h1')

  pull(
    many([pullMutant(elem, {childList: true}), pullMutant(elem1, {childList: true})]),
    pull.drain(function (mutations) {
      t.ok(mutations)
    })
  )

  t.false(elem.querySelector('h1'))
  t.false(elem1.querySelector('h1'))
  elem.appendChild(child)
  elem1.appendChild(child1)
})

test('can have multiple mutants subscribed to the same element', function (t) {
  t.plan(3)
  var elem = document.createElement('main')
  var child = document.createElement('h1')

  pull(
    many([pullMutant(elem, {childList: true}), pullMutant(elem, {childList: true})]),
    pull.drain(function (mutations) {
      t.ok(mutations)
    })
  )

  t.false(elem.querySelector('h1'))
  elem.appendChild(child)
})
