Module Sync from ZCRM to ZCreator Issue Solution

- CRM
    - Fields
        - Component Module > Component Synced? 
        - Component Module > Zoho Creator ID? 


    - Custom Function
        - Test Deal Sync
        - Test Component Sync
        - Test Bid Sync

    - Workflow Rule
        - Test Sync Component Bids 🔧

    - Blueprint
        - Deals Blueprint
          Transitions:
            - Self Quote - After -> Test Deal Sync 🔧
            - Quote with sourcing - After -> Test Deal Sync 🔧
            - No Quote Needed - After -> Test Deal Sync 🔧


- Creator
    - Custom Function
        - Component_Creation_Via_Record_Log > 102-106 🔧