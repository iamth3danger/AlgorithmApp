# Pathingfinding Visualizer
Welcome to Pathfinding Visualizer! I built this application because I was fascinated by pathfinding algorithms, 
and I wanted to learn more about them by building this application. I hope that you enjoy playing around with this visualization tool just as much as I enjoyed building it. 
You can access it here https://iamth3danger.github.io/AlgorithmApp/

# Buttons
**Weights** - Dijkstra's Algorithm is a weighted algorithm. This means that it searches through the distances between nodes. A node is visualized as a square on the grid.
Each color respresents the distance to get to the node. The Weight button assigns each node in the grid a random distance from 1 to 6 and then colors it according to the 
distance.

**Distances**

**1**

![weight1copy](https://user-images.githubusercontent.com/85238495/225477113-bb0f6435-39a8-4212-9391-a23619763548.png)

**2**

![weight2](https://user-images.githubusercontent.com/85238495/225478382-dd2d32d9-c4ba-4161-a110-e5584959d1fe.png)

**3**

![weight3](https://user-images.githubusercontent.com/85238495/225478505-c51ee140-628d-49b7-b7f4-12e4dfc34707.png)

**4**

![weight4](https://user-images.githubusercontent.com/85238495/225478663-b1429f92-4d29-400f-8903-60170f09af81.png)

**5**

![weight5](https://user-images.githubusercontent.com/85238495/225478747-4b6d242e-0b99-4fc9-b18c-010099463f07.png)

**6**

![weight6](https://user-images.githubusercontent.com/85238495/225478828-fbecc4cd-c5fe-4d38-876b-94f90d996046.png)

**Weight Grid**

![weightGrid](https://user-images.githubusercontent.com/85238495/225478899-c643f48d-6369-40b2-beb3-d6e61b9e9f73.png)

**Dijkstra**

Once the Weight Grid is assembled, Dijkstra will find the shortest path between the start and end node accounting for the weights.
It does this with a distance array of all the nodes set to infinity except the start node which is set to zero. Then the algorithm visits
each nodes and notes the distance it takes to get to that node from the start node. At the end, the array will have the shortest distance to each node.
To make a path, I made an object of all the nodes with the key being the previous node with the shortest distance. I then back tracked from the end to the start
with a loop.

**Dijkstra in Action**

![Dijkstra](https://user-images.githubusercontent.com/85238495/225479853-9810cc77-d3d1-4878-822f-e67fea00a96f.png)

**Dijkstra Path**

![DijkstraPath](https://user-images.githubusercontent.com/85238495/225482823-e404885b-9048-4217-aed9-0f500746eb9c.png)

**BFS**

Short for Breadth First Search. This is an unweighted pathfinding algorithm. It works by using a queue. First the alogrithm adds the start node to the key
and then it explores its neighbors. The neighbors would be the adjacent sqaures or nodes on the graph. Then it removes the start node from the queue and explores the 
neighbors of the start node's neighbors and so on. The algorithm ends when it finds the end node or runs out of neighbors to explore. To make the shortest path, 
I used an object to backtrack from the end node to the neighbor that's closest to the start node. I repeat this until it reaches the start node.

**Breadth First Searching**

![bfs](https://user-images.githubusercontent.com/85238495/225486654-a962db61-65aa-4302-a9f1-99e72e1b5ced.png)

**Resulting Path**

![bfspath](https://user-images.githubusercontent.com/85238495/225486835-76f3436a-2a8a-4b16-a1ef-9bbf856ff76e.png)


**Maze**

This button creates a Maze using a recursize division algorithm. The algorithm works by splitting the grid vertically and horizontally by drawing black lines
with the squares. It then leaves a hole in the lines. This makes four quadrants which the algorithm explores. It goes to each quadrant and splits it 
just like before and repeats until there is no more to split. Breadth First Search can be used to find a path from two nodes. However, there is
only one path due to the way the algorithm splits.

**Maze**

![maze](https://user-images.githubusercontent.com/85238495/225488203-0a3fc24d-3ae6-4fed-8fca-9bc1379ff1f6.png)

**Maze with Breadth First Search**

![mazebfs](https://user-images.githubusercontent.com/85238495/225488321-6033f2f2-36e9-493b-a8bc-4c2943846ac2.png)

**Random**

This button picks two random points on the graph. The green node is the start node and the purple node is the end node. This only picks odd points because
the recursive division occurs on even points.

**Clear**

This button just clears the grid entirely.

**Start**

When this button is clicked, you can click some node on the grid and that will be the start node. Click another node and it will become the end node.






















