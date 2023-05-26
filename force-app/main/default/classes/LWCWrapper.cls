public inherited sharing class LWCWrapper {

    @AuraEnabled(Cacheable = true)
    public static List<WrapperDemo> fetchAccAndCons(String abcd) {
        List<WrapperDemo> lstWrapper = new List<WrapperDemo>();

        for(Account acIterator : [ SELECT Id, Name, (Select Id, Name From Contacts) FROM Account WHERE Id =:abcd] ) {
            lstWrapper.add(new WrapperDemo(acIterator, acIterator.Contacts));
        }

        return lstWrapper;
        
    }
 
 // Wrapper Class
 public class WrapperDemo {
        @AuraEnabled public Account objAcc;
        @AuraEnabled public list<Contact> lstCons;

        public WrapperDemo(Account acc, list<Contact> lstCons) {
            this.objAcc = acc;
            this.lstCons = lstCons;
        }
    }
}