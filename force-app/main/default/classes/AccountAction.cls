public class AccountAction {
    @InvocableMethod
    public static void updateAccount(){
        List<Account> acc=[SELECT Name FROM Account WHERE Name='Prudent'];
        List<Account> updatedacc=new List<Account>();
        for (Account a:acc){
            a.Name='Prudent Consulting';
            updatedacc.add(a);
        }
        update updatedacc;
    }

}