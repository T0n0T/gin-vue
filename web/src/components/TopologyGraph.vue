<template>
    <div ref="graphContainer" class="graph-container"></div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import * as d3 from 'd3'

const props = defineProps({
    devices: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(['openScanDialog', 'selectDevice'])

const graphContainer = ref(null)
let svg = null
let simulation = null

// 监听设备数据变化，更新拓扑图
watch(() => props.devices, (newDevices) => {
    if (svg) {
        updateTopology(newDevices)
    }
}, { deep: true })

// 更新拓扑图的方法
const updateTopology = (devices) => {
    // 创建节点和连接
    const nodes = [
        //主机
        { 
            id: 'central',
            name: 'Central Device',
            type: 'central',
            address: '00:11:22:33:44:55'
        },
        //从机
        ...devices.map(d => ({
            ...d,
            type: 'peripheral'
        }))
    ]
    
    const links = devices.map(d => ({
        source: 'central',
        target: d.id || d.address,
        rssi: d.rssi
    }))

    // 更新力导向图
    simulation.nodes(nodes)
    simulation.force('link').links(links)
    simulation.alpha(1).restart()

    // 更新视图
    updateNodes(nodes)
    updateLinks(links)
}

// 添加拖拽相关的函数
const dragstarted = (event, d) => {
    if (!event.active) simulation.alphaTarget(0.3).restart()
    d.fx = d.x
    d.fy = d.y
}

const dragged = (event, d) => {
    d.fx = event.x
    d.fy = event.y
}

const dragended = (event, d) => {
    if (!event.active) simulation.alphaTarget(0)
    d.fx = null
    d.fy = null
}

const updateNodes = (nodes) => {
    // 更新节点组
    const node = svg.selectAll('g.node')
        .data(nodes, d => d.id || d.address)

    // 删除旧节点
    node.exit().remove()

    // 添加新节点
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

const updateLinks = (links) => {
    // 更新连接线
    const link = svg.selectAll('line.link')
        .data(links, d => d.source.id + '-' + d.target.id)

    // 删除旧连接
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

const handleAdapterClick = () => {
    emit('openScanDialog')
}

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