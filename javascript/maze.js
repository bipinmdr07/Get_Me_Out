var cols, rows;
var w = 10;
var length = 100;
var breadth = 100;
var grid = [];

var current;	// variable used to identify the current cell

var stack = [];	// stack used for storing all current cell elements for backtraking

var floor_texture = new THREE.TextureLoader().load("assets/floor-texture.jpg");
floor_texture.wrapS = floor_texture.wrapT = THREE.RepeatWrapping;
floor_texture.repeat.set(w, w);
var floor_material = new THREE.MeshBasicMaterial({ map: floor_texture });

// base function responsible for the creation of maze
function setup(){
	var floor = new THREE.PlaneGeometry(length, breadth, 1);
	var floor_mesh = new THREE.Mesh(floor, floor_material);
	floor_mesh.position.set(0,0,0.05);
	scene.add(floor_mesh);	// adding floor_mesh in scene

	// calculating the number of cols and rows according to size of cell and whole maze
	cols = Math.floor(length/w);
	rows = Math.floor(breadth/w);
	console.log("cols: " + cols + ", " + "rows: " + rows);

	// storing all cells in a one dimensional array (all 100 cells) along with its wall information for
	// manipulation of wall datas in future
	for (var j = 0; j < rows; j++){
		for (var i = 0; i < cols; i++){
			var cell = new Cell(i, j);
			grid.push(cell);
		}
	}

	current = grid[0];	// setting the first cell as the current i.e. starting of the maze
}

// function used to construct the maze after retrieving all the wall information
function draw(){
	grid[0].walls[2] = false;	// creating an opening for player to enter the maze
	grid[grid.length - 1].walls[0] = false;	// creating an opening for player to leave the maze
	for (var i = 0; i< grid.length; i++){
		grid[i].show();
	}
}

// function used to manipulate the wall information and back tracking using stack
function draw_maze(){
	current.visited = true;	// setting the current cell object to visited for creating maze path
	stack.push(current);

	// if current cell object is really an object run the loop
	while(current){
		var next = current.checkNeighbors();

		// if next element is selected among the neighbors of current cell, start removing the barrior between
		// them i.e. wall
		if (next){
			removeWalls(current, next);
		}

		// set next cell as current cell
		current = next;

		// if current cell is found to be an object, push it into stack for backtracking
		if (current){
			current.visited = true;
			stack.push(current);
		}

		// if no neighbor of current cell is found and stack in not empty, start backtracking
		if (!current && stack.length > 0){
			current = stack.pop();
		}
	}

	// calling function to draw the maze
	draw();
}

// function used to return the neighbor's cell position stored in grid[]
function index(i, j){
	if (i < 0 || j < 0 || i > cols -1 || j > rows - 1){
		return undefined;
	}
	return i + j * cols;
}

// funtion for generating random value between min and max integer value
function random(min, max){
	return Math.floor(Math.random() * (max - min)) + min;
}

// constructor function for making the building block of maze i.e. cell
function Cell(i, j){
	this.i = i;
	this.j = j;
	this.walls = [true, true, true, true]; //	[front, right, back, left	]
	this.visited = false;

	this.checkNeighbors = function(){
		var neighbors = []; 	// array for storing all the neighbors of a cell if it is not been visited

		var front = grid[index(i, j + 1)];
		var right = grid[index(i + 1, j)];
		var back = grid[index(i, j - 1)];
		var left = grid[index(i - 1, j)];

		if(front && !front.visited){
			neighbors.push(front);
		}
		if(right && !right.visited){
			neighbors.push(right);
		}
		if(back && !back.visited){
			neighbors.push(back);
		}
		if(left && !left.visited){
			neighbors.push(left);
		}

		// if neighbor/s is present return random neighbor to choose it as next current element
		if(neighbors.length > 0){
			var r = parseInt(random(0, neighbors.length));
			return neighbors[r];
		}
		else {
			return undefined;
		}
	}


	// object function for displaying the walls of the maze according to array walls[] boolean values
	this.show = function(){

		var wall_texture = new THREE.TextureLoader().load("assets/maze_wall.jpg");
		var cube_material = new THREE.MeshBasicMaterial({ map: wall_texture });

		if(this.walls[0]){	//front wall
			var front_wall = new THREE.Mesh(new THREE.BoxGeometry(w, w/10, w), cube_material);	//(10, 1, 10)
			front_wall.position.set(-length/2 + w/2 + this.i * w, -length/2 + w - 1/(20 * w) + this.j * w, 5);
			scene.add(front_wall);
		}
		if(this.walls[1]){	// right wall
			var right_wall = new THREE.Mesh(new THREE.BoxGeometry(w/10, w, w), cube_material);	//(1, 10, 10)
			right_wall.position.set(-length/2 + w - 1/(20 * w) + this.i * w, -length/2 + w/2 + this.j * w, 5);
			scene.add(right_wall);
		}
		if(this.walls[2]){	// back wall
			var back_wall = new THREE.Mesh(new THREE.BoxGeometry(w, w/10, w), cube_material);	//(10, 1, 10)
			back_wall.position.set(-length/2 + w/2 + this.i * w, -length/2 + 1/(20 * w) + this.j * w, 5);
			scene.add(back_wall);
		}
		if(this.walls[3]){	// left wall
			var left_wall = new THREE.Mesh(new THREE.BoxGeometry(w/10, w, w), cube_material); //(1, 10, 10)
			left_wall.position.set(-length/2 + w/(20 * w) + this.i * w, -length/2 + w/2 + this.j * w, 5);
			scene.add(left_wall);
		}
	}
}

// function for removing the walls according to the current and next cell position
function removeWalls(a, b){
	var x = a.i - b.i;

	// current cell is in the right of next cell
	if (x === 1){
		a.walls[3] = false;
		b.walls[1] = false;
	}
	// current cell is in the left of next cell
	else if (x === -1){
		a.walls[1] = false;
		b.walls[3] = false;
	}

	var y = a.j - b.j;
	// current cell is in the front of next cell
	if (y === 1){
		a.walls[2] = false;
		b.walls[0] = false;
	}
	// current cell is in the back of next cell
	else if (y === -1){
		a.walls[0] = false;
		b.walls[2] = false;
	}
}
