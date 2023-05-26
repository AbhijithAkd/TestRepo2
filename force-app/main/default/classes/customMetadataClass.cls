public with sharing class customMetadataClass {
    public static void fetchAllData(){
        Map<String,Country__mdt> allCountries=Country__mdt.getAll();
        System.debug('The size of all countries =' + allCountries.size());
        for(String Name : allCountries.keySet()){
            System.debug('Country Nmae:' + Name + 'Capital : ' + allCountries.get(Name).Capital__c);
        }
    }
    public static void fetchCapital(String cn){
        Country__mdt sc=Country__mdt.getinstance(cn);
        System.debug('Country Name '+ cn + ' Capital :' + sc?.Capital__c);
    }

}