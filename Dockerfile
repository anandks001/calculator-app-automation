#Base image taken from:https://github.com/cypress-io/cypress-docker-images
FROM cypress/browsers:node16.5.0-chrome94-ff93

RUN mkdir /e2e
WORKDIR /e2e

#copy the essential files that we MUST use to run our scripts.
COPY ./package.json .
COPY ./cypress.config.js .
COPY ./cypress ./cypress
#Install the cypress dependencies
RUN npm install
#Executable commands
ENTRYPOINT ["npx","cypress","run"]
#With CMD in this case, we can specify more parameters to the last entrypoint.
CMD [""]