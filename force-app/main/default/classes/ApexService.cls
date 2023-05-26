@RestResource(urlMapping='/PrudentWebService/v1/*')
global without sharing class ApexService {
  @HttpPost
  global static void Model2ApiService() {
    RestRequest request = RestContext.request;
    String targetId = request.params.get('email');
    List<String> targetEmails = new List<String>{};
    targetEmails.add(targetId);
    Messaging.SingleEmailMessage mymail = new Messaging.SingleEmailMessage();
    String[] toaddresses = targetEmails;
    mymail.setToAddresses(toAddresses);
    mymail.setHtmlBody('<p> This email has been sent through Apex</p>');
    mymail.setSenderDisplayName('Prudent Solutions');
    mymail.setSubject('An email from Prudent');
    Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mymail });
    RestResponse response = RestContext.response;
    response.addHeader('Content-Type', 'application/json');
    response.responseBody = Blob.valueOf('{ "PrudentWebService" : "EXECUTED" }');
    response.statusCode = 201;
  }
}