export function depthFirstSearch(grid, startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  let unvisitedNodes = [];         // 未访问节点列表
  let visitedNodesInOrder = [];    // 已访问节点列表
  unvisitedNodes.push(startNode);
  while (unvisitedNodes.length !== 0) {
    let closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) continue;
    if (closestNode === finishNode) return visitedNodesInOrder;
    visitedNodesInOrder.push(closestNode);
    closestNode.isVisited = true;
    let unvisitedNeighbours = getUnvisitedNeighbours(closestNode, grid);
    for (let unvisitedNeighbour of unvisitedNeighbours) {
      unvisitedNeighbour.previousNode = closestNode;
      unvisitedNodes.unshift(unvisitedNeighbour);
    }
  }
  return visitedNodesInOrder;
}

// 获取未访问的相邻节点
function getUnvisitedNeighbours(node, grid) {
  let neighbours = [];
  let { row, col } = node;
  if (col !== 0) neighbours.push(grid[row][col - 1]);
  if (row !== 0) neighbours.push(grid[row - 1][col]);
  if (col !== grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  if (row !== grid.length - 1) neighbours.push(grid[row + 1][col]);
  return neighbours.filter((neighbour) => !neighbour.isVisited);
}

// 获取最短路径上的节点列表
export function getNodesInShortestPathOrderDFS(finishNode) {
  let nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
