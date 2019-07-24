function resolve(value) {
    if (this.status === 'pending') {
        this.status = 'resolved'
        this.data = value
        for(let i = 0; i < this.onResolvedCallback.length; i++) {
            this.onResolvedCallback[i](value)
        }
    }
}

function reject(reason) {
    if (this.status === 'pending') {
        this.status = 'rejected'
        this.data = reason
        for(var i = 0; i < this.onRejectedCallback.length; i++) {
            this.onRejectedCallback[i](reason)
        }
    }
}

class Promise {
    constructor(executor) {
        this.status = 'pending'
        this.data = undefined
        this.onResolvedCallback = []
        this.onRejectedCallback = []
        try {
            executor(resolve.bind(this), reject.bind(this))
        } catch(e) {
            reject.bind(this)(e)
        }
    }

    then(onResolved, onRejected) {
        const self = this
        onResolved = typeof onResolved === 'function' ? onResolved : function(value) {return value}
        onRejected = typeof onRejected === 'function' ? onRejected : function(reason) {return reason}
        if(self.status === 'resolved') {
            return new Promise(function(resolve, reject) {
                try{
                    const x = onResolved(self.data)
                    if(x instanceof Promise) {
                        // ?
                        x.then(resolve, reject)
                    }
                    resolve(x)
                }catch (e) {
                    reject(e)
                }
            })
        }
        if (self.status === 'rejected') {
            return new Promise(function(resolve, reject) {
              try {
                const x = onRejected(self.data)
                if (x instanceof Promise) {
                  x.then(resolve, reject)
                }
              } catch (e) {
                reject(e)
              }
            })
        }
        if (self.status === 'pending') {
            return new Promise(function(resolve, reject) {
                self.onResolvedCallback.push(function(value) {
                    try {
                        const x = onResolved(self.data)
                        if (x instanceof Promise) {
                            x.then(resolve, reject)
                        }
                    } catch (e) {
                        reject(e)
                    }
                })

                self.onRejectedCallback.push(function(reason) {
                    try {
                        var x = onRejected(self.data)
                        if (x instanceof Promise) {
                            x.then(resolve, reject)
                        }
                    } catch (e) {
                        reject(e)
                    }
                })
            })
        }
    }

    catch(onRejected) {
        return this.then(null, onRejected)
    }
}