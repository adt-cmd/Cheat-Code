Syncing of Customer/Contact from MH in-house system to ZInventory. MH in-house system will be the source of truth for the Customer/Contact records

Steps:
1. Create a custom webhook in ZFlow that will create/update a customer in ZInventory based on the provided email address in payload
    a. If existing then it will just update 
    b. If not then it will create
2. Provide the webhook URL to the MH team for them to use them in their in-house system. The webhook must be triggered whenever a customer is created/updated in their end
