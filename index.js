var Push = require('pull-pushable')
var pull = require('pull-stream')
var window = require('global/window')
var document = require('global/document')

module.exports = function (node, opts) {
  var _opts = Object.assign({childList: true}, opts)
  var observer
  if (window && window.MutationObserver) {
    var p = Push(() => observer.disconnect())
    observer = new MutationObserver((elem) => p.push(elem))
    observer.observe(node, _opts)
    return pull(
      p,
      pull.flatten()
    )
  }
}
