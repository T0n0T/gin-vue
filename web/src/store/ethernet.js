import { defineStore } from 'pinia'

export const useEthernetStore = defineStore('ethernet', {
  state: () => ({
    connections: []
  }),
  actions: {
    addConnection(connection) {
      this.connections.push(connection)
    },
    removeConnection(connection) {
      this.connections = this.connections.filter((conn) => conn !== connection)
    },
    updateConnection(oldConnection, newConnection) {
      const index = this.connections.indexOf(oldConnection)
      if (index !== -1) {
        this.connections.splice(index, 1, newConnection)
      }
    }
  }
})
