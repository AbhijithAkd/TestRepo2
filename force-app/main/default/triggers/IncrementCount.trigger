trigger IncrementCount on Account (before update) {
    for(Account a:trigger.new){
        if(a.Name=='AKD')
        {
            a.Count__c=a.Count__c+1;
        }
    }
        
    
     
    
    

}