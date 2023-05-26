public without sharing class emailSendController {
    @AuraEnabled(cacheable=true)
    public static List<String> getResults(List<String> idlist){
        List<String> emailList=new List<String>();
        List<User> us=[Select Id,Email From User Where Id =:idlist];
        for(User u:us){
            emailList.add(u.Email);
        }
        return emailList;
    }
    @AuraEnabled(cacheable=true)
    public static List<EmailTemplate> f_Get_Templates(){
        try {
            List<sObject> l_Types = new List<sObject>();
             
            l_Types = [Select id, EmailTemplate.Name from EmailTemplate Where EmailTemplate.FolderId='00D2w000008ol7uEAA']; // Can include multiple fields, 
            // You can also use any standard or custom object
            // You can get values from custom setting also.
             
            return l_Types;
        } catch (Exception e) {
            System.debug('Exception: '+e.getMessage());
            return null;
        }
    }
     @AuraEnabled
    public static void sendUserEmail(List<String> toEmail, String template,Id recId) {
      Messaging.MassEmailMessage email = new Messaging.MassEmailMessage();
      //string[] to = new string[] {toEmail};
      //email.setToAddresses(to);
      List<Id> recordIds=new List<Id>();
      recordIds.add(recId);
      email.setTargetObjectIds(recordIds);
      email.setTemplateId(template);
      try{
        Messaging.sendEmail(new Messaging.MassEmailMessage[] { email });
    }catch(exception e){
        System.debug(e.getMessage());
    }
    }
}