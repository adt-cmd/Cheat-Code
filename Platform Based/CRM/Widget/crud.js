
let entityId;
ZOHO.embeddedApp.on("PageLoad", function(data) {
    const entity = data.Entity;
    entityId = data.EntityId
    ZOHO.CRM.UI.Resize({height:"500",width:"5000"});
    ZOHO.CRM.API.getRelatedRecords({
        Entity: entity,
        RecordID: entityId,
        RelatedList:"Tasks",
        page:1,
        per_page:200
    })
    .then(function(data){
        tasks = data.data
        if (tasks) {
            tasks.forEach(task => {
                taskData = {
                    Id: task.id,
                    Subject: task.Subject,
                    Priority: task.Priority,
                    Status: task.Status
                };
                appendTaskRow(taskData);
            });
        }
        
        
    })
});

ZOHO.embeddedApp.init()

// Fetching
function appendTaskRow(taskData) {
    const table = document.getElementById("task-table");
    let taskRow = document.createElement('tr'),
        cellData = [
            { element: 'input', type: 'text', value: taskData.Subject, name: 'subject' },
            { element: 'select', options: ['High', 'Highest', 'Low', 'Lowest', 'Normal'], selected: taskData.Priority, name: 'priority' },
            { element: 'select', options: ['Not Started', 'Deffered', 'In Progress', 'Completed', 'Waiting for input'], selected: taskData.Status, name: 'status' }
        ];

    taskRow.setAttribute("task-id", taskData.Id);
    cellData.forEach(data => {
        let taskData = document.createElement('td'),
            innerElement = document.createElement(data.element);

        innerElement.name = data.name;

        if (data.element == "input") {
            innerElement.type = data.type;
            innerElement.value = data.value;
        } else if (data.element == "select") {
            data.options.forEach(option => {
                let optionEl = document.createElement('option');
                optionEl.textContent = option;
                if (data.selected == option) optionEl.setAttribute('selected', true);
                innerElement.appendChild(optionEl);
            });
        }

        taskData.appendChild(innerElement);
        taskRow.appendChild(taskData);
    });

    let actionCell = document.createElement('td'),
        actionBtns = [
            { content: 'Update', attributes: [['onclick', 'updateTask(event.target)' ]] },
            { content: 'Delete', attributes: [[ 'onclick', 'deleteTask(event.target)' ]] }
        ];

    actionBtns.forEach(actionBtn => {
        let btn = document.createElement("button");
        btn.textContent = actionBtn.content;
        actionBtn.attributes.forEach(attribute => {
            btn.setAttribute(attribute[0], attribute[1]);
        })
        actionCell.appendChild(btn);
    });

    taskRow.appendChild(actionCell);
    table.appendChild(taskRow);
}

// Create
function createTask(target) {
    let creationContainer = target.parentElement,
        subject = creationContainer.querySelector('[name="subject"]').value,
        priority = creationContainer.querySelector('[name="priority"]').value,
        status = creationContainer.querySelector('[name="status"]').value,
        recordData = {
        "$se_module": "Deals",
        "What_Id": entityId[0],
        "Subject": subject,
        "Priority": priority,
        "Status": status
    }
    ZOHO.CRM.API.insertRecord({
        Entity:"Tasks",
        APIData:recordData,
        Trigger:["workflow"]
    }).then(function(){
        location.reload();
    });
}

// Update
function updateTask(target) {
    let taskRow = target.parentElement.parentElement,
        taskId = taskRow.getAttribute('task-id'),
        subject = taskRow.querySelector('[name="subject"]').value,
        priority = taskRow.querySelector('[name="priority"]').value,
        status = taskRow.querySelector('[name="status"]').value
        config = {
            Entity:"Tasks",
            APIData:{
                "id": taskId,
                "Subject": subject,
                "Priority": priority,
                "Status": status
            },
            Trigger:["workflow"]
        };

    ZOHO.CRM.API.updateRecord(config)
    .then(function() {
        location.reload();
    })
}

// Delete
function deleteTask(target) {
    let taskId = target.parentElement.parentElement.getAttribute('task-id');

    ZOHO.CRM.API.deleteRecord({
        Entity:"Tasks", 
        RecordID: taskId
    })
    .then(function(){
        location.reload();
    })
}
