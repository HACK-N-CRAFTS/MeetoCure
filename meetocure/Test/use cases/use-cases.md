# Patient-Doctor Appointment Booking System - Use Cases
## Andhra Pradesh, South India

## Document Information
**System Name**: Patient-Doctor Appointment Booking System
**Target Region**: Andhra Pradesh, South India
**Document Version**: 2.0 - Andhra Pradesh Edition
**Last Updated**: October 8, 2025
**Status**: Draft

---

## Table of Contents
1. [Actors](#actors)
2. [Use Case Overview](#use-case-overview)
3. [Detailed Use Cases](#detailed-use-cases)

---

## Actors

### Primary Actors
- **Patient**: End user in Andhra Pradesh who searches for doctors and books appointments based on symptoms. May be from urban centers (Visakhapatnam, Vijayawada, Guntur) or rural areas with varying levels of digital literacy. Prefers Telugu or English language interface.

### Secondary Actors
- **System**: The appointment booking application tailored for Andhra Pradesh healthcare infrastructure
- **Email Service**: External service for sending email notifications (optional for rural users)
- **SMS Service**: External service for sending bilingual (Telugu/English) SMS notifications - mandatory
- **Doctor Calendar System**: External system maintaining doctor availability across AP hospitals and clinics
- **Aarogyasri System**: AP state government health insurance scheme database for eligibility verification
- **Payment Gateway**: Indian payment services (UPI, Paytm, PhonePe, BHIM, cards)
- **Map Service**: Indian mapping service for location and navigation

---

## Use Case Overview

| Use Case ID | Use Case Name | Primary Actor | Priority |
|-------------|---------------|---------------|----------|
| UC-01 | Search Doctors by Symptoms (Telugu/English) | Patient | High |
| UC-02 | Browse and Filter Doctors by Location & Language | Patient | High |
| UC-03 | View Doctor Profile with Regional Details | Patient | High |
| UC-04 | Select Doctor and View Availability | Patient | High |
| UC-05 | Book Appointment with Aarogyasri Support | Patient | High |
| UC-06 | Receive Bilingual Appointment Confirmation | Patient | High |
| UC-07 | Add Appointment to Calendar | Patient | Medium |
| UC-08 | Handle Booking Error with Language Support | Patient | High |
| UC-09 | Search with Voice Input (Telugu/English) | Patient | Medium |
| UC-10 | Filter by Aarogyasri Empanelment | Patient | Medium |

---

## Detailed Use Cases

### UC-01: Search Doctors by Symptoms (Telugu/English)

**Primary Actor**: Patient

**Goal**: Find relevant doctors in Andhra Pradesh based on symptoms entered in Telugu or English

**Preconditions**:
- Patient has access to the application via smartphone/tablet/desktop
- Doctor database is populated with AP doctor profiles
- Symptom database includes Telugu and English terms

**Postconditions**:
- System displays a list of doctors in Andhra Pradesh relevant to the entered symptoms

**Main Success Scenario**:
1. Patient navigates to the search page
2. Patient selects language preference (Telugu or English)
3. Patient enters one or more symptoms in the search field (text or voice)
4. System validates the input
5. System matches symptoms to medical specialties using bilingual symptom database (REQ-6.3)
6. System considers regional health conditions common in AP (REQ-6.5)
7. System retrieves doctors matching the specialties in patient's district/nearby areas
8. System displays ranked list of relevant doctors with distance information (REQ-3.1.4)
9. Use case ends

**Alternative Flows**:

**3a. Invalid or empty input**:
- 3a1. System displays error message in selected language prompting valid input
- 3a2. Return to step 3

**7a. No doctors found in patient's area**:
- 7a1. System displays "No doctors found in your area" message in selected language
- 7a2. System suggests expanding search radius to nearby districts
- 7a3. System suggests alternative symptoms or broader search terms
- 7a4. Use case ends

**8a. Low bandwidth/connectivity issues**:
- 8a1. System displays cached/limited results
- 8a2. System shows message indicating partial results due to connectivity
- 8a3. Use case ends

**Extensions**:
- Patient can add multiple symptoms for refined results (REQ-3.1.3)
- Patient can switch language at any time
- System provides search results optimized for mobile-first experience (REQ-4.2)

**Related Requirements**: REQ-3.1.1, REQ-3.1.2, REQ-3.1.3, REQ-3.1.4, REQ-4.5, REQ-4.7, REQ-5.1.1, REQ-6.3, REQ-6.5

---

### UC-02: Browse and Filter Doctors by Location & Language

**Primary Actor**: Patient

**Goal**: Refine doctor search results using Andhra Pradesh-specific filters

**Preconditions**:
- Patient has performed a symptom search (UC-01)
- Search results are displayed
- Patient's location is detected or entered (district/mandal/city)

**Postconditions**:
- System displays filtered list of doctors based on selected criteria relevant to Andhra Pradesh

**Main Success Scenario**:
1. Patient views the list of doctors from search results
2. Patient selects filter criteria:
   - Specialty
   - Location (district, city, mandal, village)
   - Distance in kilometers from current location
   - Availability
   - Ratings
   - Consultation fees in INR range
   - Language spoken (Telugu, English, Hindi, Urdu)
   - Hospital type (Government/Private/Corporate)
   - Aarogyasri acceptance
3. System applies selected filters
4. System updates the doctor list to show only matching results
5. System displays results with distance and location details
6. Patient reviews filtered results
7. Use case ends

**Alternative Flows**:

**4a. No doctors match filter criteria**:
- 4a1. System displays "No doctors found" message in selected language
- 4a2. System suggests adjusting filter criteria (e.g., expand distance radius, relax fee range)
- 4a3. System shows nearest available alternatives outside filter criteria
- 4a4. Return to step 2

**Extensions**:
- Patient can apply multiple filters simultaneously
- Patient can clear filters to return to original search results
- Patient can save filter preferences for future searches
- System remembers patient's preferred language filter

**Related Requirements**: REQ-3.2.1, REQ-3.2.2, REQ-3.2.3, REQ-6.6

---

### UC-03: View Doctor Profile with Regional Details

**Primary Actor**: Patient

**Goal**: View detailed information about a specific doctor including Andhra Pradesh-specific details

**Preconditions**:
- Patient has search results or filtered doctor list displayed
- Doctor profiles exist in the system with complete AP-specific information

**Postconditions**:
- Patient has viewed comprehensive doctor information with regional context

**Main Success Scenario**:
1. Patient clicks on a doctor from the search/browse results
2. System retrieves doctor's detailed profile
3. System displays doctor profile page with:
   - Name in English and Telugu
   - Photo
   - Medical specialty/specialties
   - Qualifications and credentials (MCI/NMC and AP Medical Council registration)
   - Years of experience
   - Patient ratings and reviews
   - Consultation fees in INR
   - Location/practice address with district and mandal information
   - Landmark and navigation link (Google Maps)
   - Languages spoken (Telugu, English, Hindi, Urdu)
   - Hospital/clinic affiliations in Andhra Pradesh
   - Aarogyasri empanelment status
   - Available appointment slots
   - Hospital type (Government/Private/Corporate)
4. System displays distance from patient's location
5. Patient reviews the doctor's information in preferred language
6. Use case ends

**Alternative Flows**:

**2a. Doctor profile cannot be retrieved**:
- 2a1. System displays error message in patient's selected language
- 2a2. System offers option to retry
- 2a3. System returns patient to previous page
- 2a4. Use case ends

**2b. Low bandwidth/connectivity issues**:
- 2b1. System loads text information first
- 2b2. System displays placeholder for images
- 2b3. System loads images progressively
- 2b4. Continue to step 3

**Extensions**:
- Patient can navigate back to search results
- Patient can proceed to select this doctor for booking (UC-04)
- Patient can view directions to doctor's location on map
- Patient can view Aarogyasri eligibility information if applicable

**Related Requirements**: REQ-3.2.2, REQ-3.2.4, REQ-6.1

---

### UC-04: Select Doctor and View Availability

**Primary Actor**: Patient

**Goal**: Select a doctor and view their available appointment slots

**Preconditions**:
- Patient has viewed doctor profile (UC-03)
- Doctor has availability in the system

**Postconditions**:
- Patient can see doctor's available appointment slots

**Main Success Scenario**:
1. Patient decides to book an appointment with the selected doctor
2. Patient clicks "Book Appointment" or similar action
3. System retrieves doctor's current availability
4. System displays available appointment slots in calendar or list view
5. System shows date and time options for appointments
6. Patient reviews available slots
7. Use case ends (continues to UC-05)

**Alternative Flows**:

**3a. No availability data can be retrieved**:
- 3a1. System displays error message
- 3a2. System suggests trying again later or contacting support
- 3a3. Use case ends

**4a. No appointments available**:
- 4a1. System displays "No appointments currently available" message
- 4a2. System suggests checking back later or selecting a different doctor
- 4a3. Use case ends

**Related Requirements**: REQ-3.3.1, REQ-3.3.2, REQ-3.3.3

---

### UC-05: Book Appointment with Aarogyasri Support

**Primary Actor**: Patient

**Goal**: Book an appointment with selected doctor at chosen date/time, with support for Aarogyasri and Indian payment methods

**Preconditions**:
- Patient has selected a doctor (UC-04)
- Available appointment slots are displayed
- Doctor has availability
- Patient has working Indian mobile number

**Postconditions**:
- Appointment is successfully booked in the system
- Appointment slot is marked as unavailable
- Patient receives booking confirmation via SMS (mandatory)

**Main Success Scenario**:
1. Patient selects a specific date and time slot
2. System displays booking form in patient's selected language (Telugu/English)
3. Patient enters required information:
   - Full name (in English and Telugu)
   - Contact number (Indian mobile format +91)
   - Email address (optional)
   - Age/Date of birth
   - Preferred language for communication (Telugu/English)
4. Patient optionally enters:
   - Aadhaar number (for identity verification)
   - Aarogyasri card number (if applicable)
   - Health insurance details
   - Reason for visit
   - Relevant medical history
5. If doctor accepts Aarogyasri and patient has card, system checks eligibility
6. System displays consultation fee in INR and payment options (if applicable)
7. Patient reviews booking details
8. Patient confirms the booking
9. System validates all required fields are complete
10. System validates Indian mobile number format
11. System checks the appointment slot is still available (REQ-3.4.3)
12. System creates the appointment record
13. System marks the slot as unavailable
14. System generates appointment confirmation with IST timezone
15. System displays success message with appointment details in selected language
16. Use case continues to UC-06

**Alternative Flows**:

**9a. Required fields are missing or invalid**:
- 9a1. System highlights missing/invalid fields
- 9a2. System displays validation error messages in selected language
- 9a3. Return to step 3

**10a. Invalid mobile number format**:
- 10a1. System displays error "Please enter valid Indian mobile number (+91)"
- 10a2. Return to step 3

**11a. Selected slot is no longer available**:
- 11a1. System displays "Slot no longer available" message in selected language
- 11a2. System refreshes available slots
- 11a3. Return to step 1 of UC-04

**12a. System error during booking**:
- 12a1. System displays error message in selected language
- 12a2. System logs the error for review
- 12a3. System suggests trying again or contacting support
- 12a4. Proceed to UC-08

**5a. Aarogyasri eligibility check fails**:
- 5a1. System displays message about eligibility issue
- 5a2. System allows patient to continue with regular booking
- 5a3. Continue to step 6

**Extensions**:
- Patient can switch language during form filling
- System provides validation feedback in real-time
- System stores data securely per Indian data protection laws (REQ-5.2.2)

**Related Requirements**: REQ-3.4.1, REQ-3.4.2, REQ-3.4.3, REQ-3.4.4, REQ-3.4.5, REQ-5.1.3, REQ-5.2.2, REQ-7.4

---

### UC-06: Receive Bilingual Appointment Confirmation

**Primary Actor**: Patient

**Goal**: Receive confirmation of booked appointment through multiple channels in Telugu and English

**Preconditions**:
- Appointment has been successfully booked (UC-05)
- Patient has provided valid Indian mobile number
- Patient may have provided email address (optional)

**Postconditions**:
- Patient has received on-screen confirmation
- SMS confirmation has been sent (mandatory)
- Email confirmation has been sent (if email provided)

**Main Success Scenario**:
1. System displays on-screen confirmation in patient's selected language with:
   - Appointment reference number
   - Doctor's name and specialty (in Telugu and English)
   - Appointment date and time (IST timezone)
   - Location/address with district and landmark information
   - Google Maps navigation link
   - Doctor's contact information
   - Estimated consultation fee in INR
   - Aarogyasri eligibility information (if applicable)
   - Any pre-appointment instructions
2. System sends SMS confirmation to patient's phone number in both Telugu and English (mandatory - REQ-3.5.4)
3. SMS includes appointment reference, doctor name, date, time, location
4. If email provided, system sends confirmation email
5. Email includes all appointment details and calendar attachment (.ics file)
6. Patient views on-screen confirmation
7. Patient receives SMS confirmation (critical for rural users)
8. Patient receives email confirmation (if email provided)
9. Use case ends

**Alternative Flows**:

**2a. SMS sending fails (critical failure)**:
- 2a1. System logs the error with high priority
- 2a2. System attempts immediate retry (up to 3 attempts)
- 2a3. System displays warning to patient on-screen
- 2a4. System notifies support team immediately
- 2a5. System provides option to resend SMS
- 2a6. If all retries fail, system suggests patient screenshot confirmation

**4a. Email sending fails**:
- 4a1. System logs the error
- 4a2. System attempts retry
- 4a3. If retry fails, system notifies support team
- 4a4. Continue to step 6 (not critical since SMS is mandatory)

**Extensions**:
- Patient can proceed to UC-07 to add appointment to calendar
- Patient can request SMS resend from confirmation screen
- Patient can share appointment details via WhatsApp
- System provides download option for appointment details

**Related Requirements**: REQ-3.5.1, REQ-3.5.2, REQ-3.5.3, REQ-3.5.4, REQ-4.5

---

### UC-07: Add Appointment to Calendar

**Primary Actor**: Patient

**Goal**: Add booked appointment to personal calendar application

**Preconditions**:
- Patient has received appointment confirmation (UC-06)
- On-screen confirmation is displayed

**Postconditions**:
- Appointment is added to patient's calendar application

**Main Success Scenario**:
1. Patient views appointment confirmation screen
2. Patient clicks "Add to Calendar" button
3. System generates .ics calendar file with appointment details
4. System prompts patient to download or open calendar file
5. Patient selects calendar application (Google Calendar, Apple Calendar, Outlook, etc.)
6. Calendar application opens with appointment details pre-filled
7. Patient confirms adding event to calendar
8. Appointment is added to patient's calendar
9. Use case ends

**Alternative Flows**:

**5a. Patient cancels calendar integration**:
- 5a1. System returns to confirmation screen
- 5a2. Use case ends

**6a. Calendar application not available**:
- 6a1. System downloads .ics file to patient's device
- 6a2. Patient can manually import later
- 6a3. Use case ends

**Related Requirements**: REQ-3.5.5

---

### UC-08: Handle Booking Error with Language Support

**Primary Actor**: Patient

**Goal**: Provide clear error information and recovery options when booking fails, considering varying digital literacy levels

**Preconditions**:
- Patient has attempted to book an appointment (UC-05)
- A system error or failure has occurred

**Postconditions**:
- Patient is informed of the error in their selected language
- Error is logged in the system with regional context
- Patient has options to retry or seek help

**Main Success Scenario**:
1. System encounters an error during booking process
2. System logs error details with timestamp, context, location, and connectivity status
3. System displays user-friendly error message in patient's selected language (Telugu/English) explaining:
   - What went wrong (in simple, non-technical terms)
   - Possible reasons (connectivity, slot taken, system issue)
   - Suggested next steps
4. System provides options with clear icons and text:
   - Retry the booking
   - Return to doctor search
   - Call support (with phone number displayed)
   - Get help via WhatsApp
5. Patient selects an option
6. System executes selected action
7. Use case ends

**Alternative Flows**:

**5a. Patient chooses to retry**:
- 5a1. System returns to booking form with previously entered data preserved
- 5a2. System checks connectivity before proceeding
- 5a3. Return to UC-05 step 5

**5b. Patient chooses to return to search**:
- 5b1. System navigates to search page
- 5b2. Return to UC-01

**5c. Patient chooses to contact support**:
- 5c1. System displays support contact information (phone number, WhatsApp)
- 5c2. System provides error reference number for support team
- 5c3. System offers "Click to Call" option
- 5c4. Use case ends

**3a. Connectivity error detected**:
- 3a1. System displays specific connectivity error message
- 3a2. System suggests checking internet connection
- 3a3. System offers offline support options
- 3a4. Continue to step 4

**Extensions**:
- Error messages use culturally appropriate, simple language suitable for users with varying literacy levels (REQ-4.1)
- System provides visual icons along with text for clarity
- Critical errors trigger immediate support notification

**Related Requirements**: REQ-5.3.3, REQ-4.4, REQ-4.5, REQ-4.6

---

### UC-09: Search with Voice Input (Telugu/English)

**Primary Actor**: Patient

**Goal**: Search for doctors using voice input in Telugu or English for accessibility

**Preconditions**:
- Patient has access to the application
- Device has microphone capability
- Patient has internet connectivity

**Postconditions**:
- Voice input is converted to text
- Doctor search is performed based on spoken symptoms

**Main Success Scenario**:
1. Patient navigates to search page
2. Patient selects language preference (Telugu or English)
3. Patient taps voice input icon
4. System activates microphone and displays "Listening..." indicator
5. Patient speaks symptoms in selected language
6. System converts speech to text using Telugu/English voice recognition
7. System displays transcribed text for patient confirmation
8. Patient confirms or edits the transcribed symptoms
9. System proceeds with symptom search (UC-01)
10. Use case ends

**Alternative Flows**:

**5a. Voice input not clear or cannot be recognized**:
- 5a1. System displays "Could not understand, please try again" message
- 5a2. System offers option to retry or use text input
- 5a3. Return to step 3 or switch to text input

**6a. Poor connectivity affects voice recognition**:
- 6a1. System displays connectivity issue message
- 6a2. System suggests trying text input instead
- 6a3. Use case ends or switches to text input

**8a. Patient wants to correct transcription**:
- 8a1. Patient edits the transcribed text manually
- 8a2. Continue to step 9

**Extensions**:
- Patient can switch between voice and text input at any time
- System provides visual and audio feedback during voice capture
- Works with regional Telugu accents and dialects

**Related Requirements**: REQ-4.7, REQ-4.1

---

### UC-10: Filter by Aarogyasri Empanelment

**Primary Actor**: Patient

**Goal**: Find doctors and hospitals that accept Aarogyasri health insurance scheme

**Preconditions**:
- Patient has performed a doctor search (UC-01)
- Patient has Aarogyasri card
- Search results are displayed

**Postconditions**:
- System displays only Aarogyasri-empaneled doctors and hospitals

**Main Success Scenario**:
1. Patient views search results
2. Patient selects "Aarogyasri Accepted" filter option
3. System filters results to show only Aarogyasri-empaneled providers
4. System displays filtered list with Aarogyasri logo/badge
5. Patient selects a doctor
6. Patient views doctor profile with Aarogyasri empanelment details
7. Use case ends

**Alternative Flows**:

**3a. No Aarogyasri-empaneled doctors found in area**:
- 3a1. System displays "No Aarogyasri doctors found in your area" message
- 3a2. System suggests expanding search to nearby districts
- 3a3. System shows nearest Aarogyasri-empaneled hospitals
- 3a4. Use case ends

**Extensions**:
- Patient can enter Aarogyasri card number to verify eligibility
- System shows which services are covered under Aarogyasri for selected doctor
- Patient can filter by government hospitals (which typically accept Aarogyasri)

**Related Requirements**: REQ-3.2.3, REQ-6.1, REQ-7.4

---

## Use Case Diagram

```
                                    Patient (AP Region)
                                           |
                        ___________________|___________________
                       |                   |                   |
                       |                   |                   |
                  [UC-01]             [UC-02]             [UC-03]
         Search Doctors (Telugu)  Browse/Filter      View Profile
         by Symptoms <--[UC-09]   by Location &      (Regional Details)
                      Voice Input  Language               |
                       |                |                  |
                       |________________|__________________|
                                        |
                                        v
                       [UC-10] <--- [UC-04] ---> Aarogyasri
                      Filter by    Select Doctor     System
                    Aarogyasri    View Availability
                                        |
                                        v
                                    [UC-05]
                              Book Appointment -----> [UC-08]
                           (Aarogyasri Support)   Handle Error
                                        |         (Language Support)
                                        v
                                    [UC-06]
                              Receive Bilingual
                              Confirmation (SMS)
                                        |
                                        v
                                    [UC-07]
                              Add to Calendar
```

---

## Use Case Dependencies

- **UC-02** depends on **UC-01** (requires search results)
- **UC-03** depends on **UC-01** or **UC-02** (requires doctor list)
- **UC-04** depends on **UC-03** (requires doctor selection)
- **UC-05** depends on **UC-04** (requires availability view)
- **UC-06** depends on **UC-05** (requires successful booking)
- **UC-07** depends on **UC-06** (requires confirmation)
- **UC-08** can be triggered from **UC-05** (booking errors)
- **UC-09** is an alternative input method for **UC-01** (voice search)
- **UC-10** is used in conjunction with **UC-02** or **UC-04** (Aarogyasri filtering)

---

## Traceability Matrix

| Use Case | Related Requirements |
|----------|---------------------|
| UC-01 | REQ-3.1.1, REQ-3.1.2, REQ-3.1.3, REQ-3.1.4, REQ-4.5, REQ-4.7, REQ-5.1.1, REQ-6.3, REQ-6.5 |
| UC-02 | REQ-3.2.1, REQ-3.2.2, REQ-3.2.3, REQ-6.6 |
| UC-03 | REQ-3.2.2, REQ-3.2.4, REQ-6.1 |
| UC-04 | REQ-3.3.1, REQ-3.3.2, REQ-3.3.3 |
| UC-05 | REQ-3.4.1, REQ-3.4.2, REQ-3.4.3, REQ-3.4.4, REQ-3.4.5, REQ-5.1.3, REQ-5.2.2, REQ-7.4 |
| UC-06 | REQ-3.5.1, REQ-3.5.2, REQ-3.5.3, REQ-3.5.4, REQ-4.5 |
| UC-07 | REQ-3.5.5 |
| UC-08 | REQ-5.3.3, REQ-4.4, REQ-4.5, REQ-4.6 |
| UC-09 | REQ-4.7, REQ-4.1 |
| UC-10 | REQ-3.2.3, REQ-6.1, REQ-7.4 |

---

## Notes

### General Considerations
- All use cases should gracefully handle intermittent internet connectivity (common in rural AP)
- Performance requirements (3-second search, 2-second confirmation) must be maintained across varying network conditions
- Security and privacy requirements apply to all use cases involving patient data
- System must comply with Indian healthcare regulations (Digital Personal Data Protection Act 2023, IT Act) throughout all workflows
- Mobile-first design is critical given high smartphone usage in Andhra Pradesh

### Language and Cultural Considerations
- All use cases support Telugu and English language interfaces
- Error messages and instructions use simple, non-technical language
- Cultural sensitivity maintained in health communications
- Visual icons supplement text for users with varying literacy levels

### Regional Specific Notes
- System must work across all 13 districts of Andhra Pradesh
- Distance calculations use kilometers (not miles)
- Currency displayed in INR (Indian Rupees)
- Time zone: IST (Indian Standard Time)
- SMS confirmations are mandatory due to high mobile penetration and lower email adoption in rural areas
- Aarogyasri integration is critical for serving economically disadvantaged populations

### Connectivity and Performance
- System optimized for 3G/4G networks common in rural areas
- Low-bandwidth mode available for areas with poor connectivity
- Progressive loading for images and non-critical content
- Offline capability for critical features (future enhancement)

### Payment and Insurance
- Support for popular Indian payment methods (UPI, Paytm, PhonePe, BHIM)
- Aarogyasri scheme integration for eligible patients
- Clear display of consultation fees in INR

---

## Regional Context for Andhra Pradesh

### Target User Profile
- **Urban Users**: Tech-savvy, good connectivity, prefer English or Telugu, use smartphones
- **Rural Users**: Varying digital literacy, intermittent connectivity, prefer Telugu, primarily mobile users
- **Age Range**: 18-70 years, with focus on accessibility for older adults

### Healthcare Infrastructure Coverage
- Government hospitals (District, Area, Teaching hospitals)
- Primary Health Centers (PHCs) and Community Health Centers (CHCs)
- Private hospitals and nursing homes
- Corporate healthcare chains (Apollo, KIMS, Yashoda, Medicover)
- Individual practitioners

### Common Use Scenarios
1. Patient in Visakhapatnam searching for cardiologist for chest pain
2. Rural patient in Anantapur district seeking government doctor accepting Aarogyasri
3. Telugu-speaking elderly patient using voice search for fever symptoms
4. Patient in Vijayawada filtering doctors by Telugu language preference
5. Patient checking Aarogyasri eligibility before booking expensive procedure

---

**Document Version**: 2.0 - Andhra Pradesh Edition
**Last Updated**: October 8, 2025
**Status**: Draft
**Target Region**: Andhra Pradesh, South India
