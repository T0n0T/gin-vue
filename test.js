// 辅助函数：将路由数组转换为 Channel Map
function getChannelMap(router) {
  const channelMap = {};
  router.forEach(([source, target]) => {
      if (!channelMap[source]) {
          channelMap[source] = new Set();
      }
      channelMap[source].add(target);
  });
  return channelMap;
}

// 辅助函数：将路由数组转换为反向 Channel Map
function getReverseChannelMap(router) {
  const reverseMap = {};
  router.forEach(([source, target]) => {
      if (!reverseMap[target]) {
          reverseMap[target] = new Set();
      }
      reverseMap[target].add(source);
  });
  return reverseMap;
}

function transformRouterToChannel(prevRouter, newRouter) {
  const addedForwardChannel = new Set();
  const removedForwardChannel = new Set();
  const addedReverseChannel = new Set();
  const removedReverseChannel = new Set();
  
  // topic 关系
  const topics = new Map();          // nodeId -> {topic, type: 'publisher'|'subscriber', connectedNodes: Set}

  const prevForwardChannel = getChannelMap(prevRouter);
  const prevReverseChannel = getReverseChannelMap(prevRouter);
  const newForwardChannel = getChannelMap(newRouter);
  const newReverseChannel = getReverseChannelMap(newRouter);

  // 处理发布者（具有多个目标的节点）
  for (let source in newForwardChannel) {
      const targets = newForwardChannel[source];
      if (targets.size > 1) {
          // 创建发布者的 topic
          topics.set(source, {
              topic: `topic_${source}`,
              type: 'publisher',
              connectedNodes: new Set(targets) // 订阅者列表
          });
      }
  }

  // 处理订阅者（具有多个源的节点）
  for (let target in newReverseChannel) {
      const sources = newReverseChannel[target];
      if (sources.size > 1) {
          // 创建订阅者的 topic
          topics.set(target, {
              topic: `topic_${target}`,
              type: 'subscriber',
              connectedNodes: new Set(sources) // 发布者列表
          });
      }
  }

  // 处理 Channel 的创建
  for (let source in newForwardChannel) {
      if (newForwardChannel[source].size > 0) {
          addedForwardChannel.add(source);
      }
  }

  for (let target in newReverseChannel) {
      if (newReverseChannel[target].size > 0) {
          addedReverseChannel.add(target);
      }
  }

  return {
      addedForwardChannel,
      removedForwardChannel,
      addedReverseChannel,
      removedReverseChannel,
      topics: mapToObject(topics)
  };
}

// 辅助函数：将 Map 转换为普通对象
function mapToObject(map) {
  const obj = {};
  for (let [key, value] of map) {
      obj[key] = {
          ...value,
          connectedNodes: Array.from(value.connectedNodes)
      };
  }
  return obj;
}

// 测试用例
let prevRouter = [];
let newRouter = [
  [1, 2],
  [1, 3],
  [2, 4],
  [3, 4],
];

const result = transformRouterToChannel(prevRouter, newRouter);

console.log("Added Forward Channels:");
console.log(result.addedForwardChannel);

console.log("\nAdded Reverse Channels:");
console.log(result.addedReverseChannel);

console.log("\nTopics and their relationships:");
console.log(JSON.stringify(result.topics, null, 2));