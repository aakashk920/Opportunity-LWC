public with sharing class opportunityController {
    @AuraEnabled (cacheable=true)

    public static List<Opportunity> getOpportunities (){
        return [SELECT Id, Name, StageName, CloseDate, Type, OwnerId, OrderNumber__c FROM Opportunity];
    }
}