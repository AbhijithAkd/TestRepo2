public with sharing class FileUploadController {
    @AuraEnabled(cacheable=true)
    Public static String getcontentversion(String myId){
        ContentVersion a=[SELECT Id FROM ContentVersion WHERE ContentDocumentId = :myId AND IsLatest = true];
        return a.Id;
}
}