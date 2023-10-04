'use strict'

class Memory {
  state = []
  timer = null

  write() {
    this.timer = setInterval(() => {
      console.clear()
      const usage = process.memoryUsage()
      const row = {
        rss: this.bytesToMb(usage.rss), // process resident set size
        heapTotal: this.bytesToMb(usage.heapTotal), // v8 heap allocated
        heapUsed: this.bytesToMb(usage.heapUsed), // v8 heap used
        external: this.bytesToMb(usage.external), // c++ allocated
        stack: this.bytesToMb(usage.rss - usage.heapTotal), // stack
      }

      if (this.state.length > 10) {
        this.state = []
      }

      this.state.push(row)
      console.table(this.state)
    }, 1000)
  }

  stop() {
    clearInterval(this.timer)
    this.state = []
  }

  bytesToMb(bytes) {
    return Math.round(bytes / 1000, 2) / 1000
  }
}

module.exports = new Memory()
