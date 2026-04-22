# Prompts used for generating solution (Claude Sonnet 4.6)

These are the main prompts I used to generate about 90% of the code in this project. Test cases 7, 8, and 9 were added by me to prove the concept of generating new test cases by only editing the JSON itself. I also edited selectors myself as the AI picked complicated/inaccurate selectors so it was easier for me to pick selectors myself.

"I need an automation script created with Playwright/Javascript. The objective is to create a Playwright-driven test suite that leverages data-driven techniques to minimize code duplication and improve scalability. By driving test scenarios from a JSON object, we can dynamically adapt each test case without repeating code, ensuring a clean and maintainable structure as new cases are added. When the test cases are implemented I want a comment proceeding each step describing the test step being followed. As the objective states I want data points such as email, password, success/error messages, and other static data points stored in a JSON file. The test runner can live in one runner.spec.js file. I also want all of the selectors stored in a separate file. Avoid using await page.waitForLoadState('networkidle'); Can the test also be written to run in parallel across chrome, firefox, and webkit?"

Implement login automation for Asana using the following credentials:  
Demo App URL: https://animated-gingersnap-8cf7f2.netlify.app/  
Email: admin  
Password: password123  

Test Case 1
1. Login to Demo App.  
2. Navigate to "Web Application."  
3. Verify "Implement user authentication" is in the "To Do" column.  
4. Confirm tags: "Feature" "High Priority”  

Test Case 2
1. Login to Demo App.  
2. Navigate to "Web Application."  
3. Verify "Fix navigation bug" is in the "To Do" column.  
4. Confirm tags: "Bug"  

Test Case 3
1. Login to Demo App.  
2. Navigate to "Web Application."  
3. Verify "Design system updates" is in the "In Progress" column.  
4. Confirm tags: "Design”  

Test Case 4
1. Login to Demo App.  
2. Navigate to "Mobile Application."  
3. Verify "Push notification system" is in the "To Do" column.  
4. Confirm tags: "Feature”  

Test Case 5
1. Login to Demo App.  
2. Navigate to "Mobile Application."  
3. Verify "Offline mode" is in the "In Progress" column.  
4. Confirm tags: "Feature" & "High Priority”  

Test Case 6
1. Login to Demo App.  
2. Navigate to "Mobile Application."  
3. Verify "App icon design" is in the "Done" column.  
4. Confirm tags: "Design”  

## Follow Up prompts:

Can you change the selectors so instead of using CSS strings they use the locator function?

Can you take these files and convert them into POM without changing the selectors or the overall logic?

Can you add an invalid login scenario? It should expect the text `Invalid username or password`?

Can you add the login credentials fields to each test case in the JSON that way we don't need to add an extra test block in the runner? The invalid login test case can have the column and tag fields expect empty.

I ran into a bug with the first two test cases:  
`{ "id": "TC01", "description": "Verify 'Implement user authentication' is in To Do with correct tags", 
"email": "admin", "password": "password123", "project": "Web Application", "taskName": "Implement user authentication", "expectedColumn": "To Do", "expectedTags": ["Feature", "High Priority"] }, { "id": "TC02", "description": "Verify 'Fix navigation bug' is in To Do with correct tags", "email": "admin", "password": "password123", "project": "Web Application", "taskName": "Fix navigation bug", "expectedColumn": "To Do", "expectedTags": ["Bug"] }`, If I change the tags in tc01 to bug, the test will still pass since the tag is in the same column but not the same card on the page.

Can you add the following test cases to this project? Edit the JSON and add conditional logic in the runner and boardPage logic where needed so the new test cases can be implemented in the same test block.

Test Case 10
1. Login to Demo App.  
2. Navigate to “Web Application”  
3. Verify column “Backlogged” does not exist 

Test Case 11
1. Login to Demo App.  
2. Navigate to "Mobile Application."  
3. Verify “Social media calendar” task does not exist

Test Case 12
1. Login to Demo App.  
2. Navigate to "Marketing Campaign”  
3. Verify "Email campaign" is in the "In progress" column.  
4. Verify tag “Bug” does not exist

Test Case 13
1. Login to Demo App.  
2. Navigate to “Web Application”
3. Verify “Update Documentation” is NOT “In Progress”
