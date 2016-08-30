function Planet( point, accel, stars ) {
	this.radius = 5;
	this.mass = 1;
	this.tooClose = false;
	this.tooFar = false;

	this.velocity = new THREE.Vector3();
	this.acceleration = accel;
	this.stars = stars;
	this.distance;

	var sphereGeom = new THREE.SphereGeometry( this.radius, 32, 32 );
	var sphereMat = new THREE.MeshStandardMaterial( { 
		color: 0xffffff,
	} );

	var randTex = Math.floor(Math.random() * 3 + 1);
	switch( randTex ) {
		case 1:
			sphereMat.map = planetTex1;
			break;
		case 2:
			sphereMat.map = planetTex2;
			break;
		case 3:
			sphereMat.map = planetTex3;
			break;
		default:
			break;
	}
	sphereMat.needsUpdate = true;

	this.mesh = new THREE.Mesh( sphereGeom, sphereMat );
	this.mesh.position.copy(point);
	scene.add( this.mesh );
}

Planet.prototype.update = function() {
	this.mesh.rotation.y += 0.001;

	for ( var i = 0; i < this.stars.length; i++ ) {
		var star = this.stars[ i ];
		var force = new THREE.Vector3();
		force.subVectors(star.mesh.position, this.mesh.position);

		this.distance = force.length();
		
		if( this.distance < star.radius ) {
			this.tooClose = true;
			var explosion = new THREE.PositionalAudio( listener );
			audioLoader.load( 'assets/sounds/explosion.ogg', function( buffer ) {
				explosion.setBuffer( buffer );
				explosion.setRefDistance( 500 );
				explosion.setVolume(0.2);
				explosion.play();
			} );
			this.mesh.add( explosion );
		}
		if( this.distance > 2000 ) this.tooFar = true;

		force.normalize();
		var strength = ( this.mass * star.mass ) / Math.pow( this.distance, 2 );
		force.multiplyScalar( strength );

		this.acceleration.add( force );
	}
	this.velocity.add( this.acceleration );
	this.mesh.position.add( this.velocity );
	this.acceleration.multiplyScalar( 0 );
};