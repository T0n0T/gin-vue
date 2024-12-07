<template>
    <div ref="graphContainer" class="graph-container"></div>
</template>

<script setup>
/**
 * @file 蓝牙拓扑图组件
 * @description 使用D3.js实现的蓝牙设备拓扑图可视化组件，展示中心设备与周边设备的连接关系
 */

import { onMounted, ref, watch } from 'vue'
import * as d3 from 'd3'

/**
 * @typedef {Object} Device
 * @property {string} id - 设备ID
 * @property {string} name - 设备名称
 * @property {string} address - MAC地址
 * @property {number} rssi - 信号强度(dBm)
 * @property {'central'|'peripheral'} [type] - 设备类型
 */

/**
 * @typedef {Object} Link
 * @property {string} source - 源设备ID
 * @property {string} target - 目标设备ID
 * @property {number} rssi - 连接信号强度
 */

const props = defineProps({
    /** @type {Device[]} */
    devices: {
        type: Array,
        default: () => []
    }
})

/** @type {import('vue').Ref<HTMLElement|null>} */
const graphContainer = ref(null)

/** @type {d3.Selection} */
let svg = null

/** @type {d3.Simulation} */
let simulation = null

/**
 * 监听设备数据变化，更新拓扑图
 * @param {Device[]} newDevices - 新的设备列表
 */
watch(() => props.devices, (newDevices) => {
    if (svg && simulation) {
        updateTopology(newDevices)
    }
}, { deep: true })

/**
 * 更新拓扑图
 * @param {Device[]} devices - 设备列表
 * @returns {void}
 */
const updateTopology = (devices) => {
    /** @type {Device} */
    const centralDevice = {
        id: 'central',
        name: 'Central Device',
        type: 'central',
        address: '00:11:22:33:44:55'
    }

    /** @type {Device[]} */
    const nodes = [
        centralDevice,
        ...devices.map(d => ({
            ...d,
            type: 'peripheral'
        }))
    ]
    
    /** @type {Link[]} */
    const links = devices.map(d => ({
        source: 'central',
        target: d.id || d.address,
        rssi: d.rssi
    }))

    simulation.nodes(nodes)
    simulation.force('link').links(links)
    simulation.alpha(1).restart()

    updateNodes(nodes)
    updateLinks(links)
}

/**
 * 处理拖拽开始事件
 * @param {d3.D3DragEvent<any, Device, any>} event - D3拖拽事件
 * @param {Device} d - 节点数据
 */
const dragstarted = (event, d) => {
    if (!event.active) simulation.alphaTarget(0.3).restart()
    d.fx = d.x
    d.fy = d.y
}

/**
 * 处理拖拽过程事件
 * @param {d3.D3DragEvent<any, Device, any>} event - D3拖拽事件
 * @param {Device} d - 节点数据
 */
const dragged = (event, d) => {
    d.fx = event.x
    d.fy = event.y
}

/**
 * 处理拖拽结束事件
 * @param {d3.D3DragEvent<any, Device, any>} event - D3拖拽事件
 * @param {Device} d - 节点数据
 */
const dragended = (event, d) => {
    if (!event.active) simulation.alphaTarget(0)
    d.fx = null
    d.fy = null
}

/**
 * 更新节点视图
 * @param {Device[]} nodes - 节点数据数组
 */
const updateNodes = (nodes) => {
    const node = svg.selectAll('g.node')
        .data(nodes, d => d.id || d.address)

    node.exit().remove()

    const nodeEnter = node.enter()
        .append('g')
        .attr('class', 'node')
        .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended))
        .on('click', (event, d) => {
            if (d.type === 'central') {
                handleAdapterClick()
            } else {
                emit('selectDevice', d)
            }
        })

    // 添加节点圆圈
    nodeEnter.append('circle')
        .attr('r', d => d.type === 'central' ? 30 : 20)
        .attr('fill', d => d.type === 'central' ? '#4CAF50' : '#2196F3')
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)

    // 添加设备名称标签
    nodeEnter.append('text')
        .text(d => d.name)
        .attr('x', 0)
        .attr('y', d => d.type === 'central' ? 45 : 35)
        .attr('text-anchor', 'middle')
        .attr('fill', '#666')
        .style('font-size', '12px')

    // 添加地址标签
    nodeEnter.append('text')
        .text(d => d.address)
        .attr('x', 0)
        .attr('y', d => d.type === 'central' ? 60 : 50)
        .attr('text-anchor', 'middle')
        .attr('fill', '#999')
        .style('font-size', '10px')
}

/**
 * 更新连接线视图
 * @param {Link[]} links - 连接线数据数组
 */
const updateLinks = (links) => {
    const link = svg.selectAll('line.link')
        .data(links, d => d.source.id + '-' + d.target.id)

    link.exit().remove()

    // 添加新连接
    link.enter()
        .append('line')
        .attr('class', 'link')
        .attr('stroke', '#999')
        .attr('stroke-opacity', 0.6)
        .attr('stroke-width', d => Math.max(1, (100 + d.rssi) / 20))

    // 更新所有连接
    svg.selectAll('line.link')
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)
}

/**
 * 处理中心适配器点击事件
 * @emits openScanDialog
 */
const handleAdapterClick = () => {
    emit('openScanDialog')
}

/**
 * 组件挂载时初始化D3力导向图
 */
onMounted(() => {
    const width = graphContainer.value.clientWidth
    const height = graphContainer.value.clientHeight

    svg = d3.select(graphContainer.value)
        .append('svg')
        .attr('width', width)
        .attr('height', height)

    // 创建力导向图模拟
    simulation = d3.forceSimulation()
        .force('link', d3.forceLink().id(d => d.id || d.address).distance(150))
        .force('charge', d3.forceManyBody().strength(-1000))
        .force('center', d3.forceCenter(width / 2, height / 2))

    // 初始化主机适配器节点
    const initialNodes = [{
        id: 'central',
        name: 'Central Device',
        type: 'central',
        address: '00:11:22:33:44:55'
    }]

    // 更新节点
    updateNodes(initialNodes)
    
    // 初始化模拟器节点
    simulation.nodes(initialNodes)
    simulation.alpha(1).restart()

    // 监听力导向图的tick事件
    simulation.on('tick', () => {
        // 更新节点位置
        svg.selectAll('g.node')
            .attr('transform', d => `translate(${d.x},${d.y})`)

        // 更新连接线位置
        svg.selectAll('line.link')
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y)
    })
})
</script>

<style scoped>
.graph-container {
    width: 100%;
    height: 100%;
    background: #f5f7fa;
    border-radius: 8px;
}

/* 添加一些基本的 SVG 样式 */
:deep(svg) {
    user-select: none;
}

:deep(circle) {
    cursor: pointer;
}

:deep(text) {
    pointer-events: none;
}
</style>