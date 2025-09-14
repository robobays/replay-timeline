
const UpgradeType = {

  // Protoss upgrades
  AnionPulseCrystals: { value: 300 },
  Blink: { value: 300 },
  Charge: { value: 200 },
  ExtendedThermalLance: { value: 300 },
  FluxVanes: { value: 200 },
  GraviticBoosters: { value: 200 },
  GraviticDrive: { value: 200 },
  Hallucination: { value: 200 },
  ProtossAirArmorsLevel1: { value: 200 },
  ProtossAirArmorsLevel2: { value: 350 },
  ProtossAirArmorsLevel3: { value: 500 },
  ProtossAirWeaponsLevel1: { value: 200 },
  ProtossAirWeaponsLevel2: { value: 350 },
  ProtossAirWeaponsLevel3: { value: 500 },
  ProtossGroundArmorsLevel1: { value: 200 },
  ProtossGroundArmorsLevel2: { value: 300 },
  ProtossGroundArmorsLevel3: { value: 400 },
  ProtossGroundWeaponsLevel1: { value: 200 },
  ProtossGroundWeaponsLevel2: { value: 300 },
  ProtossGroundWeaponsLevel3: { value: 400 },
  ProtossShieldsLevel1: { value: 300 },
  ProtossShieldsLevel2: { value: 400 },
  ProtossShieldsLevel3: { value: 500 },
  PsionicStorm: { value: 400 },
  ResonatingGlaives: { value: 200 },
  ShadowStride: { value: 200 },
  TectonicDestabilizers: { value: 300 },
  WarpGate: { value: 100 },

  // Terran upgrades
  AdvancedBallistics: { value: 300 },
  CaduceusReactor: { value: 200 },
  CloakingField: { value: 200 },
  CombatShield: { value: 200 },
  ConcussiveShells: { value: 100 },
  DrillingClaws: { value: 150 },
  HiSecAutoTracking: { value: 200 },
  HurricaneEngines: { value: 200 },
  HyperflightRotors: { value: 250 },
  InfernalPreIgniter: { value: 200 },
  InterferenceMatrix: { value: 100 },
  NeosteelArmor: { value: 300 },
  PersonalCloaking: { value: 300 },
  SmartServos: { value: 200 },
  Stimpack: { value: 200 },
  TerranInfantryArmorsLevel1: { value: 200 },
  TerranInfantryArmorsLevel2: { value: 300 },
  TerranInfantryArmorsLevel3: { value: 400 },
  TerranInfantryWeaponsLevel1: { value: 200 },
  TerranInfantryWeaponsLevel2: { value: 300 },
  TerranInfantryWeaponsLevel3: { value: 400 },
  TerranShipArmorsLevel1: { value: 200 },
  TerranShipArmorsLevel2: { value: 350 },
  TerranShipArmorsLevel3: { value: 500 },
  TerranShipWeaponsLevel1: { value: 200 },
  TerranShipWeaponsLevel2: { value: 350 },
  TerranShipWeaponsLevel3: { value: 500 },
  TerranVehicleArmorsLevel1: { value: 200 },
  TerranVehicleArmorsLevel2: { value: 350 },
  TerranVehicleArmorsLevel3: { value: 500 },
  TerranVehicleWeaponsLevel1: { value: 200 },
  TerranVehicleWeaponsLevel2: { value: 350 },
  TerranVehicleWeaponsLevel3: { value: 500 },
  WeaponRefit: { value: 300 },

  // Zerg upgrades
  AdaptiveTalons: { value: 200 },
  AdrenalGlands: { value: 400 },
  AnabolicSynthesis: { value: 300 },
  Burrow: { value: 200 },
  CentrifugalHooks: { value: 200 },
  ChitinousPlating: { value: 300 },
  GlialReconstitution: { value: 200 },
  GroovedSpines: { value: 150 },
  MetabolicBoost: { value: 200 },
  MuscularAugments: { value: 200 },
  NeuralParasite: { value: 300 },
  PneumatizedCarapace: { value: 200 },
  SeismicSpines: { value: 300 },
  TunnelingClaws: { value: 200 },
  ZergGroundArmorsLevel1: { value: 300 },
  ZergGroundArmorsLevel2: { value: 400 },
  ZergGroundArmorsLevel3: { value: 500 },
  ZergMeleeWeaponsLevel1: { value: 200 },
  ZergMeleeWeaponsLevel2: { value: 300 },
  ZergMeleeWeaponsLevel3: { value: 400 },
  ZergMissileWeaponsLevel1: { value: 200 },
  ZergMissileWeaponsLevel2: { value: 300 },
  ZergMissileWeaponsLevel3: { value: 400 },
  ZergFlyerArmorsLevel1: { value: 200 },
  ZergFlyerArmorsLevel2: { value: 350 },
  ZergFlyerArmorsLevel3: { value: 500 },
  ZergFlyerWeaponsLevel1: { value: 200 },
  ZergFlyerWeaponsLevel2: { value: 350 },
  ZergFlyerWeaponsLevel3: { value: 500 },

};

for (const name of Object.keys(UpgradeType)) UpgradeType[name].name = name;
for (const name of Object.keys(UpgradeType)) UpgradeType[name].type = "upgrade";

// Add lowercase aliases.
for (const name of Object.keys(UpgradeType)) UpgradeType[name.toLowerCase()] = UpgradeType[name];

UpgradeType.AdeptPiercingAttack = UpgradeType.ResonatingGlaives;
UpgradeType.BansheeCloak = UpgradeType.CloakingField;
UpgradeType.BansheeSpeed = UpgradeType.HyperflightRotors;
UpgradeType.BlinkTech = UpgradeType.Blink;
UpgradeType.CentrificalHooks = UpgradeType.CentrifugalHooks;
UpgradeType.DarkTemplarBlinkUpgrade = UpgradeType.ShadowStride;
UpgradeType.DiggingClaws = UpgradeType.AdaptiveTalons;
UpgradeType.DrillClaws = UpgradeType.DrillingClaws;
UpgradeType.EvolveGroovedSpines = UpgradeType.GroovedSpines;
UpgradeType.EvolveMuscularAugments = UpgradeType.MuscularAugments;
UpgradeType.Frenzy = UpgradeType.MuscularAugments;
UpgradeType.HurricaneThrusters = UpgradeType.HurricaneEngines;
UpgradeType.LiberatorAGRangeUpgrade = UpgradeType.AdvancedBallistics;
UpgradeType.MedivacCaduceusReactor = UpgradeType.CaduceusReactor;
UpgradeType.ObserverGraviticBooster = UpgradeType.GraviticBoosters;
UpgradeType.overlordspeed = UpgradeType.PneumatizedCarapace;
UpgradeType.PhoenixRangeUpgrade = UpgradeType.AnionPulseCrystals;
UpgradeType.PsiStormTech = UpgradeType.PsionicStorm;
UpgradeType.PunisherGrenades = UpgradeType.ConcussiveShells;
UpgradeType.LurkerRange = UpgradeType.SeismicSpines;
UpgradeType.TempestGroundAttackUpgrade = UpgradeType.TectonicDestabilizers;
UpgradeType.VoidRaySpeedUpgrade = UpgradeType.FluxVanes;
UpgradeType.WarpGateResearch = UpgradeType.WarpGate;
UpgradeType.zerglingattackspeed = UpgradeType.AdrenalGlands;
UpgradeType.zerglingmovementspeed = UpgradeType.MetabolicBoost;

export default UpgradeType;
