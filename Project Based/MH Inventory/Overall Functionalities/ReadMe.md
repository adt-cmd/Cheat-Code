Item Syncing
    ZInventory is the source of truth
    Reference: ZInventory ID
    1. Info need from client:
        a. Webhook
            - URL
            - Payload (Fields to be included)
    2. Info to be passed to client: 
        a. Relevant field(s) to be added in RG item module
            - ZInventory Item ID (String/Long)

Customer Syncing 
    MH in-house is the source of truth
    Referenc: Email
    1. Info need from client:
        a. Payload (Fields to be included)
    2. Info to be passed to client:
        a. Required fields for the customer/contact record in ZInventory:
            - Display Name
            - Email Address
            - Customer Type (Business/Individual)
        b. ZFlow webhook URL that will create a customer record in ZInventory once triggered

Sales Order Syncing
    MH in-house is the source of truth
    Reference: Offer reward ID - SO Reference#
    1. Info need from client:
        a. Payload (Fields to be included)
        b. ARN field value (Offer ID)
    2. Info to be passed to client:
        a. Required fields for the SO record in ZInventory:
            - Customer Email
            - Sales Order Date
            - Reference# (Offer reward ID)
            - Item/reward ZInventory ID
        b. ZFlow webhook URL that will create an SO record in ZInventory once triggered

Offer marked as Confirmed
    MH in-house will be the one to trigger
    Reference: Offer reward ID (Reference#)
    1. Info need from client:
        a. Payload (Fields to be included)
    2. Info to be passed to client:
        a. Required fields for the SO confirmation in ZInventory:
            - Reference# (Offer reward ID)
        b. ZFlow webhook URL that will confirm an SO record in ZInventory once triggered (Must be triggered per Offer reward (Offer w/ 3 rewards = Triggered 3x))

Offer marked as To be Delivered/Pending Redemption/Fulfilled
    ZInventory will be the one to trigger
    Reference: Offer ARN - ARN (Custom field)
    1. Info need from client:
        a. Webhook
            - URL
            - Payload (Fields to be included)
    2. Info to be passed to client:
        a. ZInventory and in-house status mapping:
            ZInventory - In-house
            - To be Delivered - To be Shipped
            - Pending Redemption - Shipped
            - Fulfilled - Fulfilled
