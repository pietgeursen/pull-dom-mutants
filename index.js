var Push = require('pull-pushable')

module.exports = function(node, opts){
  var observer
  var p = Push(() => mutations.disconnect())
  var observer = new MutationObserver(p.push)
  observer.observe(node, opts)
  return p
}
