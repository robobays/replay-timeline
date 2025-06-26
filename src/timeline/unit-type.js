
// Types are: base, worker, economy, defense, offense.
const UnitType = {

  // Protoss units
  Adept: { type: "offense", value: 125 },
  Archon: { type: "offense", value: 450 },
  Carrier: { type: "offense", value: 600 },
  Colossus: { type: "offense", value: 500 },
  DarkTemplar: { type: "offense", value: 250 },
  Disruptor: { type: "offense", value: 300 },
  HighTemplar: { type: "offense", value: 200 },
  Immortal: { type: "offense", value: 375 },
  Mothership: { type: "offense", value: 600 },
  Observer: { type: "offense", value: 100 },
  Oracle: { type: "offense", value: 300 },
  Phoenix: { type: "offense", value: 250 },
  Probe: { type: "worker", value: 50 },
  Sentry: { type: "offense", value: 150 },
  Stalker: { type: "offense", value: 175 },
  Tempest: { type: "offense", value: 425 },
  VoidRay: { type: "offense", value: 400 },
  WarpPrism: { type: "offense", value: 250 },
  Zealot: { type: "offense", value: 100 },

  // Protoss buildings
  Assimilator: { type: "economy", value: 75 },
  CyberneticsCore: { type: "economy", value: 150 },
  DarkShrine: { type: "economy", value: 300 },
  FleetBeacon: { type: "economy", value: 500 },
  Forge: { type: "economy", value: 150 },
  Gateway: { type: "economy", value: 150 },
  Nexus: { type: "base", value: 400 },
  PhotonCannon: { type: "defense", value: 150 },
  Pylon: { type: "economy", value: 100 },
  RoboticsBay: { type: "economy", value: 300 },
  RoboticsFacility: { type: "economy", value: 250 },
  ShieldBattery: { type: "defense", value: 100 },
  Stargate: { type: "economy", value: 300 },
  TemplarArchives: { type: "economy", value: 350 },
  TwilightCouncil: { type: "economy", value: 250 },
  WarpGate: { type: "economy", value: 150 },

  // Terran units
  Banshee: { type: "offense", value: 250 },
  Battlecruiser: { type: "offense", value: 700 },
  Cyclone: { type: "offense", value: 175 },
  Ghost: { type: "offense", value: 275 },
  Hellbat: { type: "offense", value: 100 },
  Hellion: { type: "offense", value: 100 },
  Liberator: { type: "offense", value: 275 },
  Marine: { type: "offense", value: 50 },
  Marauder: { type: "offense", value: 125 },
  Medivac: { type: "offense", value: 200 },
  Raven: { type: "offense", value: 250 },
  Reaper: { type: "offense", value: 100 },
  SCV: { type: "worker", value: 50 },
  SiegeTank: { type: "offense", value: 275 },
  Thor: { type: "offense", value: 500 },
  Viking: { type: "offense", value: 225 },
  WidowMine: { type: "offense", value: 100 },

  // Terran buildings
  Armory: { type: "economy", value: 200 },
  Barracks: { type: "economy", value: 150 },
  Bunker: { type: "defense", value: 100 },
  CommandCenter: { type: "base", value: 400 },
  EngineeringBay: { type: "economy", value: 125 },
  Factory: { type: "economy", value: 250 },
  FusionCore: { type: "economy", value: 300 },
  GhostAcademy: { type: "economy", value: 200 },
  MissileTurret: { type: "defense", value: 100 },
  OrbitalCommand: { type: "base", value: 550 },
  PlanetaryFortress: { type: "base", value: 700 },
  Reactor: { type: "economy", value: 100 },
  Refinery: { type: "economy", value: 75 },
  SensorTower: { type: "defense", value: 225 },
  Starport: { type: "economy", value: 250 },
  SupplyDepot: { type: "economy", value: 100 },
  TechLab: { type: "economy", value: 75 },

  // Zerg units
  Baneling: { type: "offense", value: 75 },
  BroodLord: { type: "offense", value: 550 },
  Corruptor: { type: "offense", value: 250 },
  Drone: { type: "worker", value: 50 },
  Hydralisk: { type: "offense", value: 150 },
  Infestor: { type: "offense", value: 250 },
  Lurker: { type: "offense", value: 300 },
  Mutalisk: { type: "offense", value: 200 },
  NydusWorm: { type: "offense", value: 150 },
  Overlord: { type: "economy", value: 100 },
  Overseer: { type: "offense", value: 200 },
  Queen: { type: "defense", value: 150 },
  Ravager: { type: "offense", value: 200 },
  Roach: { type: "offense", value: 100 },
  SporeCrawler: { type: "defense", value: 50 + 75 },
  SpineCrawler: { type: "defense", value: 50 + 100 },
  SwarmHost: { type: "offense", value: 175 },
  Ultralisk: { type: "offense", value: 475 },
  Viper: { type: "offense", value: 300 },
  Zergling: { type: "offense", value: 25 },

  // Zerg buildings
  BanelingNest: { type: "economy", value: 50 + 150 },
  Hatchery: { type: "base", value: 50 + 275 },
  HydraliskDen: { type: "economy", value: 50 + 200 },
  EvolutionChamber: { type: "economy", value: 50 + 75 },
  Extractor: { type: "economy", value: 50 + 25 },
  GreaterSpire: { type: "economy", value: 50 + 400 + 250 },
  Hive: { type: "base", value: 50 + 275 + 250 + 350 },
  InfestationPit: { type: "economy", value: 50 + 200 },
  Lair: { type: "base", value: 50 + 275 + 250 },
  LurkerDen: { type: "economy", value: 50 + 250 },
  NydusNetwork: { type: "economy", value: 50 + 300 },
  NydusWorm: { type: "economy", value: 150 },
  RoachWarren: { type: "economy", value: 50 + 150 },
  SpawningPool: { type: "economy", value: 50 + 200 },
  Spire: { type: "economy", value: 50 + 400 },
  UltraliskCavern: { type: "economy", value: 50 + 350 },
};

