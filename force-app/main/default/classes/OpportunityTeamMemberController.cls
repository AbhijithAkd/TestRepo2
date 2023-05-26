public class OpportunityTeamMemberController {
    public static void validateTeamMember(List<OpportunityTeamMember> opp){
        Integer count2=0;
        List<Id> oppId=new List<Id>();
        for(OpportunityTeamMember o:opp){
            oppId.add(o.OpportunityId);
            if(o.TeamMemberRole=='Sales Manager'){
                count2=count2+1;
            }
        }
        List<OpportunityTeamMember> exstMember=[Select Id,TeamMemberRole FROM OpportunityTeamMember WHERE OpportunityId IN:oppId AND TeamMemberRole='Sales Manager'];
        Integer count=exstMember.size();
        System.debug('Count'+count);
        for(OpportunityTeamMember o:opp){
            if(o.TeamMemberRole=='Sales Manager'&&count>=1){
                o.TeamMemberRole.addError('Cannot add more Sales Managers');
            }
            else if(count2>1){
                o.TeamMemberRole.addError('Cannot add more Sales Managers');
            }
            else if(count2==0&&count==0){
                o.TeamMemberRole.addError('Add atleast one sales manager');
            }
            else if(count>=1&&count2==0){
                o.TeamMemberRole.addError('Add atleast one sales manager');
            }
            //teamMemberMap.put(o,o.TeamMemberRole);
        }
        
    }
    public static void validateTeamMemberOnDelete(List<OpportunityTeamMember> opp){
        List<Id> oppId=new List<Id>();
        for(OpportunityTeamMember o:opp){
            oppId.add(o.OpportunityId);
        }
        List<OpportunityTeamMember> exstMember=[Select Id,TeamMemberRole FROM OpportunityTeamMember WHERE OpportunityId IN:oppId AND TeamMemberRole='Sales Manager'];
        List<OpportunityTeamMember> totalexstMember=[Select Id,TeamMemberRole FROM OpportunityTeamMember WHERE OpportunityId IN:oppId];
        Integer count=exstMember.size();
        Integer count2=totalexstMember.size();
        for(OpportunityTeamMember o:opp){
            if(o.TeamMemberRole=='Sales Manager'&&count==1&&count2!=1){
                o.addError('Cannot Delete the only Sales Manager');
            }
    }
    }

}