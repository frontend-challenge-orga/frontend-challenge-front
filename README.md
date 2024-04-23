# Frontend Challenge (MVP)

Frontend Challenge is a platform dedicated to frontend development enthusiasts, designers, and web developers looking to enhance their skills and tackle creative challenges. Our mission is to provide a space where professionals and amateurs alike can come together to explore, create, and collaborate on frontend development projects.

Whether you're a curious beginner or a seasoned expert, Frontend Challenge offers a variety of stimulating challenges for all skill levels. Through our user-friendly platform, you'll have access to a series of weekly challenges, accompanied by Figma mockups or images, designed to showcase your design and development skills.

Participate in our challenges, create impressive prototypes, share your knowledge, and collaborate with other frontend enthusiasts from around the world. Take on the challenges, explore new techniques, and evolve your skills while having fun!

## TODO
- [ ] Move backend queries from backend folder to data-access layer.

## Architecture

**<u>-app:</u>** Contains the routing of the application (pages).

**<u>-data-access:</u>** Contains queries and mutations for the application.

**<u>-use-cases:</u>** Contains the business logic of the application. (Link to the data-access layer)

**<u>-frameworks:</u>** Contains the implementation of the application. (Link to the use-cases layer) </br>
**Everything that is closely or remotely related to the framework, such as JSX, hooks, stores, must absolutely be located in this folder.**
