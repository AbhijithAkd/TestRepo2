trigger TeamMemberTrigger on OpportunityTeamMember (before insert,before update,before delete) {
    if(trigger.isInsert||trigger.isUpdate){
	OpportunityTeamMemberController.validateTeamMember(trigger.new);
    }
    if(trigger.isDelete){
        OpportunityTeamMemberController.validateTeamMemberOnDelete(trigger.old);
    }
}