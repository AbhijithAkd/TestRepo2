trigger AccTrigger on Account (after insert) {
    List<Account> accListUpdate = new List<Account>();
    //Contacts to insert which has same name as Account Name
    List<Contact> conList = new List<Contact>();
    //Account Id list to update later after changes are done
    Set<Id> accId = new Set<Id>();
    //Map of Account Id and the Axxount record
    Map<Id,Account> mapVariable = new Map<Id,Account>();
    Map<Id,Account> accMap=new Map<Id,Account>();
    for(Account accObj : Trigger.new){
        //Contact which has to be inserted with same name as Account and putting that Contact as related Contact
        Contact conObj =new Contact();
        conObj.LastName = accObj.Name;
        conObj.AccountId = accObj.Id;
        conList.add(conObj);
        accId.add(conObj.AccountId);
        accMap.put(accObj.Id,accObj);
    }
    if(conList.size()>0){
        insert conList;
    }
    //Getting list of Accounts to put into Map
    List<Account> accList =[Select Id,Contact__C from Account where Id=:accId];
    if(accList.size()>0){
        for(Account acc:accList){
            mapVariable.put(acc.Id,acc);
        }
    }
    if(conList.size()>0){
 /* Looping inserted Contact and Check whether the Account Id is related and get its Account
record from map and change the value of the Client Contact with the current looping Contact  */
        for(Contact cObj:conList){
            if(mapVariable.containsKey(cObj.AccountId)){
                Account aObj=mapVariable.get(cObj.AccountId);
                aObj.Contact__C=cObj.Id;
                accListUpdate.add(aObj);
            }
        }
    }
    //Update the Account in which chnages has been done
    if(accListUpdate.size()>0){
        update accListUpdate;
    }
}

    /*
 for(Contact con : conList){
     if(accMap.containsKey(con.AccountId)){
         Account obj=accMap.get(con.AccountId);
         obj.Contact__c=con.Id;
         accListUpdate.add(obj);
     }
 }
    if(accListUpdate.size()>0){
        update accListUpdate;
    }
}*/