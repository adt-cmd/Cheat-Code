Syncing of Offer in ZInventory as multiple SO(s) based on rewards
E.g: Offer with 3 rewards will sync 3 SOs in ZInventory

Steps:
1. Create a custom webhook in ZFlow that will create an SO per Offer reward
2. The reward ID will be stored in SO reference number field for future reference
3. The Offer ARN also will be stored in each SO to identify their corresponding Offer in the in-house system