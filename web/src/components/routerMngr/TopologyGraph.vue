<template>
    <div ref="graphContainer" class="graph-container"></div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import * as d3 from 'd3'

/**
 * @typedef {Object} Route
 * @property {string} name - 路由名称
 * @property {Object} upEntry - 数据入口
 * @property {string} upEntry.devType - 设备类型
 * @property {Object} upEntry.conn - 连接信息
 * @property {number} upEntry.conn.devID - 设备ID
 * @property {number} upEntry.conn.connID - 连接ID
 * @property {Object} downEntry - 数据出口
 * @property {string} downEntry.devType - 设备类型
 * @property {Object} downEntry.conn - 连接信息
 * @property {number} downEntry.conn.devID - 设备ID
 * @property {number} downEntry.conn.connID - 连接ID
 */

const props = defineProps({
    /** @type {Route[]} */
    routes: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(['selectRoute'])

/** @type {import('vue').Ref<HTMLElement|null>} */
const graphContainer = ref(null)

/** @type {any} */
let svg = null

/** @type {any} */
let simulation = null

/**
 * 更新拓扑图
 * @param {Route[]} routes - 路由数组
 */
const updateTopology = (routes) => {
    // 清除现有的所有节点和连接
    svg.selectAll('g.node').remove()
    svg.selectAll('g.link').remove()
    
    // 创建节点和连接
    const links = []
    const uniqueConnections = new Map()
    
    routes.forEach(route => {
        // 处理输入连接
        const inputId = `${route.upEntry.devType}_${route.upEntry.conn.connID}`
        if (!uniqueConnections.has(inputId)) {
            uniqueConnections.set(inputId, {
                id: inputId,
                name: `${getTypeName(route.upEntry.devType)}\n${route.upEntry.conn.connID}`,
                type: route.upEntry.devType
            })
        }
        
        // 处理输出连接
        const outputId = `${route.downEntry.devType}_${route.downEntry.conn.connID}`
        if (!uniqueConnections.has(outputId)) {
            uniqueConnections.set(outputId, {
                id: outputId,
                name: `${getTypeName(route.downEntry.devType)}\n${route.downEntry.conn.connID}`,
                type: route.downEntry.devType
            })
        }
        
        // 添加连接
        links.push({
            source: inputId,
            target: outputId,
            name: route.name,
            data: route
        })
    })
    
    // 转换为数组
    const nodes = Array.from(uniqueConnections.values())

    // 重新初始化力导向图
    simulation.nodes(nodes)
    simulation.force('link').links(links)
    
    // 创建所有节点
    const node = svg.selectAll('g.node')
        .data(nodes, d => d.id)
        .enter()
        .append('g')
        .attr('class', 'node')
        .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended))

    // 添加节点圆形
    node.append('circle')
        .attr('r', 25)
        .attr('fill', d => getNodeColor(d.type))
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)

    // 创建文本组
    const textGroup = node.append('g')
        .attr('class', 'text-group')
        .attr('transform', 'translate(0, 35)')

    // 添加设备类型文本
    textGroup.append('text')
        .attr('text-anchor', 'middle')
        .attr('fill', '#666')
        .attr('dy', '1em')
        .attr('font-size', '12px')
        .text(d => getTypeName(d.type))

    // 添加设备ID文本
    textGroup.append('text')
        .attr('text-anchor', 'middle')
        .attr('fill', '#666')
        .attr('dy', '2.2em')
        .attr('font-size', '12px')
        .text(d => d.name.split('\n')[1])

    // 创建所有连接线
    const link = svg.selectAll('g.link')
        .data(links)
        .enter()
        .append('g')
        .attr('class', 'link')

    // 添加连接线
    link.append('path')
        .attr('class', 'link-path')
        .attr('stroke', '#8392a5')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('marker-end', 'url(#arrowhead)')

    // 添加路由名称
    link.append('text')
        .attr('class', 'link-label')
        .attr('text-anchor', 'middle')
        .attr('dy', -5)
        .text(d => d.name)

    // 重启模拟
    simulation.alpha(1).restart()
}

/**
 * 获取节点类型的显示名称
 * @param {string} type - 节点类型
 * @returns {string} 显示名称
 */
const getTypeName = (type) => {
    const typeMap = {
        ble: '蓝牙',
        net: '以太网',
        wlan: '无线网络'
    }
    return typeMap[type] || type
}

