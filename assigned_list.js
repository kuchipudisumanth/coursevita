                                                   document.addEventListener('DOMContentLoaded', function() {
                                                       const eventTitle = "Weekly Team Meeting";
                                                       const description = "Weekly meeting to discuss project progress and tasks. Don't forget to set monthly task reminders!";
                                                       const location = "https://meet.google.com/team-meeting";

                                                       // Calculate date range for one week (startDate and endDate)
                                                       const startDate = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15) + 'Z';  // e.g., 20240926T090000Z
                                                       const endDate = new Date(Date.now() + (60 * 60 * 1000)).toISOString().replace(/[-:.]/g, '').slice(0, 15) + 'Z';  // 1 hour later

                                                       // Format the Google Calendar link
                                                       const googleCalendarURL = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;

                                                       // Function to display the sample mail section with Google Calendar link
                                                       function displaySampleMail(team) {
                                                           sampleMailSection.style.display = 'block';
                                                           teamProgressContainer.innerHTML = '';

                                                           // Add Google Calendar link for the team
                                                           const calendarLink = document.createElement('p');
                                                           calendarLink.innerHTML = `<strong>Meeting Link:</strong> <a href="${googleCalendarURL}" target="_blank">Add to Calendar</a>`;
                                                           sampleMailSection.appendChild(calendarLink);

                                                           team.forEach(member => {
                                                               const progressDiv = document.createElement('div');
                                                               progressDiv.innerHTML = `
                                                                   <p>${member.name} - Progress: 
                                                                   <input type="range" class="progress-bar" min="0" max="100" value="0" data-member="${member.name}">
                                                                   <span class="progress-percent" id="percent-${member.name}">0%</span></p>
                                                               `;
                                                               teamProgressContainer.appendChild(progressDiv);
                                                           });

                                                           submitProgressButton.disabled = false;
                                                       }
                                                       const csvData = [
                                                           { id: '2100080001', name: 'John Doe', raw_skills: 'natural language, artificial intelligence, python', availability: 'Yes', email: 'john.doe@example.com' },
                                                           { id: '2100080002', name: 'Jane Smith', raw_skills: 'analyst, database, python', availability: 'Yes', email: 'jane.smith@example.com' },
                                                           { id: '2100080003', name: 'Samuel Adams', raw_skills: 'data analytics, sql, python', availability: 'Yes', email: 'samuel.adams@example.com' },
                                                           { id: '2100080004', name: 'Linda White', raw_skills: 'machine learning, python, tensorflow', availability: 'Yes', email: 'linda.white@example.com' },
                                                           { id: '2100080005', name: 'James Black', raw_skills: 'excel, management, python', availability: 'Yes', email: 'james.black@example.com' }
                                                           // ...additional members

                                                           
                                                       ];

                                                       const teamsContainer = document.getElementById('teamsContainer');
                                                       const submitTeamsButton = document.getElementById('submitTeams');
                                                       const sampleMailSection = document.getElementById('sampleMailSection');
                                                       const teamProgressContainer = document.getElementById('teamProgressContainer');
                                                       const submitProgressButton = document.getElementById('submitProgress');
                                                       const projectProgressSection = document.getElementById('projectProgressSection');
                                                       const projectProgress = document.getElementById('projectProgress');

                                                       const selectedTeams = {};

                                                       const teams = [];
                                                       let currentTeam = [];

                                                       csvData.forEach((member, index) => {
                                                           currentTeam.push(member);
                                                           if (currentTeam.length === 5 || index === csvData.length - 1) {
                                                               teams.push(currentTeam);
                                                               currentTeam = [];
                                                           }
                                                       });

                                                       teams.forEach((team, teamIndex) => {
                                                           const teamDiv = document.createElement('div');
                                                           teamDiv.classList.add('team');
                                                           teamDiv.innerHTML = `<h3>Team ${teamIndex + 1}</h3>`;
                                                           team.forEach(member => {
                                                               const memberDiv = document.createElement('div');
                                                               memberDiv.classList.add('member');
                                                               memberDiv.innerHTML = `
                                                                   <input type="checkbox" class="member-checkbox" data-team="${teamIndex}" data-member="${member.name}" data-email="${member.email}">
                                                                   <p><strong>ID:</strong> ${member.id}</p>
                                                                   <p><strong>Name:</strong> ${member.name}</p>
                                                                   <p><strong>Skills:</strong> ${member.raw_skills}</p>
                                                               `;
                                                               teamDiv.appendChild(memberDiv);
                                                           });
                                                           teamsContainer.appendChild(teamDiv);
                                                       });

                                                       document.querySelectorAll('.member-checkbox').forEach(checkbox => {
                                                           checkbox.addEventListener('change', function() {
                                                               const teamIndex = this.getAttribute('data-team');
                                                               const memberName = this.getAttribute('data-member');
                                                               const memberEmail = this.getAttribute('data-email');

                                                               if (!selectedTeams[teamIndex]) {
                                                                   selectedTeams[teamIndex] = [];
                                                               }

                                                               if (this.checked) {
                                                                   if (selectedTeams[teamIndex].length < 5) {
                                                                       selectedTeams[teamIndex].push({ name: memberName, email: memberEmail });
                                                                   } else {
                                                                       alert("You can only select 5 members per team.");
                                                                       this.checked = false;
                                                                   }
                                                               } else {
                                                                   selectedTeams[teamIndex] = selectedTeams[teamIndex].filter(member => member.name !== memberName);
                                                               }

                                                               if (selectedTeams[teamIndex].length === 5) {
                                                                   document.querySelectorAll(`.member-checkbox[data-team="${teamIndex}"]`).forEach(box => {
                                                                       if (!box.checked) {
                                                                           box.disabled = true;
                                                                       }
                                                                   });
                                                               } else {
                                                                   document.querySelectorAll(`.member-checkbox[data-team="${teamIndex}"]`).forEach(box => {
                                                                       box.disabled = false;
                                                                   });
                                                               }

                                                               submitTeamsButton.disabled = !Object.values(selectedTeams).some(team => team.length === 5);
                                                           });
                                                       });

                                                       submitTeamsButton.addEventListener('click', function() {
                                                           Object.keys(selectedTeams).forEach(teamIndex => {
                                                               const team = selectedTeams[teamIndex];
                                                               if (team.length === 5) {
                                                                   displaySampleMail(team);
                                                               }
                                                           });
                                                           alert("Emails sent successfully!");
                                                       });

                                                       function displaySampleMail(team) {
                                                           sampleMailSection.style.display = 'block';
                                                           teamProgressContainer.innerHTML = '';

                                                           team.forEach(member => {
                                                               const progressDiv = document.createElement('div');
                                                               progressDiv.innerHTML = `
                                                                   <p>${member.name} - Progress: 
                                                                   <input type="range" class="progress-bar" min="0" max="100" value="0" data-member="${member.name}">
                                                                   <span class="progress-percent" id="percent-${member.name}">0%</span></p>
                                                               `;
                                                               teamProgressContainer.appendChild(progressDiv);
                                                           });

                                                           submitProgressButton.disabled = false;
                                                       }

                                                       submitProgressButton.addEventListener('click', function() {
                                                           let totalProgress = 0;
                                                           let teamMembers = 0;

                                                           document.querySelectorAll('.progress-bar').forEach(bar => {
                                                               const progress = parseInt(bar.value, 10);
                                                               totalProgress += progress;
                                                               teamMembers++;
                                                           });

                                                           const overallProgress = totalProgress / teamMembers;
                                                           projectProgressSection.style.display = 'block';
                                                           projectProgress.textContent = `Project is ${overallProgress}% complete.`;
                                                       });

                                                       document.querySelectorAll('.progress-bar').forEach(bar => {
                                                           bar.addEventListener('input', function() {
                                                               const member = this.getAttribute('data-member');
                                                               const percentDisplay = document.getElementById(`percent-${member}`);
                                                               percentDisplay.textContent = `${this.value}%`;
                                                           });
                                                       });
                                                   });
                                                       