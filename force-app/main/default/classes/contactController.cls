public with sharing class contactController {
  @AuraEnabled(cacheable=true)
  public static List<Contact> getContactList(){
    List<Contact> conList=[
        SELECT Id, Name, FirstName, LastName, Title, Phone, Email, PhotoUrl
        FROM Contact
        WHERE PhotoUrl !=NULL
        WITH USER_MODE
        LIMIT 10
    ];
    return conList;
  }
  @AuraEnabled ( cacheable=true)
  public static List<Contact> getContactListForDataTable(){
    List<Contact> conList=[
        SELECT Id, Name, Title , Phone, Email, Picture__c, Rank__c, AccountId, Account.Name 
        FROM Contact
        WHERE AccountId!=NULL
        WITH USER_MODE
        LIMIT 10
    ];
    return conList;
  }
}