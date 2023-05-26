public class FormController {
    @AuraEnabled
    public static void formMethod(String str){
        System.debug('Str'+str);
    }

}