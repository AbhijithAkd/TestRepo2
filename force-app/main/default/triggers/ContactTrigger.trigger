trigger ContactTrigger on Contact (before insert) {
    Set<Id> accId = new Set<Id>();
    for(Contact c : Trigger.new){
          accId.add(c.AccountId); 
    }
    Map<Id,Account> accMap = new Map<Id,Account>();
    for(Account acc : [Select Id, Name, (Select Id,Name from Contacts) from Account where Id in :accId]){
        accMap.put(acc.Id,acc);
    }
    for(Contact con : Trigger.new){
        if(accMap.containsKey(con.AccountId)){
            if(accMap.get(con.AccountId).Contacts != null && accMap.get(con.AccountId).Contacts.size()>0){// If greater than 0, throw error
                con.addError('A Contact already present');
            }
        }
    }
    
    
}