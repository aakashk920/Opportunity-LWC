import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getOpportunities from '@salesforce/apex/opportunityController.getOpportunities';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { deleteRecord } from 'lightning/uiRecordApi';

export default class opportunityListWithFiltering extends NavigationMixin(LightningElement) {
    showTable = false;
    opportunities;
    searchTerm = '';
    selectedStage = '';
    selectedOpportunityId;
    stageOptions = [
        { label: 'All Stages', value: '' },
        { label: 'Closed Won', value: 'Closed Won' },
        { label: 'Prospecting', value: 'Prospecting' },
        { label: 'Qualification', value: 'Qualification' },
        { label: 'Id. Decision Makers', value: 'Id. Decision Makers' },
        { label: 'Negotiation/Review', value: 'Negotiation/Review' },
        { label: 'Proposal/Price Quote', value: 'Proposal/Price Quote' },
        { label: 'Needs Analysis', value: 'Needs Analysis' },
    ];
    handleView(event) {
        const opportunityId = event.currentTarget.dataset.recordId;
        this.navigateToRecordPage(opportunityId, 'view');
    }
    handleEdit(event) {
        const opportunityId = event.currentTarget.dataset.recordId;
        this.navigateToRecordPage(opportunityId, 'edit');
    }
    navigateToRecordPage(recordId, actionName) {
        if (recordId) {
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: recordId,
                    actionName: actionName
                }
            }).catch(error => {
                console.error('Navigation Error', error);
            })
        }
    }
    handleDelete(event) {
        const recordId = event.currentTarget.dataset.recordId;
        if (recordId) {
            deleteRecord(recordId)
                .then(() => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Opportunity Deleted Successfully',
                            variant: 'success'
                        })
                    );
                })
                .catch(error => {
                    console.error('Error Deleting Record', error);
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error',
                            message: 'An error occcured while deleting this opportunity......',
                            variant: 'error'
                        })
                    );
                });  } 
    }
    examine(event) {
        this.selectedOpportunityId = event.currentTarget.dataset.recordId;
    }
    get selectedOpportunity(){
        return this.opportunities.find(opp=> opp.Id===this.selectedOpportunityId);
    }
    handleLoadAllOpportunities() {
        getOpportunities()
            .then(result => {
                this.opportunities = result;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: "Success",
                        message: 'All opportunities loaded successfully',
                        variant: 'success'
                    })
                );
                this.showTable = true;
            })
            .catch(error => {
                console.error('Error Loading Opportunities', error);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'An error occured while loading opportunieis'
                    })
                );
            });
    }
    @wire(getOpportunities)
    wiredOpportunities({ error, data }) {
        if (data) {
            this.opportunities = data;
        } else if (error) {
            console.error('Error fetching opportunities:', error);
        }
    }
    handleClose() {
        this.showTable = false;
    }
    handlenew() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Opportunity',
                actionName: 'new'
            }
        });
    }
    handleSearch(event) {
        this.searchTerm = event.target.value.toLowerCase();
    }
    handleStageChange(event) {
        this.selectedStage = event.detail.value;
    }
    get filteredOpportunities() {
        if (!this.opportunities) {
            return [];
        }
        return this.opportunities.filter(opportunity => {
            const stageFilter = !this.selectedStage || opportunity.StageName === this.selectedStage;
            const SearchFilter = !this.searchTerm || opportunity.Name.toLowerCase().includes(this.searchTerm);
            return stageFilter && SearchFilter;
        })
    }
    handleExport(){
        const filteredOpportunities=this.filteredOpportunities;
        if(filteredOpportunities && filteredOpportunities.length>0){
            const csvData= this.formatOpportunitiesAsCSV(filteredOpportunities);
            this.downloadCSV(csvData);
        }

    }
    formatOpportunitiesAsCSV(opportunities){
        let csv='Opportunities Name, Stage, Close Date\n';
        opportunities.forEach(opp=>{
            csv+=`${opp.Name},${opp.StageName},${opp.CloseDate}\n`;
        })
       return csv;
    }
    downloadCSV(csvData){
        const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvData}`);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'opportunities.csv');
        document.body.appendChild(link); // Required for Firefox
        link.click();
    }
}