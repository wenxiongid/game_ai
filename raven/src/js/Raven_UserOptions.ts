class Raven_UserOptions {
  m_bShowGraph: boolean
  m_bShowNodeIndices: boolean;
  m_bShowPathOfSelectedBot: boolean;
  m_bShowTargetOfSelectedBot: boolean;
  m_bShowOpponentsSensedBySelectedBot: boolean;
  m_bOnlyShowBotsInTargetsFOV: boolean;
  m_bShowGoalsOfSelectedBot: boolean;
  m_bShowGoalAppraisals: boolean;
  m_bShowWeaponAppraisals: boolean;
  m_bSmoothPathsQuick: boolean;
  m_bSmoothPathsPrecise: boolean;
  m_bShowBotIDs: boolean;
  m_bShowBotHealth: boolean;
  m_bShowScore: boolean;
  constructor() {
    this.m_bShowGraph = false
    this.m_bShowNodeIndices = false
    this.m_bShowPathOfSelectedBot = false
    this.m_bShowTargetOfSelectedBot = false
    this.m_bShowOpponentsSensedBySelectedBot = false
    this.m_bOnlyShowBotsInTargetsFOV = false
    this.m_bShowGoalsOfSelectedBot = false
    this.m_bShowGoalAppraisals = false
    this.m_bShowWeaponAppraisals = false
    this.m_bSmoothPathsQuick = false
    this.m_bSmoothPathsPrecise = false
    this.m_bShowBotIDs = false
    this.m_bShowBotHealth = false
    this.m_bShowScore = false
  }
}

export default new Raven_UserOptions