for (const name of Object.keys(UnitType)) UnitType[name].name = name;

UnitType.AssimilatorRich = UnitType.Assimilator;
UnitType.BanelingBurrowed = UnitType.Baneling;
UnitType.BarracksFlying = UnitType.Barracks;
UnitType.BarracksReactor = UnitType.Reactor;
UnitType.BarracksTechLab = UnitType.TechLab;
UnitType.CommandCenterFlying = UnitType.CommandCenter;
UnitType.DroneBurrowed = UnitType.Drone;
UnitType.ExtractorRich = UnitType.Extractor;
UnitType.FactoryFlying = UnitType.Factory;
UnitType.FactoryReactor = UnitType.Reactor;
UnitType.FactoryTechLab = UnitType.TechLab;
UnitType.GhostAlternate = UnitType.Ghost;
UnitType.GhostNova = UnitType.Ghost;
UnitType.HellionTank = UnitType.Hellbat;
UnitType.HydraliskBurrowed = UnitType.Hydralisk;
UnitType.InfestorBurrowed = UnitType.Infestor;
UnitType.LiberatorAG = UnitType.Liberator;
UnitType.LurkerDenMP = UnitType.LurkerDen;
UnitType.LurkerMP = UnitType.Lurker;
UnitType.LurkerMPBurrowed = UnitType.Lurker;
UnitType.NydusCanal = UnitType.NydusWorm;
UnitType.OrbitalCommandFlying = UnitType.OrbitalCommand;
UnitType.OverlordTransport = UnitType.Overlord;
UnitType.QueenBurrowed = UnitType.Queen;
UnitType.QueenMP = UnitType.Queen;
UnitType.ObserverSiegeMode = UnitType.Observer;
UnitType.OverseerSiegeMode = UnitType.Overseer;
UnitType.PylonOvercharged = UnitType.Pylon;
UnitType.RavagerBurrowed = UnitType.Ravager;
UnitType.RefineryRich = UnitType.Refinery;
UnitType.RenegadeMissileTurret = UnitType.MissileTurret;
UnitType.RoachBurrowed = UnitType.Roach;
UnitType.SiegeTankSieged = UnitType.SiegeTank;
UnitType.SpineCrawlerUprooted = UnitType.SpineCrawler;
UnitType.SporeCrawlerUprooted = UnitType.SporeCrawler;
UnitType.StarportFlying = UnitType.Starport;
UnitType.StarportReactor = UnitType.Reactor;
UnitType.StarportTechLab = UnitType.TechLab;
UnitType.SupplyDepotLowered = UnitType.SupplyDepot;
UnitType.SwarmHostBurrowedMP = UnitType.SwarmHost;
UnitType.SwarmHostMP = UnitType.SwarmHost;
UnitType.TemplarArchive = UnitType.TemplarArchives;
UnitType.ThorAP = UnitType.Thor;
UnitType.UltraliskBurrowed = UnitType.Ultralisk;
UnitType.VikingAssault = UnitType.Viking;
UnitType.VikingFighter = UnitType.Viking;
UnitType.ZerglingBurrowed = UnitType.Zergling;

export default UnitType;
