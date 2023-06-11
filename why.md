## Inspiration
The inspiration behind the OnlineSafetyGame stems from the rapid advancements in technology, particularly in the field of Artificial Intelligence (AI). We were motivated by the realization that as technology becomes more prevalent in our lives, it is crucial to bring as many individuals as possible along for the ride , regardless of their technical expertise. We believe that everyone has a responsibility to navigate the online world safely and responsibly, and we wanted to create a project that bridges the gap between technology and user education. The world is changing fast and we all have a part in it

## What it does (atleast what we are working towards φ(゜▽゜*)♪)
### At the front...
The OnlineSafetyGame is an interactive web-based application designed to educate users about online safety while also exploring various areas and trends in technology. It offers a wide range of quizzes and challenges that cover different aspects of online safety and emerging tech topics. Combining storytelling and interactive elements, users are engaged and encouraged to learn about the importance of online safety. Real scenarios and must make decisions that promote safe online practices, all while gaining valuable knowledge and skills. The game fosters critical thinking and empowers users to make informed choices to protect their personal information and privacy online. With its accessible format and engaging content, the OnlineSafetyGame aims to make learning about online safety interesting and easily accessible to all.
 ### At the back...
Player Management: The backend system keeps track of the players participating in the game. It maintains a database of player information, including their scores and participation history.

Gameplay and Scoring: When a player enters the game, they are allowed to play and answer the quizzes within a fixed duration. The backend handles the logic and scoring of each quiz, calculating the player's score based on their correct answers.

Reward Distribution: At the end of the gameplay duration, the backend system automatically determines the top three players with the highest scores. These players are awarded some amount of Ethereum (ETH) as a reward for their performance. Additionally, the system selects one lucky player randomly using Chainlink's VRF nodes randomness feature and rewards them as well.

Game Reset: After the rewards are distributed, the backend system performs an upkeep operation, periodically checking if the criteria for resetting the game are met. This includes conditions like a specific time interval, number of participants, or other predetermined factors. Once the reset criteria are fulfilled, the game starts afresh, allowing new players to participate and compete for rewards.





## How we built it
How we built it
The OnlineSafetyGame was built using a combination of frontend and backend technologies to create an engaging and secure gaming experience. Here's a breakdown of the technologies and tools we utilized:

Frontend Development:
Framework: We built the frontend of the application using React.js and Next.js frameworks. These frameworks provided a solid foundation for developing a responsive and interactive user interface.
Styling: We used Tailwind CSS to enhance the visual aesthetics and ensure a consistent design throughout the application.
Testing: To ensure the quality and functionality of the frontend, we implemented automated tests using Cypress, allowing us to simulate user interactions and validate the expected behavior.
Backend Development:
Smart Contracts: The core functionality of the game is implemented through Solidity smart contracts. We used Hardhat for contract development, testing, and deployment. Smart contracts automate various aspects of the game, including score submission and winner selection.
Deployment and Automation: We leveraged CircleCI for automated deployments, streamlining the deployment process and ensuring seamless updates to the application. We deployed the application on AWS for its scalability and reliability. Additionally, we also deployed the application on Vercel, a platform known for its stability and ease of use.
Chainlink Integration:
Chainlink Automations: Formerly known as Keepers, we integrated Chainlink Automations to enhance the game's functionality. This allowed us to automate certain tasks and maintain the game's smooth operation.
Chainlink VRF: We utilized Chainlink's VRF (Verifiable Random Function) nodes to ensure fair and random selection of winners. This adds an additional layer of security and transparency to the winner selection process.
By utilizing a combination of frontend frameworks, automated testing, smart contracts, deployment automation, and integrating Chainlink's VRF and Automations, we were able to build the OnlineSafetyGame, providing users with an immersive and secure gaming experience while learning about online safety.


## Challenges we ran into
Challenges we ran into
Throughout the development process, we faced several challenges that required innovative solutions and diligent problem-solving. Here are the key challenges we encountered:

