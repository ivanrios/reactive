// See https://github.com/vuejs/vue/blob/be9ac624c81bb698ed75628fe0cbeaba4a2fc991/src/core/observer/dep.js
// for full implementation

class Dep {
  constructor() {
    this.subs = new Set()
  }

  addSub(sub) {
    this.subs.add(sub)
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify() {
    this.subs.forEach(sub => sub.update())
  }
}

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null
const targetStack = []

function pushTarget(_target) {
  if (Dep.target) targetStack.push(Dep.target)
  Dep.target = _target
}

function popTarget() {
  Dep.target = targetStack.pop()
}
