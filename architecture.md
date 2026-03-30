# multi-tenant-analytics-dashboard Architecture

# Multi-Tenancy Model
I chose the pooled approach as, to me, it makes more sense to manage one database than many.

    - Managing one database makes schema updates easier if using a relational db.
    - It should costs less to manage a single db infrastructure than an instance for each tenant you have (infra, backups, etc)
    - Allows us to query our data easier being with it being in one spot

# AWS Service
- Frontend
    - S3 + cloudfront for hosting our frontend
        - our app is static content
        - S3 usage is cheap
- Backend
    - ECS Fargate
        - automatically scales to handle our 10x traffic scenario
        - pay for what you use
    - (Another possibility) Lamba 
        - also pay for what you use
        - scales well for our 10x traffic scenario
        - downside being it has cold-start times
- Database
    - Amazon RDS + some flavor of SQL
        - our data seems very relational
        - can scale horizontally with replicas for read
    - (Another possibility) Dynamo - depending on if our event volume is consistently large
        - Scales very well while mainting fast speeds
        - can solve tenancy concerns with a partition on tenantId


# Security and Scalability
- 10x traffic spikes can be handled by fargate's automatic scaling
- To prevent data leakage we can use Cognito for jwt generation to provide scoped tokens used by our services to authenticate
