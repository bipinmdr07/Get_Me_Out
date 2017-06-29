detectCollision = function( ){

	var dist = 0.9;

	// var origin = new THREE.Vector3(cube_mesh.position.x, cube_mesh.position.y, cube_mesh.position.z);
	var origin = cube_mesh.getWorldPosition();

	var rayHits = [];
	for ( var i = 0; i < rays.length; i++){

		var matrix = new THREE.Matrix4();
		matrix.extractRotation(cube_mesh.matrix);

		var dir = new THREE.Vector3().copy(rays[i]);
		dir = dir.applyMatrix4( matrix ).normalize();
		// dir = dir.sub(origin).normalize();

		raycaster = new THREE.Raycaster(origin, dir, 0.6, dist);

		// raycaster.set(position, rays[i]);
		// raycaster.near = 0.6;
		// raycaster.far = 0.9;
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

	// if (rayHits.length > 0){
	//
	// 	console.log("hit");
	//
	// }

}
