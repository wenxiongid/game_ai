// -------------------------[[ General game parameters ]]-------------------------
// -------------------------------------------------------------------------------

// --the number of bots the game instantiates

export const NumBots   = 1

// --this is the maximum number of search cycles allocated to *all* current path
// -- planning searches per update
export const MaxSearchCyclesPerUpdateStep = 1000

// --the name of the default map
export const StartMap = "maps/Raven_DM1.map"

// --cell space partitioning defaults
export const NumCellsX = 10
export const NumCellsY = 10

// --how long the graves remain on screen
export const GraveLifetime = 5

// -------------------------[[ bot parameters ]]----------------------------------
// -------------------------------------------------------------------------------
export const Bot_MaxHealth = 100
export const Bot_MaxSpeed  = 1
export const Bot_Mass      = 1
export const Bot_MaxForce  = 1.0
export const Bot_MaxHeadTurnRate = 0.2
export const Bot_Scale       = 0.8

export const Bot_MaxSwimmingSpeed = Bot_MaxSpeed * 0.2
export const Bot_MaxCrawlingSpeed = Bot_MaxSpeed * 0.6

// --the number of times a second a bot 'thinks' about weapon selection
export const Bot_WeaponSelectionFrequency = 2

// --the number of times a second a bot 'thinks' about changing strategy
export const Bot_GoalAppraisalUpdateFreq = 4

// --the number of times a second a bot updates its target info
export const Bot_TargetingUpdateFreq = 2

// --the number of times a second the triggers are updated
export const Bot_TriggerUpdateFreq = 8

// --the number of times a second a bot updates its vision
export const Bot_VisionUpdateFreq = 4

// --note that a frequency of -1 will disable the feature and a frequency of zero
// --will ensure the feature is updated every bot update


// --the bot's field of view (in degrees)
export const Bot_FOV = 180

// --the bot's reaction time (in seconds)
export const Bot_ReactionTime = 0.2

// --how long (in seconds) the bot will keep pointing its weapon at its target
// --after the target goes out of view
export const Bot_AimPersistance = 1

// --how accurate the bots are at aiming. 0 is very accurate, (the value represents
// -- the max deviation in range (in radians))
export const Bot_AimAccuracy = 0.0

// --how long a flash is displayed when the bot is hit
export const HitFlashTime = 0.2

// --how long (in seconds) a bot's sensory memory persists
export const Bot_MemorySpan = 5

// --goal tweakers
export const Bot_HealthGoalTweaker     = 1.0
export const Bot_ShotgunGoalTweaker    = 1.0
export const Bot_RailgunGoalTweaker    = 1.0
export const Bot_RocketLauncherTweaker = 1.0
export const Bot_AggroGoalTweaker      = 1.0

// -------------------------[[ steering parameters ]]-----------------------------
// -------------------------------------------------------------------------------

// --use these values to tweak the amount that each steering force
// --contributes to the total steering force
export const SeparationWeight       =   10.0;
export const WallAvoidanceWeight     =  10.0;
export const WanderWeight            =  1.0;
export const SeekWeight              =  0.5;
export const ArriveWeight            =  1.0;

// --how close a neighbour must be before an agent considers it
// --to be within its neighborhood (for separation)
export const ViewDistance            =  15.0;

// --max feeler length
export const WallDetectionFeelerLength = 25.0 * Bot_Scale;

// --used in path following. Determines how close a bot must be to a waypoint
// --before it seeks the next waypoint
export const WaypointSeekDist   = 5;

// -------------------------[[ giver-trigger parameters ]]-----------------------------
// -------------------------------------------------------------------------------

// --how close a bot must be to a giver-trigger for it to affect it
export const DefaultGiverTriggerRange = 10

// --how many seconds before a giver-trigger reactivates itself
export const Health_RespawnDelay  = 10
export const Weapon_RespawnDelay  = 15

// -------------------------[[ weapon parameters ]]-------------------------------
// -------------------------------------------------------------------------------

export const Blaster_FiringFreq       = 3
export const Blaster_MaxSpeed		 = 5
export const Blaster_DefaultRounds    = 0 //--not used, a blaster always has ammo
export const Blaster_MaxRoundsCarried = 0 //--as above
export const Blaster_IdealRange		   = 50
export const Blaster_SoundRange	     = 100

export const Bolt_MaxSpeed    = 5
export const Bolt_Mass        = 1
export const Bolt_MaxForce    = 100.0
export const Bolt_Scale       = Bot_Scale
export const Bolt_Damage      = 1



export const RocketLauncher_FiringFreq       = 1.5
export const RocketLauncher_DefaultRounds      = 15
export const RocketLauncher_MaxRoundsCarried = 50
export const RocketLauncher_IdealRange  = 150
export const RocketLauncher_SoundRange  = 400

export const Rocket_BlastRadius = 20
export const Rocket_MaxSpeed    = 3
export const Rocket_Mass        = 1
export const Rocket_MaxForce    = 10.0
export const Rocket_Scale       = Bot_Scale
export const Rocket_Damage      = 10
export const Rocket_ExplosionDecayRate = 2.0   //--how fast the explosion occurs (in secs)


export const RailGun_FiringFreq       = 1
export const RailGun_DefaultRounds      = 15
export const RailGun_MaxRoundsCarried = 50
export const RailGun_IdealRange  = 200
export const RailGun_SoundRange  = 400

export const Slug_MaxSpeed    = 5000
export const Slug_Mass        = 0.1
export const Slug_MaxForce    = 10000.0
export const Slug_Scale       = Bot_Scale
export const Slug_Persistance = 0.2
export const Slug_Damage      = 10



export const ShotGun_FiringFreq       = 1
export const ShotGun_DefaultRounds      = 15
export const ShotGun_MaxRoundsCarried = 50
export const ShotGun_NumBallsInShell  = 10
export const ShotGun_Spread           = 0.05
export const ShotGun_IdealRange  = 100
export const ShotGun_SoundRange  = 400

export const Pellet_MaxSpeed    = 5000
export const Pellet_Mass        = 0.1
export const Pellet_MaxForce    = 1000.0
export const Pellet_Scale       = Bot_Scale
export const Pellet_Persistance = 0.1
export const Pellet_Damage      = 1