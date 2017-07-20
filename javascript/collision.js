// function for checking the collision of character with maze walls
detectCollision = function( ){

	// distance up to where the ray needed to cast for detecting the collision
	var dist = 0.9;

	// var origin = new THREE.Vector3(cube_mesh.position.x, cube_mesh.position.y, cube_mesh.position.z);
	var origin = cube_mesh.getWorldPosition();

	//	for casting the ray in all 8 direction reusing the one raycaster
	for ( var i = 0; i < rays.length; i++){

		// extracting the rotation matrix of the cube_mesh
		var matrix = new THREE.Matrix4();
		matrix.extractRotation(cube_mesh.matrix);

		// the direction in which the ray is to be cast from origin of the character
		var dir = new THREE.Vector3().copy(rays[i]);
		dir = dir.applyMatrix4( matrix ).normalize();
		// dir = dir.sub(origin).normalize();

		raycaster = new THREE.Raycaster(origin, dir, 0.6, dist);

		// setting the value of intersections if any ray hit the wall
		var intersections = raycaster.intersectObjects(collidable_walls);

		if (intersections.length > 0){

			// 0 = forward
			// 1 = backward
			// 2 = left
			// 3 = right
			// 4 = forward right
			// 5 = forward left
			// 6 = backward right
			// 7 = backward left

			// checking which ray intersects the wall for handeling the movement
			switch (i) {
				case 0:
					// console.log("forward: " + i);
					cube_mesh.translateY(-0.1);
					help_cube_mesh.translateY(-0.1);
					break;

				case 1:
					// console.log("backward: " + i);
					cube_mesh.translateY(0.1);
					help_cube_mesh.translateY(0.1);
					break;
				case 2:
					// console.log("left: " + i);
					cube_mesh.translateX(0.1);
					help_cube_mesh.translateX(0.1);
					break;
				case 3:
					// console.log("right: " + i);
					cube_mesh.translateX(-0.1);
					help_cube_mesh.translateX(-0.1);
				break;

				case 4:
					// console.log("forward right: " + i);
					cube_mesh.translateX(-0.1);
					cube_mesh.translateY(-0.1);
					help_cube_mesh.translateX(-0.1);
					help_cube_mesh.translateY(-0.1);
					break;

				case 5:
					// console.log("forward left: " + i);
					cube_mesh.translateX(0.1);
					cube_mesh.translateY(-0.1);
					help_cube_mesh.translateX(0.1);
					help_cube_mesh.translateY(-0.1);
					break;

				case 6:
					// console.log("backward right:" + i);
					cube_mesh.translateX(-0.1);
					cube_mesh.translateY(0.1);
					help_cube_mesh.translateX(-0.1);
					help_cube_mesh.translateY(0.1);
					break;
				case 7:
					// console.log("backward left: " + i);
					cube_mesh.translateX(0.1);
					cube_mesh.translateY(0.1);
					help_cube_mesh.translateX(0.1);
					help_cube_mesh.translateY(0.1);
					break;

			}

		}

	}

}