1. Integration with Chainlink's VRF and Automations
One of our primary goals was to integrate Chainlink's VRF and Automations into the game to ensure fair winner selection and automate certain game operations. However, due to time constraints, we faced difficulties automating the process of adding the contract to Chainlink's VRF and Automations. This required additional time and effort, which we plan to address in future iterations of the project.

2. Automated Deployment and Deprecated Packages
Automating the deployment process was crucial for ensuring a seamless experience for our users. We encountered various bugs and issues, particularly with deprecated packages. This required us to spend significant time troubleshooting and finding alternative solutions. To improve the stability and reliability of the application, we are committed to rewriting and updating the packages used for production deployment.

3. Balancing Educational Content and Gameplay
One of the challenges we faced was finding the right balance between educational content and engaging gameplay. We wanted to provide valuable information about online safety while ensuring that the game remained exciting and entertaining for users. Sadly we are but overworked programmers and achieving this balance actually required careful planning, collaboration, and continuous iteration to deliver an immersive gaming experience while imparting important online safety knowledge.

Sorry in advance if the concept is a bit underwhelming we are testing water here

## Accomplishments that we're proud of
First of all, I can't believe we made this in time! But here are some

Interactive Experience:

Successfully created an immersive and interactive gaming experience that combines education and entertainment.
Implemented storytelling elements and decision-making scenarios to provide users with a realistic and engaging environment for learning about online safety.
Seamless Integration of Web3 Technologies and Smart Contracts:

Integrated web3 technologies for seamless payment processing, allowing users to participate in the game using their web3 wallets.
Utilized smart contracts to automate various game mechanics, such as score submission and winner selection, ensuring a smooth and efficient gameplay experience.
Fair and Transparent Winner Selection with Chainlink's VRF Nodes:

Incorporated Chainlink's VRF nodes to ensure fair and transparent winner selection.
By leveraging the Verifiable Random Function, we have enhanced the credibility of the game and provided users with confidence in the integrity of the results.


## What we learned
During the development of the OnlineSafetyGame, we had the pleasure of collaborating with the Chainlink community and leveraging their robust decentralized oracle network. Working alongside passionate individuals like Patrick Collins, we learned firsthand the power and potential of Chainlink's technology.

Through the integration of Chainlink's VRF nodes, we ensured fair and transparent randomization within our game, enhancing the credibility and integrity of the user experience. This experience deepened our understanding of web3 technologies, smart contracts, and decentralized systems.

We are grateful for the support and guidance we received from the Chainlink community, which played a significant role in our project's success. Their expertise and collaborative spirit allowed us to create an immersive and educational gaming experience.

Moving forward, we aim to continue building on the foundations we've established, exploring new ways to engage users and educate them about online safety. The knowledge gained from our collaboration with Chainlink will undoubtedly shape our future endeavors, as we strive to empower individuals and contribute to a safer online environment.



## What's next for OnlineSafetyGame
Expansion of Content:

Our vision is to develop additional chapters that cover various aspects of technology, including data privacy, cybersecurity, and emerging technologies.
Users will have the opportunity to explore and learn about different online safety topics in a comprehensive and engaging manner.
Enhanced Interactivity and Engagement:

We plan to incorporate more advanced features and gamification elements to further enhance the interactivity and engagement of the game.
This will ensure that users remain immersed and motivated while learning about online safety.
Continuous Improvement and Updates:

Gathering user feedback and conducting further research will be a priority to continuously refine and update the content of the OnlineSafetyGame.
This will allow us to address emerging online safety concerns and ensure that the game remains relevant and up-to-date.
Bug Fixes and Optimization:

We acknowledge the challenges we faced during development, particularly with regard to automating contract integration and deployment.
Our next steps include rewriting and updating the packages for production, addressing bugs, and optimizing the game for a seamless and stable experience.
