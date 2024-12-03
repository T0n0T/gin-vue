<template>
    <div ref="graphContainer" class="graph-container"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as d3 from 'd3'

// 模拟数据
const mockDevices = [
    { 
        id: 'central',
        name: 'Central Device',
        type: 'central',
        address: '00:11:22:33:44:55'
    },
    {
        id: 'peripheral1',
        name: 'iPhone 13',
        type: 'peripheral',
        address: 'AA:BB:CC:DD:EE:FF',
        rssi: -65,
        services: ['Heart Rate', 'Battery']
    },
    {
        id: 'peripheral2',
        name: 'Mi Band 7',
        type: 'peripheral',
        address: '11:22:33:44:55:66',
        rssi: -72,
        services: ['Fitness', 'Battery']
    },
    {
        id: 'peripheral3',
        name: 'BLE Speaker',
        type: 'peripheral',
        address: 'BB:CC:DD:EE:FF:00',
        rssi: -58,
        services: ['Audio']
    }
]

const graphContainer = ref(null)

onMounted(() => {
    const width = graphContainer.value.clientWidth
    const height = graphContainer.value.clientHeight

    const svg = d3.select(graphContainer.value)
        .append('svg')
        .attr('width', width)
        .attr('height', height)

    // 创建节点和连接
    const nodes = mockDevices
    const links = mockDevices
        .filter(d => d.type === 'peripheral')
        .map(d => ({
            source: 'central',
            target: d.id,
            rssi: d.rssi
        }))

    // 创建力导向图模拟
    const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(150))
        .force('charge', d3.forceManyBody().strength(-1000))
        .force('center', d3.forceCenter(width / 2, height / 2))

    // 绘制连接线
    const link = svg.append('g')
        .selectAll('line')
        .data(links)
        .join('line')
        .attr('stroke', '#999')
        .attr('stroke-opacity', 0.6)
        .attr('stroke-width', d => Math.max(1, (100 + d.rssi) / 20)) // RSSI 越强，线越粗

    // 创建节点组
    const node = svg.append('g')
        .selectAll('g')
        .data(nodes)
        .join('g')
        .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended))

    // 添加节点圆圈
    node.append('circle')
        .attr('r', d => d.type === 'central' ? 30 : 20)
        .attr('fill', d => d.type === 'central' ? '#4CAF50' : '#2196F3')
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)

    // 添加设备名称标签
    node.append('text')
        .text(d => d.name)
        .attr('x', 0)
        .attr('y', d => d.type === 'central' ? 45 : 35)
        .attr('text-anchor', 'middle')
        .attr('fill', '#666')
        .style('font-size', '12px')

    // 添加地址标签
    node.append('text')
        .text(d => d.address)
        .attr('x', 0)
        .attr('y', d => d.type === 'central' ? 60 : 50)
        .attr('text-anchor', 'middle')
        .attr('fill', '#999')
        .style('font-size', '10px')

    // 更新力导向图
    simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y)

        node
            .attr('transform', d => `translate(${d.x},${d.y})`)
    })

    // 拖拽功能
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        d.fx = d.x
        d.fy = d.y
    }

    function dragged(event, d) {
        d.fx = event.x
        d.fy = event.y
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0)
        d.fx = null
        d.fy = null
    }
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