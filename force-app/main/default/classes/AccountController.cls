public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static AccountWithContacts getAccountData(String accountName) {
        AccountWithContacts result=new AccountWithContacts();
        List<Account> accounts = [SELECT Id, Name, Industry, Phone, Website, 
        (SELECT Id, Name, Email, Phone FROM Contacts) 
      FROM Account WHERE Name = :accountName LIMIT 1];
      if (!accounts.isEmpty()){
        result.account=accounts[0];
      }
        return result;
    }

    @AuraEnabled 
    public static Account createNewAccount(String accountName, String industry, String phone, String website){
      Account newAccount= new Account(Name=accountName, Industry=industry, Phone=phone, Website=website);
      insert newAccount;
      return newAccount;
      
    }

    public class AccountWithContacts{
        @AuraEnabled public Account account;
    }
}
