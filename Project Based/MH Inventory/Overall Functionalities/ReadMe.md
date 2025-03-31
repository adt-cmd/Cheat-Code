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

Offer Syncing Payload
{
    "ARN": "DEVTAC-ZINV-FLOW-12345",
    "Product_Name": "Sample Product Vertical",
    "Provider": "DBS",
    "Product_Vertical": "Credit Card",
    "Customer": {
        "Email": "althon.devtac@gmail.com",
        "First_Name": "DEVTAC JHON",
        "Last_Name": "DOE",
        "Phone_Number": "09123456789",
        "Mobile_Number": "09876543213",
        "Address_Line_1": "Market Street",
        "Address_Line_2": "Suite 800",
        "City": "New York",
        "State": "NY",
        "ZIP_Code": "10001",
        "Country":"United States"
    },
    "Rewards": [
        {
            "Reward_ID": 1234567890,
            "Reward_Item_ZInv_ID": 5425096000001948599,
            "Quantity": 1,
            "Redemption_Code": "R101",
            "End_Date": "30-Jan-2025",
            "Redemption_Center": "Best Denki",
            "Market": "Singapore"
        },
        {
            "Reward_ID": 4567891011,
            "Reward_Item_ZInv_ID": 5425096000001948731,
            "Quantity": 1,
            "Redemption_Code": "R103",
            "End_Date": "30-Jan-2025",
            "Redemption_Center": "Shopee Pte. Ltd.",
            "Market": "Singapore"
        },
        {
            "Reward_ID": 7891011121,
            "Reward_Item_ZInv_ID": 5425096000002196260,
            "Quantity": 1,
            "Redemption_Code": "R104",
            "End_Date": "30-Jan-2025",
            "Redemption_Center": "Short-Q",
            "Market": "Singapore"
        }
    ]
}