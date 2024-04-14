public with sharing class accountHelper {
@AuraEnabled(cacheable=true)
public static List<Account> getAccountData(string inputIndustry){
    return [
        SELECT id, Name, Industry, Rating
        FROM Account 
        Where Industry=:inputIndustry
        WITH USER_MODE
    ];
}
@AuraEnabled(cacheable=true)
public static List<Account> getParentAccounts(){
    return [ select Id, Name, Industry from Account 
    where AnnualRevenue !=null WITH USER_MODE];

}
}