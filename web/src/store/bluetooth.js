import { linkHorizontal } from 'd3'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBluetoothStore = defineStore('bluetooth', () => {
  // 状态
  const connectedDevices = ref([])
  const selectedDevice = ref(null)

  // actions
  function addConnectedDevice(device) {
    device.id = device.address // 使用地址作为ID
    console.log(device)
    connectedDevices.value.push(device)
  }

  function clearConnectedDevices(device) {
    if (device) {
      connectedDevices.value = connectedDevices.value.filter(d => d.address !== device.address)
    } else {
      connectedDevices.value = []
    }
  }

  function setSelectedDevice(device) {
    console.log('setSelectedDevice', device)
    selectedDevice.value = device
  }

  return {
    // 状态
    connectedDevices,
    selectedDevice,
    // actions
    addConnectedDevice,
    clearConnectedDevices,
    setSelectedDevice,
  }
})