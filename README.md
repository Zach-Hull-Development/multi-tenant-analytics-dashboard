# multi-tenant-analytics-dashboard

ROI Solutions coding assessment

## Getting Started

### To install all dependencies, from the root folder run:
- npm run install-all

### To run the full project, in two separate terminals run:
- npm run dev:server
- npm run dev:ui

### Trying it out
- There are currently only two users and two organizations. "Logins" can be found below:
    - User 1 (Zach):
        - userId: 1
        - organizationId: 1
    - User 2 (Vahida):
        - userId: 2
        - organizationId: 2



## About my approach

### Backend:
The service uses express and follows an endpoint => service approach. If we had databases it would continue endpoint => service => repository. This approach enables us to contain business logic in the service layer and allows for easier testing of business logic while containing db logic in the repository.


Main Packages Used:
- express for endpoints
- jsonwebtoken for simple signing and verifying
- cors to enable server => client communication


### Frontend:
The ui was generated with create-react-app. I started with a simple login screen that handles login. 

Main Packages Used:
- zustand for simple and easy state management
- material (mui) for out-of-the-box components
    - Side Note: I orginially started with recharts like mentioned in the hand-off file but saw mui had charting as well.