/**
 * 获取节点颜色
 * @param {string} type - 节点类型
 * @returns {string} 颜色代码
 */
const getNodeColor = (type) => {
    const colorMap = {
        ble: '#409EFF',
        net: '#E6A23C',
        wlan: '#F56C6C'
    }
    return colorMap[type] || '#909399'
}

/**
 * 拖拽开始事件处理
 * @param {any} event - 拖拽事件
 * @param {any} d - 节点数据
 */
const dragstarted = (event, d) => {
    if (!event.active) simulation.alphaTarget(0.3).restart()
    d.fx = d.x
    d.fy = d.y
}

/**
 * 拖拽中事件处理
 * @param {any} event - 拖拽事件
 * @param {any} d - 节点数据
 */
const dragged = (event, d) => {
    d.fx = event.x
    d.fy = event.y
}

/**
 * 拖拽结束事件处理
 * @param {any} event - 拖拽事件
 * @param {any} d - 节点数据
 */
const dragended = (event, d) => {
    if (!event.active) simulation.alphaTarget(0)
    d.fx = null
    d.fy = null
}

// 监听路由数据变化
watch(() => props.routes, (newRoutes) => {
    if (svg && simulation) {
        updateTopology(newRoutes)
    }
}, { deep: true })

onMounted(() => {
    const width = graphContainer.value.clientWidth
    const height = graphContainer.value.clientHeight

    svg = d3.select(graphContainer.value)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width/2},${height/2})`)

    // 添加箭头标记
    svg.append('defs').append('marker')
        .attr('id', 'arrowhead')
        .attr('viewBox', '-0 -5 10 10')
        .attr('refX', 0)  // 修改为0，因为我们已经在路径计算中考虑了偏移
        .attr('refY', 0)
        .attr('orient', 'auto')
        .attr('markerWidth', 8)
        .attr('markerHeight', 8)
        .append('path')
        .attr('d', 'M 0,-5 L 10,0 L 0,5')
        .attr('fill', '#8392a5')

    simulation = d3.forceSimulation()
        .force('link', d3.forceLink().id(d => d.id).distance(150))
        .force('charge', d3.forceManyBody().strength(-800))
        .force('x', d3.forceX().strength(0.1))
        .force('y', d3.forceY().strength(0.1))

    simulation.on('tick', () => {
        // 更新节点位置
        svg.selectAll('g.node')
            .attr('transform', d => `translate(${d.x},${d.y})`)

        // 更新连接线
        svg.selectAll('.link-path')
            .attr('d', d => {
                const dx = d.target.x - d.source.x
                const dy = d.target.y - d.source.y
                const dr = Math.sqrt(dx * dx + dy * dy)
                
                // 如果是自环（头尾相连）
                if (d.source.id === d.target.id) {
                    const rx = 50
                    const ry = 50
                    return `M ${d.source.x} ${d.source.y} 
                            A ${rx} ${ry} 0 1 1 ${d.source.x} ${d.source.y + 1}`
                }
                
                // 计算节点边缘的起点和终点
                const radius = 25
                const angle = Math.atan2(dy, dx)
                
                const sourceX = d.source.x + radius * Math.cos(angle)
                const sourceY = d.source.y + radius * Math.sin(angle)
                const targetX = d.target.x - radius * Math.cos(angle)
                const targetY = d.target.y - radius * Math.sin(angle)
                
                return `M${sourceX},${sourceY}L${targetX},${targetY}`
            })

        // 更新标签位置
        svg.selectAll('.link-label')
            .attr('x', d => d.source.x + (d.target.x - d.source.x) * 0.5)
            .attr('y', d => d.source.y + (d.target.y - d.source.y) * 0.5)
    })

    // 初始化拓扑图
    if (props.routes.length > 0) {
        updateTopology(props.routes)
    }
})
</script>

<style scoped>
.graph-container {
    width: 100%;
    height: 100%;
    border-radius: 8px;
}

:deep(.node) {
    cursor: pointer;
}

:deep(.node:hover circle) {
    filter: brightness(0.9);
}

:deep(.link-path) {
    pointer-events: none;
}

:deep(.link-label) {
    font-size: 12px;
    pointer-events: none;
    fill: #666;
}

:deep(.text-group text) {
    user-select: none;
}
</style> 