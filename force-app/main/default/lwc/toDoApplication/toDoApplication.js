import { LightningElement } from 'lwc';

export default class ToDoApplication extends LightningElement {
    taskname = "";
    taskdate = null;
    incompletetask = [];
    completetask = [];

    changeHandler(event) {
        let { name, value } = event.target;
        if (name === "taskname") {
            this.taskname = value;
        }
        else if (name === "taskdate") {
            this.taskdate = value;
        }
    }

    resetHandler() {
        this.taskname = "";
        this.taskdate = null;

    }
    addTaskHandler() {

        // if end date is missing then populate todays date as the end date
        if (!this.taskdate) {
            this.taskdate = new Date().toISOString().slice(0, 10);
        }

        if (this.validateTask()) {

            this.incompletetask = [
                ...this.incompletetask, {
                    taskname: this.taskname,
                    taskdate: this.taskdate
                }
            ];
            this.resetHandler();

            let sortedArray = this.sortTask(this.incompletetask);
            this.incompletetask = [...sortedArray];


            let updatedIncompletetask = this.incompletetask.map(item => JSON.parse(JSON.stringify(item)));
            console.log("Updated Incomplete Tasks:", updatedIncompletetask);
        }
    }
    validateTask() {

        let isValid = true;
        let element = this.template.querySelector(".taskname");
        //condtion 1- check if the task is empty
        //condtion 2- if task name is not empty then check for the duplicate
        if (!this.taskname) {
            isValid = false;
        }
        else {
            let taskItem = this.incompletetask.find((currItem) =>
                currItem.taskname === this.taskname &&
                currItem.taskdate === this.taskdate
            );
            if (taskItem) {
                isValid = false;
                element.setCustomValidity("Task Is already Exist");
            }
        }
        if (isValid) {
            element.setCustomValidity("");
        }
        element.reportValidity();
        return isValid;
    }


    sortTask(inputArr) {
        let sortedArray = inputArr.sort((a, b) => {
            const dateA = new Date(a.taskdate);
            const dateB = new Date(b.taskdate);
            return dateA - dateB;
        });
        return sortedArray;
    }

}