# React Survey

With this exercise, we're going to create a survey and have some more practice creating forms. They're not exactly the
easiest or most fun to create, but they're everywhere! (We could even argue that the web isn't much more than a 
bunch of forms). This will also give you some hands-on time with creating controlled forms in React.

![](./images/duck-survey.gif)

## Setup

1. Fork this repository
2. Clone the forked repository onto your local machines
3. In the root directory, type `npm ci`, which installs dependencies for the project
4. Finally, type `npm run dev`, which starts a development server that runs your website in the browser. That server 
   will reload your website whenever you make any changes to source files

## Instructions

- **Make sure you check all the code that was given to you**
- Add the missing form in `src/components/Survey.jsx`, following the templates in the `templates` folder
- When the form is submitted, start by logging the answers to the console
- After submitting the form, you should reset the form to its original state

## Tips
- The form might look quite big, but there are opportunities here to reuse some of the components you create within the form
- Remember that in a controlled form, the state is the one keeping track of the inputs values

## Extension 1
Store all submitted answers in state. Update `src/components/Survey.jsx` to display all the answers using the provided 
`src/components/AnswerList.jsx` component. You will need to examine the provided components to understand the data 
structure they expect and what props should be passed. Note that you can also modify these components to better suit the data structure you created in the first part of the exercise.

## Extension 2
Add an edit button to each of the answers cards. Clicking on this button should fill in the form with the current answers, and submitting the form should save the changes into the same card again.

## Extension 3
Add a json-server to your app, and persist all the answers from the form. You still should be able to edit the form and save the new answers too. Also, add a delete button to each of the answers that will delete them from the server too.
- Install this as a local (not global) dependency: `npm install json-server --save`
- To run the server: `npx json-server --watch db.json`
