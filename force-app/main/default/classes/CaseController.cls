public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static Account getAccountData(String accountName) {
        return [SELECT Id, Name, Industry, Phone, Website FROM Account WHERE Name = :accountName LIMIT 1];
    }
}
