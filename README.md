# vertex_motors

rview: 
               The Vertex Motor Integration Project is an automated integration solution developed to transfer business data from the Vertex Motor external system into Microsoft Dynamics 365 Business Central.
    The solution uses SQL Server as a database, Microsoft Power Automate as the integration layer and Business Central APIs/custom AL functionality to create and process records in Business Central.
   The primary objective is to eliminate manual data entry, improve data accuracy, reduce processing time, and provide integration monitoring. 
Problem Statement
Before automation users had to manually transfer information from the Vertex Motor system into Business Central. This process was: 
●Time-consuming and repetitive. 
●Prone to data-entry errors.
●Difficulty managing higher transaction volumes.
●Difficult to manage when transaction volumes increased.
●Causing delays in creating sales and purchase documents.
●Difficult to monitor when a record failed during processing.
●Lacking centralized integration logs and error details.
●Dependency on users to identify and correct synchronization issues.
Solution:
                  To solve the synchronization and manual data-entry problems between Vertex Motor and Microsoft Dynamics 365 Business Central, we developed an automated integration using SQL Server, Power Automate, Business Central APIs, and custom AI development.
 Project Objectives
●Automate data transfer between Vertex Motor and Business Central.
●Reduce manual data entry.
●Improve data accuracy.
●Reduce processing time.
●Synchronize required master and transactional data.
●Provide integration monitoring.
●Provide a structured mechanism for integration error tracking.
Scope
Master Data
●Items
●Customers
●Vendors
 Transactional Data
●Sales Orders
●Purchase Orders
 Technical Scope
●SQL Server staging/data layer
●Power Automate integration flows
●Business Central API integration
●Custom AL integration monitoring/error functionality
Technical Architecture
VERTEX MOTOR
                              |
                             v
                         SQL SERVER
              +---------------+---------------+
              |                       |                       |
            Item          Customer          Vendor
              |                       |                          |
              +---------------+---------------+
                                      |
                          Purchase / Sales Data
                                      |
                                      v
                       POWER AUTOMATE
                                      |
              +---------------+---------------+
              |                       |                        |
           Item API      Customer API      Vendor API
                                     |
                         Purchase / Sales APIs
                                   |
                                   v
                  BUSINESS CENTRAL
                                        |
                        +------------+------------+
                         |                                     |
                         v                                   v
          Business Records          Integration Monitoring
 Technology Stack
Component	Technology	Purpose
Source System	Vertex Motor External System	Origin of business data
Database	Microsoft SQL Server	Intermediate/staging data layer
Integration	Microsoft Power Automate	Data retrieval, orchestration and transfer
ERP	Microsoft Dynamics 365 Business Central	Target ERP
API	Business Central APIs	System-to-system communication
Custom Development	AL	Integration-specific Business Central functionality
Development Environment	Visual Studio Code	AL development
Database Testing	SQL Server	Source/staging data validation
 SQL Server Development
SQL Server acts as the intermediate data layer between the Vertex Motor external system and Business Central. Data received from the external system is stored in SQL Server before being processed by Power Automate.
 SQL Data Domains
Data Area	Role in Integration	BC Target
Item	Item master data	Business Central Item
Customer	Customer master data	Business Central Customer
Vendor	Vendor master data	Business Central Vendor
Purchase Order Header	Purchase Order header information	Purchase Order Header
Purchase Order Line	Purchase Order line information	Purchase Order Lines
Sales Order	Sales transaction information	Sales Order Header/Lines
Vehicle Requirement	Vehicle information	Vehicle data
 SQL Item Data
●Item Number
●Description
●Unit of Measure
●Quantity
●Item Category
●Other item-related information
 SQL Customer Data
●Customer Number
●Customer Name
●Address
●City
●State
●Country
●Contact information
 SQL Vendor Data
●Vendor ID
●Vendor Name
●Address
●City
●State
●Country
●Contact information
Purchase Order Header Data
●Purchase Order Number
●Vendor
●Order Date
●Location
●Status
●External Reference
 Purchase Order Line Data
●PO Number
●Line Number
●Item
●Quantity
●UOM
●Unit Cost
 Purpose
Transfer item information from SQL Server to Business Central.
 Integration Flow
SQL Item Table
      ↓
Power Automate
      ↓
Read Item Record
      ↓
Validate Data
      ↓
Business Central Item API
      ↓
