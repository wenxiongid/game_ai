const PRM = {
	NumAgents: 300,
	NumObstacles: 7,
	MinObstacleRadius: 10,
	MaxObstacleRadius: 30,
	//number of horizontal cells used for spatial partitioning
	NumCellsX: 7,
	//number of vertical cells used for spatial partitioning
	NumCellsY: 7,
	//how many samples the smoother will use to average a value
	NumSamplesForSmoothing: 10,
	//this is used to multiply the steering force AND all the multipliers
	//found in SteeringBehavior
	SteeringForceTweaker: 200.0,
	SteeringForce: 2.0,
	MaxSteeringForce: 2 * 200,
	MaxSpeed: 150.0,
	VehicleMass: 1.0,
	VehicleScale: 3.0,
	//use these values to tweak the amount that each steering force
	//contributes to the total steering force
	SeparationWeight: 1.0 * 200,
	AlignmentWeight: 1.0 * 200,
	CohesionWeight: 2.0 * 200,
	ObstacleAvoidanceWeight: 10.0 * 200,
	WallAvoidanceWeight: 10.0 * 200,
	WanderWeight: 1.0 * 200,
	SeekWeight: 1.0 * 200,
	FleeWeight: 1.0 * 200,
	ArriveWeight: 1.0 * 200,
	PursuitWeight: 1.0 * 200,
	OffsetPursuitWeight: 1.0 * 200,
	InterposeWeight: 1.0 * 200,
	HideWeight: 1.0 * 200,
	EvadeWeight: 0.01 * 200,
	FollowPathWeight: 0.05 * 200,
	//how close a neighbour must be before an agent perceives it (considers it
	//to be within its neighborhood)
	ViewDistance: 50.0,
	//used in obstacle avoidance
	MinDetectionBoxLength: 40.0,
	//used in wall avoidance
	WallDetectionFeelerLength: 40.0,
	//these are the probabilities that a steering behavior will be used
	//when the Prioritized Dither calculate method is used to sum
	//combined behaviors
	prWallAvoidance: 0.5,
	prObstacleAvoidance: 0.5,
	prSeparation: 0.2,
	prAlignment: 0.3,
	prCohesion: 0.6,
	prWander: 0.8,
	prSeek: 0.8,
	prFlee: 0.6,
	prEvade: 1.0,
	prHide: 0.8,
	prArrive: 0.5,
	MaxTurnRatePerSecond: Math.PI
};

export default PRM;