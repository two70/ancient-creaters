function Star( point ) {
	this.radius = 50;
	this.mass = 500;

	var sphereGeom = new THREE.SphereGeometry( this.radius, 32, 32 );
	var sphereMat = new THREE.MeshBasicMaterial( { 
		map: new THREE.TextureLoader().load( "assets/textures/sun.png" ),
		blending: THREE.AdditiveBlending
    	//transparent: true 
	} );
	this.mesh = new THREE.Mesh( sphereGeom, sphereMat );
	this.mesh.position.copy( point );
	scene.add( this.mesh );
	
	var starLight = new THREE.PointLight( 0xffee88, 5, 2000, 1 );
	starLight.position.copy( point );
	scene.add( starLight );
	
}

Star.prototype.update = function() {
	this.mesh.rotation.y += 0.005;
};