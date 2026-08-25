                 AI Supply project       
-------------------------------------------------------------
|                    React                                  |
|                     │                                     |
|                     ▼                                     |
|                Spring Boot
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
   PostgreSQL       Redis         Kafka
                                    │
                           ┌────────┼────────┐
                           ▼        ▼        ▼
                         ML       AI     Notification
React
→ Provides the web interface.

Spring Boot
→ Handles business logic and APIs.

PostgreSQL
→ Stores transactional business data.

Redis
→ Caches frequently accessed data.

Kafka
→ Handles asynchronous business events.

ML service
→ Generates predictions.

AI service
→ Provides document intelligence and natural-language interaction.