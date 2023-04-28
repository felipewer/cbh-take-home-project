# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here


### Assumptions:

  - The objective of the generateReport function is to present the relevant compiled data for each Agent that worked with the Facility during that quarter.

  - When no customId is available for an Agent, the database internal agentId should still be used.

  - The database in use is a common relational database.

  - There already exists a UI page/section related to the posted Shift where the Facility can inspect the Agent profile.

  - Database migrations are not run automatically in production. There exists a well defined process to run them and the tickets related to migrations are assigned to the people with the needed permissions to run them.

  - The communication between the backend and the frontend is done through a REST API.

  - Effort estimates are given in terms of orders of magnitude: minutes, hours, days, weeks, months.

  - Tickets should be deployable to production independently of full feature completion given that individual ticket dependencies are fulfilled.


### *Tickets:*


**1 - Create new database table `facility_agent_metadata`**

*Dependencies:* None

*Details:*
  - Implement a new database migration script wherein a new table is created with the following fields (facility_id, agent_id, custom_id). The table should be named 'facility_agent_metadata' and follow these constraints:
    - All fields are required;
    - facility_id and agent_id are foreign keys to the facilities and agents tables respectively;
    - custom_id is of type 'text';
    - The 3 fields combined compose the table primary key.
  - Create integration test cases to insert and retrieve data from the new table.
  

*Acceptance:*

  Given a database containing the tables facilities and agents, when the migration script is run, then a new empty table named facility_agent_metadata is created with the fields facility_id, agent_id, and custom_id.

*Effort Estimate:* hours


**2 - Run `facility_agent_metadata` migration in production;**

*Dependencies:* Ticket 1

*Details:*
  - Run the migration script created in Ticket 1 in production.
  
*Acceptance:* 

  Given the production database containing the tables facilities and agents, when the migration script is run, then a new empty table named facility_agent_metadata is created with the fields facility_id, agent_id, and custom_id.

*Effort Estimate:* minutes


**3 - Create Facility Agent API subresource**

*Dependencies:* Ticket 1, Ticket 2

*Details:*
  - Add a new API subresource to the Facility API resource to allow the Facility to register a customId for an Agent. This uses the database `facility_agent_metadata` table. Create the following endpoints:
    - POST /api/facilities/{facilityId}/agents -> Register a new Facility Agent passing in (agentId,customId);
    - GET /api/facilities/{facilityId}/agents/{agentId} -> Retrieve Facility Agent (facilityId,agentId,customId);
  - Check that the user calling the endpoints has the 'FacilityManager' role;
  - Create integration test cases for the new endpoints.
  
*Acceptance:*

  Given the existence of an Agent and a Facility in the system, when the POST endpoint is called using the correct credentials, then a new entry is created in the facility_agent_metadata table with the given agentId and customId and the entity is retrievable using the GET endpoint.

*Effort Estimate:* hours


**4 - Implement UI to add customId to Agent**

*Dependencies:* Ticket 1, Ticket 2, Ticket 3

*Details:*
  - Add UI elements to the Agent profile page to allow the Facility to register a customId for the Agent booked on a Shift and to display that customId if it was registered prior (Seek input from UX team);
  - Integrate the respective API endpoints (POST /api/facilities/{facilityId}/agents and GET /api/facilities/{facilityId}/agents/{agentId}) to save and retrieve the customId;
  - Create E2E test cases for the new feature.
  
*Acceptance:*

  Given an Agent is booked in a Shift posted by the Facility and the Agent profile is open, when the Facility manager adds a custom id to the profile, then a new entry is created in the facility_agent_metadata table in the database with the given agentId and customId.

*Effort Estimate:* days


**5 - Change report generation to include Agent customId**

*Dependencies:* Ticket 1, Ticket 2

*Details:*
  - Change the `getShiftsByFacility` implementation to join the `facility_agent_metadata` table when querying the shifts table and include the customId alongside the agentId with the Agent metadata;
  - Change the `generateReport` implementation to use the customId instead of the agentId if available when presenting the data for each Agent;
  - Update affected unit tests.
  - Update integration test cases for the getShiftsByFacility function.
  - Update functional test cases for the generateReport function.
  
*Acceptance:*

  Given that the Facility has registered a customId for the Agent and the Agent worked on at least 1 Shift posted by the Facility during the given quarter, when a report is generated, that Agent is identified in the report by the customId instead of the agentId.

*Effort Estimate:* hours