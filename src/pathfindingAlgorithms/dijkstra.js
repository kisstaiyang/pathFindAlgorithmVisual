export function dijkstra(grid, startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  startNode.distance = 0;
  let unvisitedNodes = getNodes(grid);
  let visitedNodesInOrder = [];
  while (unvisitedNodes.length !== 0) {
    unvisitedNodes.sort((a, b) => a.distance - b.distance);
    let closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    if (closestNode === finishNode) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    updateUnvisitedNeighbours(closestNode, grid);
  }
}

// 获取所有节点
function getNodes(grid) {
  let nodes = [];
  for (let row of grid) {
    for (let node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

// 更新未访问的相邻节点
function updateUnvisitedNeighbours(node, grid) {
  let unvisitedNeighbours = getUnvisitedNeighbours(node, grid);
  for (let unvisitedNeighbour of unvisitedNeighbours) {
    unvisitedNeighbour.distance = node.distance + 1;
    unvisitedNeighbour.previousNode = node;
  }
}

// 获取未访问的相邻节点
function getUnvisitedNeighbours(node, grid) {
  let neighbours = [];
  let { row, col } = node;
  if (row !== 0) neighbours.push(grid[row - 1][col]);
  if (col !== grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  if (row !== grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col !== 0) neighbours.push(grid[row][col - 1]);
  return neighbours
    .filter((neighbour) => !neighbour.isWall)
    .filter((neighbour) => !neighbour.isVisited);
}

// 获取最短路径上的节点列表
export function getNodesInShortestPathOrderDijkstra(finishNode) {
  let nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
