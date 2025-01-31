Updating in-house system Offer status from ZInventory 

Steps:
1. Create a custom function that will be triggered every time SO status is updated. When all SO related to one Offer (based on ARN) is having the same status it will call webhook url for updating Offer status in the in-house system
    a. The logic is we will just stick to the lowest SO status, therefore the lowest SO status will be the Offer status in the in-house system
        Statuses:
            1. Draft
            2. Confirmed
            3. To be Delivered
            4. Pending Redemption
            5. Fulfilled
        Offer Rewards/SOs
            1. SO1 - Confirmed
            2. SO2 - To be Delivered
            3. SO3 - Pending Redemption
            4. SO4 - Pending Redemption
        
        Logic:
            soStatuses = List();
            for each so in sos {
                if (so.status == Confirmed)
                {
                    lowestSoStatus = Confirmed;
                    break;
                }
                soStatuses.add(so.status);
            }    
            if (soStatuses.contains == "To be Delivered") {
                lowestSoStatus = To be Delivered;
            } else if (soStatuses.contains == "Pending Redemption") {
                lowestSoStatus = Pending Redemption;
            } else if (soStatuses.contains == "Fulfilled") {
                lowestSoStatus = Fulfilled;
            } 
            offerStatus = { "OfferStatus": lowestStatus };
            invokeurl = [
                headers: "Auth......."
                method: PUT
                url: "https://updateOfferStatusWebhookURL.dt"
                parameters: offerStatus
            ]