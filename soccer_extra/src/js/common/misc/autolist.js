class AutoList{
	constructor() {
		this.m_Members = [];
	}
	addMember(member){
		this.m_Members.push(member);
	}
	getAllMembers(){
		return this.m_Members;
	}
}

const autoList = new AutoList();

export {
	autoList as default
};