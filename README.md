# Playwright Data Driven Framework
A scalable Playwright test automation framework using data-driven testing techniques. Test scenarios are defined in JSON to minimize code duplication and improve maintainability.

Technical evaluations will not pass if they are not data-driven and written in JS/TS.

## Important Reminder: Accuracy is Key
We fully encourage the use of AI tools like ChatGPT, Cursor, Claude Code to assist in completing the evaluation. However, it’s essential that you double-check your work for accuracy before submitting. While AI can be a helpful resource, errors can slip through if not carefully reviewed. As part of the role, attention to detail and quality assurance is a must—just like it would be in the position you're applying for.
Please take the extra step to ensure everything is correct before submission. This will help save valuable time for both you and our team as we review your work. Thanks for your understanding, and good luck!

## Acceptance Criteria 
**Objective:** Create a Playwright-driven test suite that leverages **data-driven techniques** to minimize code duplication and improve scalability. By driving test scenarios from a JSON object, we can dynamically adapt each test case without repeating code, ensuring a clean and maintainable structure as new cases are added. **Please only use JavaScript/TypeScript.**  

**Setup and Preparation**  

1. Set up a new project or workspace dedicated to this task.  
2. Ensure Playwright and its necessary dependencies are installed and configured.

**Login Automation (Updated 12/2/24)**  
Implement login automation for Asana using the following credentials:  
+ Demo App: https://animated-gingersnap-8cf7f2.netlify.app/
+ Email: admin  
+ Password: password123  

The script should input these credentials into the login form and submit it successfully.

### Test Case 1
1. Login to Demo App.  
2. Navigate to "Web Application."  
3. Verify "Implement user authentication" is in the "To Do" column.  
4. Confirm tags: "Feature" "High Priority”  

### Test Case 2
1. Login to Demo App.  
2. Navigate to "Web Application."  
3. Verify "Fix navigation bug" is in the "To Do" column.  
4. Confirm tags: "Bug"  

### Test Case 3
1. Login to Demo App.  
2. Navigate to "Web Application."  
3. Verify "Design system updates" is in the "In Progress" column.  
4. Confirm tags: "Design”  

### Test Case 4
1. Login to Demo App.  
2. Navigate to "Mobile Application."  
3. Verify "Push notification system" is in the "To Do" column.  
4. Confirm tags: "Feature”  

### Test Case 5
1. Login to Demo App.  
2. Navigate to "Mobile Application."  
3. Verify "Offline mode" is in the "In Progress" column.  
4. Confirm tags: "Feature" & "High Priority”  

### Test Case 6
1. Login to Demo App.  
2. Navigate to "Mobile Application."  
3. Verify "App icon design" is in the "Done" column.  
4. Confirm tags: "Design”  

## Additional Test Cases

### Test Case 0
1. Navigate to Login page  
2. Input invalid credentials
3. Verify "Invalid username and password" text is visible

### Test Case 7
1. Login to Demo App.  
2. Navigate to "Marketing Campaign."  
3. Verify "Email campaign" is in the "In Progress" column.  
4. Confirm tags: "Design” "High Priority"

### Test Case 8
1. Login to Demo App.  
2. Navigate to "Marketing Campaign."  
3. Verify "Landing page copy" is in the "Review" column.  
4. Confirm tags: "Design”  

### Test Case 9
1. Login to Demo App.  
2. Navigate to "Marketing Campaign."  
3. Verify "Social media calendar" is in the "To Do" column.  
4. Confirm tags: "Feature”  

### Test Case 10
1. Login to Demo App.  
2. Navigate to “Web Application”  
3. Verify column “Backlogged” does not exist 

### Test Case 11
1. Login to Demo App.  
2. Navigate to "Mobile Application."  
3. Verify “Social media calendar” task does not exist

### Test Case 12
1. Login to Demo App.  
2. Navigate to "Marketing Campaign”  
3. Verify "Email campaign" is in the "In progress" column.  
4. Verify tag “Bug” does not exist

### Test Case 13
1. Login to Demo App.  
2. Navigate to “Web Application”
3. Verify “Update Documentation” is NOT “In Progress”

## Submission Instructions
Publish your code to a public GitHub repository and provide the link in the Google form.
Provide a short, 2-3 minute video walking through your code to share your solution and your thought process behind it. This is similar to how we share our work with clients and is designed to give us a glimpse into your communication style. 
Upload the video into the Google Form.

