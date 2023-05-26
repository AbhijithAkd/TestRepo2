public with sharing class EmailClass {

    @AuraEnabled
    public static List<SObject> search(String searchString) {
        List<SObject> searchList = new List<SObject>();
        try {
            String searchStr = '*' + searchString + '*';
            String searchquery =
                'FIND\'' +
                searchStr +
                '\'IN ALL FIELDS RETURNING Contact(id, name, email where email != null), User(id, name, email where email != null AND isActive = true) LIMIT 10';
            List<List<SObject>> searchResult = search.query(searchquery);
            system.debug('searchResult:::' + searchResult.size());
            for (List<SObject> curList : searchResult) {
                searchList.addAll(curList);
            }
            system.debug('searchList:::' + searchList.size());
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return searchList;
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> listEmailController(List<String> abc) {
        System.debug('This ID\'s passed are'+abc);
        return [SELECT Id,Email FROM Contact WHERE Id =:abc AND Email!=null];
    }


    @AuraEnabled
    public static void sendEmailController(String emailDetailStr) {
        System.debug(emailDetailStr);
        emailDetailStr.replace('[null]','');
        EmailWrapper emailDetails = (EmailWrapper) JSON.deserialize(emailDetailStr, EmailWrapper.class);
        List<ID> myList = new List<ID>();
        System.debug(emailDetails);
        for(EmailWrapper.Files f:emailDetails.files){
            myList.add(f.contentVersionId);
        }
        System.debug(emailDetails.toAddress);
        Messaging.reserveSingleEmailCapacity(1);
        try {
            messaging.SingleEmailMessage mail = new messaging.SingleEmailMessage();
            set<string> ccStringSet = new set<string>(emailDetails.ccAddress);
            ccStringSet.remove(null);
            set<string> toStringSet = new set<string>(emailDetails.toAddress);
            toStringSet.remove(null);
            List<String> cc=new List<String>();
            cc.addAll(ccStringSet);
            List<String> to=new List<String>();
            to.addAll(toStringSet);
            mail.setToAddresses(to);
            mail.setCcAddresses(cc);
            mail.setReplyTo('abhijith.k@prudenttechnologies.com');
            mail.setSenderDisplayName('Prudent Technologies');
            mail.setSubject(emailDetails.subject);
            mail.setHtmlBody(emailDetails.body);
            mail.setEntityAttachments(myList);
            Messaging.sendEmail(new List<messaging.SingleEmailMessage>{ mail });
        } catch (exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    
}