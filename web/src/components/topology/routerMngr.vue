<template>
    <div ref="graphContainer" class="graph-container"></div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import * as d3 from 'd3'

const props = defineProps({
    routes: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(['selectRoute'])
const graphContainer = ref(null)
let svg = null
let simulation = null

const updateTopology = (routes) => {
    // 创建节点和连接
    const nodes = []
    const links = []
    
    routes.forEach(route => {
        // 添加输入节点
        const inputNode = {
            id: `input-${route.id}`,
            name: getInterfaceTypeName(route.input.type),
            type: 'input',
            routeId: route.id
        }
        
        // 添加路由节点
        const routeNode = {
            id: `route-${route.id}`,
            name: route.name,
            type: 'route',
            routeId: route.id
        }
        
        // 添加输出节点
        const outputNode = {
            id: `output-${route.id}`,
            name: getInterfaceTypeName(route.output.type),
            type: 'output',
            routeId: route.id
        }
        
        nodes.push(inputNode, routeNode, outputNode)
        
        // 添加连接
        links.push(
            { source: inputNode.id, target: routeNode.id },
            { source: routeNode.id, target: outputNode.id }
        )
    })

    // 更新力导向图
    simulation.nodes(nodes)
    simulation.force('link').links(links)
    simulation.alpha(1).restart()

    // 更新视图
    updateNodes(nodes)
    updateLinks(links)
}

// 其他辅助函数
const getInterfaceTypeName = (type) => {
    const types = {
        bluetooth: '蓝牙',
        network: '网络连接'
    }
    return types[type] || type
}

const getNodeColor = (type) => {
    const colors = {
        input: '#4CAF50',
        route: '#2196F3',
        output: '#FF9800'
    }
    return colors[type] || '#999'
}

// 拖拽相关函数
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

// 更新节点和连接的函数
const updateNodes = (nodes) => {
    const node = svg.selectAll('g.node')
        .data(nodes, d => d.id)

    node.exit().remove()

    const nodeEnter = node.enter()
        .append('g')
        .attr('class', 'node')
        .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended))
        .on('click', (event, d) => {
            if (d.type === 'route') {
                emit('selectRoute', d)
            }
        })

    nodeEnter.append('circle')
        .attr('r', d => d.type === 'route' ? 25 : 20)
        .attr('fill', d => getNodeColor(d.type))
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)

    nodeEnter.append('text')
        .text(d => d.name)
        .attr('x', 0)
        .attr('y', 35)
        .attr('text-anchor', 'middle')
        .attr('fill', '#666')
        .style('font-size', '12px')
}

const updateLinks = (links) => {
    const link = svg.selectAll('line.link')
        .data(links, d => d.source.id + '-' + d.target.id)

    link.exit().remove()

    link.enter()
        .append('line')
        .attr('class', 'link')
        .attr('stroke', '#999')
        .attr('stroke-opacity', 0.6)
        .attr('stroke-width', 2)
        .attr('marker-end', 'url(#arrowhead)')

    svg.selectAll('line.link')
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)
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

    // 添加箭头标记
    svg.append('defs').append('marker')
        .attr('id', 'arrowhead')
        .attr('viewBox', '-0 -5 10 10')
        .attr('refX', 20)
        .attr('refY', 0)
        .attr('orient', 'auto')
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .append('path')
        .attr('d', 'M 0,-5 L 10,0 L 0,5')
        .attr('fill', '#999')

    simulation = d3.forceSimulation()
        .force('link', d3.forceLink().id(d => d.id).distance(100))
        .force('charge', d3.forceManyBody().strength(-1000))
        .force('center', d3.forceCenter(width / 2, height / 2))

    simulation.on('tick', () => {
        svg.selectAll('g.node')
            .attr('transform', d => `translate(${d.x},${d.y})`)

        svg.selectAll('line.link')
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y)
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
    background: #f5f7fa;
    border-radius: 8px;
}

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