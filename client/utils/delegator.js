class Delegator {
    constructor(selector) {
        this.root = selector
        this.delegatorEventList = {}
    }
    delegator(e) {
        const eventList = this.delegatorEventList[e.type]
        let curNode = e.target
        while(curNode !== this.root) {
            eventList.forEach(event => {
                if(curNode.matches(event.matcher)) {
                    event.cb.call(curNode, e)
                }
            })
            curNode = curNode.parentNode
        }
    }
    on(event, selector, fn) {
        if(!this.delegatorEventList[event]) {
            this.delegatorEventList[event] = [{
                matcher: selector,
                cb: fn
            }]
            this.root.addEventListener(event, this.delegator.bind(this))
        }else {
            this.delegatorEventList[event].push({
                matcher: selector,
                cb: fn
            })
        }
        return this
    }
    destroy () {
        Object.keys(this.delegatorEventList).map(eventName => {
          this.root.removeEventListener(eventName, this.delegator)
        })
      }
}

export default Delegator