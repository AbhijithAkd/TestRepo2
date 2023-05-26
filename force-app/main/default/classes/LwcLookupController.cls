public class LwcLookupController {  
    @AuraEnabled(cacheable=true)  
    public static List<sobject> findRecords(String searchKey, String objectName) {  
      string searchText = '\'' + String.escapeSingleQuotes(searchKey) + '%\'';  
      string query = 'SELECT Id,Name, Email FROM ' +objectName+ ' WHERE Name LIKE '+searchText+' LIMIT 6';  
      return Database.query('SELECT Id,Name FROM ' +objectName+ ' WHERE Name LIKE '+searchText+' LIMIT 6');  
    }
    @AuraEnabled
    public static void sendUserEmail(String toEmail, String Content,String subject) {
      Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
      string[] to = new string[] {toEmail};
      email.setToAddresses(to);
      email.setSubject(subject);
      email.setPlainTextBody(Content);
      try{
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { email });
    }catch(exception e){
        System.debug(e.getMessage());
    }
    }
  }