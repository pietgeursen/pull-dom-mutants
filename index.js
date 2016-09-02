var Push = require('pull-pushable')
var pull = require('pull-stream')
var window = require('global/window')

module.exports = function (node, opts) {
  var _opts = Object.assign({childList: true}, opts)
  if (window && window.MutationObserver) {
    var observer
    var p = Push(() => observer.disconnect())

    observer = new window.MutationObserver(p.push)
    observer.observe(node, _opts)
    return pull(
      p,
      pull.flatten()
    )
  }
}
