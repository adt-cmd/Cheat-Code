SELECT 
    IAR."Invoice Number" AS "Invoice Number",
    IAR."Status" AS "Status",
    IAR."Timestamp" AS "Timestamp",
   	CASE
        WHEN LEAD(IAR."Timestamp") OVER (PARTITION BY IAR."Invoice Number" ORDER BY IAR."Timestamp") IS NOT NULL THEN
        CONCAT(
            -- Days
            FLOOR((UNIX_TIMESTAMP(LEAD(IAR."Timestamp") OVER (PARTITION BY IAR."Invoice Number" ORDER BY IAR."Timestamp")) - UNIX_TIMESTAMP(IAR."Timestamp")) / 86400), 'd:',
            
            -- Hours
            LPAD(FLOOR(((UNIX_TIMESTAMP(LEAD(IAR."Timestamp") OVER (PARTITION BY IAR."Invoice Number" ORDER BY IAR."Timestamp")) - UNIX_TIMESTAMP(IAR."Timestamp")) % 86400) / 3600), 2, '0'), 'h:',
            
            -- Minutes
            LPAD(FLOOR(((UNIX_TIMESTAMP(LEAD(IAR."Timestamp") OVER (PARTITION BY IAR."Invoice Number" ORDER BY IAR."Timestamp")) - UNIX_TIMESTAMP(IAR."Timestamp")) % 3600) / 60), 2, '0'), 'm:',
            
            -- Seconds
            LPAD(((UNIX_TIMESTAMP(LEAD(IAR."Timestamp") OVER (PARTITION BY IAR."Invoice Number" ORDER BY IAR."Timestamp")) - UNIX_TIMESTAMP(IAR."Timestamp")) % 60), 2, '0'), 's'
        )
        ELSE 'Present'
    END AS "Duration (dd:hh:mm:ss)"
FROM "Invoice Aging Report" AS IAR
ORDER BY
    IAR."Invoice Number",
    IAR."Timestamp";