Create / Update Item
      ↓
Integration Log
 Customer Integration
 Purpose
Transfer customer information from SQL Server into Business Central.
Integration Flow
SQL Customer Table
      ↓
Power Automate
      ↓
Validate Customer Data
      ↓
Business Central Customer API
      ↓
Create / Update Customer
      ↓
Integration Log
Vendor Integration
 Purpose
Transfer vendor information from SQL Server to Business Central.
 Integration Flow
SQL Vendor Table
      ↓
Power Automate
      ↓
Validate Vendor Data
      ↓
Business Central Vendor API
      ↓
Create / Update Vendor
      ↓
Integration Log
Purchase Order Integration
 Purpose
Transfer purchase order information from Vertex Motor SQL data into Business Central. The supplied project document identifies the Purchase Order as a header-and-line transaction.
 Purchase Order Architecture
SQL PO Header + SQL PO Lines
             ↓
       Power Automate
             ↓
     Validate Vendor
             ↓
     Create PO Header
             ↓
       Read PO Lines
             ↓
        For Each Line
             ↓
    Validate Item / UOM
             ↓
      Create PO Line
 Sales Order Integration
 Purpose
Transfer sales transaction information from Vertex Motor into Business Central. A sales order is handled as a header and its related lines.
Integration Flow
SQL Sales Order Header
        +
SQL Sales Order Lines
        ↓
Power Automate
        ↓
Validate Customer / Item
        ↓
Create Sales Order Header
        ↓
Create Sales Order Lines
 Power Automate Implementation
Power Automate is the integration  layer responsible for moving data from SQL Server to Business Central. Separate flows are documented for the major business entities.
Flow	Source	Destination	Purpose
Item Integration	SQL Item	BC Item API	Create/update item
Customer Integration	SQL Customer	BC Customer API	Create/update customer
Vendor Integration	SQL Vendor	BC Vendor API	Create/update vendor
Purchase Order Integration	SQL PO Header/Lines	BC Purchase APIs	Create PO header and lines
Sales Order Integration	SQL SO Header/Lines	BC Sales APIs	Create SO header and lines
Flow Design Pattern
Trigger / Scheduled or source event
        ↓
Read SQL data
        ↓
Validate / transform
        ↓
Call Business Central API
        ↓
Evaluate response
     ↙          ↘
 Success        Failure
   ↓               ↓
Log success     Log error
Business Central API Integration
                 Business Central APIs provide the interface used by the integration layer to create and/or update Business Central data. Exact API names, endpoints and authentication configuration were not included in the supplied document and must be populated from the implemented environment.
AL Development
The supplied project document identifies custom AL functionality for Business Central integration monitoring and processing. The exact object IDs and names are not present in the supplied file, so they should be added from the AL extension before final handover.
Object Type	 Object Name	Purpose
Table	[Integration Log]	Store integration status/results
Table	[Integration Error]	Store integration errors
Codeunit	[Integration Log Management]	Logging/processing logic
Codeunit	[Integration Error Management]	Error handling logic
API Page / Page	[Actual Name]	API/monitoring functionality
Deployment
Development Environment
        ↓
Testing Environment
        ↓
       UAT
        ↓
Production
●Deploy SQL objects/configuration.
●Deploy Power Automate flows and connection references.
●Deploy Business Central extension.
●Configure API access and permissions.
●Validate master data prerequisites.
●Execute smoke/end-to-end tests after deployment.
Security and Authentication
●Document the actual Business Central authentication mechanism used by the project.
●Document SQL connection security and ownership.
●Document Power Automate connection references.
●Document Business Central permissions required by the integration user/service principal.
●Do not store passwords, client secrets, access tokens or connection strings in this document.
Future Enhancements
●Automatic retry for transient integration failures.
●Email or Teams notification for critical failures.
●Integration monitoring dashboard.
●Automated reprocessing of corrected failed records.
●Additional master-data and transaction integrations as required.
●Enhanced integration audit and operational reporting.
Conclusion
The Vertex Motor Integration Project provides an automated mechanism for transferring business data from an external system into Microsoft Dynamics 365 Business Central.
The solution addresses the major challenges associated with manual data entry and disconnected systems by introducing SQL Server, Power Automate, Business Central APIs, and custom integration monitoring.
The architecture is reusable and can be expanded to support additional business processes and external systems in the future.
