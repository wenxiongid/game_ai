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
    this.m_bShowGraph = true
    this.m_bShowNodeIndices = true
    this.m_bShowPathOfSelectedBot = true
    this.m_bShowTargetOfSelectedBot = true
    this.m_bShowOpponentsSensedBySelectedBot = true
    this.m_bOnlyShowBotsInTargetsFOV = false
    this.m_bShowGoalsOfSelectedBot = true
    this.m_bShowGoalAppraisals = true
    this.m_bShowWeaponAppraisals = true
    this.m_bSmoothPathsQuick = false
    this.m_bSmoothPathsPrecise = false
    this.m_bShowBotIDs = false
    this.m_bShowBotHealth = false
    this.m_bShowScore = false
  }
}

export default new Raven_UserOptions