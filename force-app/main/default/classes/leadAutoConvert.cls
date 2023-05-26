public class leadAutoConvert {
    @InvocableMethod
    public static void LeadAssign(List<ID> LeadIds)
    {
        LeadStatus CLeadStatus=[SELECT Id,MasterLabel FROM LeadStatus WHERE IsConverted=true Limit 1];
        List<Database.LeadConvert> MassLeadConvert=new List<Database.LeadConvert>();
        for(id currentLead:LeadIds){
            Database.LeadConvert leadConvert=new Database.LeadConvert();
            leadConvert.setLeadId(currentLead);
            leadConvert.setConvertedStatus(CLeadStatus.MasterLabel);
            leadConvert.setDoNotCreateOpportunity(True);
            MassLeadConvert.add(leadConvert);
        }
        If(!MassLeadConvert.isEmpty()){
            List<Database.LeadConvertResult> lcr=Database.convertLead(MassLeadConvert);
        }
        
        
    }

}