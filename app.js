angular.module('patientApp', []).controller('PatientController', function($scope) {
  $scope.search = {};
  $scope.activeTab = 'today';
  $scope.filteredResults = [];

  $scope.patients = [
    { name: 'Ashley Citarella', dob: '07-02-1958', sex: 'Female', residence: 'Boston, MA', mrn: 'YTK12345678', id: 'NHL12345678', ssn: '0000', phone: '(000)-000-0000', email: 'ashcitarella@gmail.com', hospital: 'Massachusetts Medical Group', department: 'Department of Cardiology', physician: 'Dr. Beth Smith', conditions: 'COPD, CHF, Diabetes (Type II)', nextAppointment: '2025-07-18T09:00:00' },
    { name: 'Albert Johnson', dob: '01-15-1952', sex: 'Male', residence: 'Waltham, MA', mrn: 'YTK12345675', id: 'NHL12345678', ssn: '1111', phone: '(111)-111-1111', email: 'aljohnson1952@email.com', hospital: 'Massachusetts Medical Group', department: 'Department of Cardiology', physician: 'Dr. Beth Smith', conditions: 'CHF', nextAppointment: '2025-07-18T22:00:00' },
    { name: 'Leslie Isabelle Wang', dob: '03-12-1958', sex: 'Female', residence: 'Mooselookmeguntic, ME', mrn: 'YTK12345675', id: 'NHL12345678', ssn: '2222', phone: '(222)-222-2222', email: 'leslie.isabelle.wang@email.com', hospital: 'Massachusetts Medical Group', department: 'Department of Cardiology', physician: 'Dr. Beth Smith', conditions: 'CHF', nextAppointment: '2025-07-18T23:00:00' },
    { name: 'Adela Basic', dob: '03-12-1950', sex: 'Female', residence: 'Boston, MA', mrn: 'YTK12345675', id: 'NHL12345678', ssn: '3333', phone: '(333)-333-3333', email: 'adelabasic50@gmail.com', hospital: 'Massachusetts Medical Group', department: 'Department of Cardiology', physician: 'Dr. Beth Smith', conditions: 'CHF', nextAppointment: '2025-07-18T13:30:00' },
    { name: 'Reza Saatchi', dob: '03-12-1957', sex: 'Male', residence: 'Boston, MA', mrn: 'YTK12345675', id: 'NHL12345678', ssn: '4444', phone: '(444)-444-4444', email: 'reza.saatchi@email.com', hospital: 'Massachusetts Medical Group', department: 'Department of Cardiology', physician: 'Dr. Beth Smith', conditions: 'CHF', nextAppointment: '2025-07-18T14:30:00' },
    { name: 'Arjun Chandrasekar', dob: '03-12-1958', sex: 'Male', residence: 'New York City, NY', mrn: 'YTK12345675', id: 'NHL12345678', ssn: '5555', phone: '(555)-555-5555', email: 'arjunchandra@gmail.com', hospital: 'Massachusetts Medical Group', department: 'Department of Cardiology', physician: 'Dr. Beth Smith', conditions: 'CHF', nextAppointment: '2025-07-18T15:30:00' }
  ];

  $scope.performSearch = function() {
    $scope.filteredResults = $scope.patients.filter(function(p) {
      const s = $scope.search;
      const includes = (field, value) => !value || (field && field.toLowerCase().includes(value.toLowerCase()));
      const dateMatch = (field, value) => {
      if (!value) return true;
      const parsedField = new Date(field);
      const parsedValue = new Date(value);
      return parsedField.toDateString() === parsedValue.toDateString();
};
      const inAppointmentRange = () => {
        if (!s.appointmentStart && !s.appointmentEnd) return true;
        const apptTime = new Date(p.nextAppointment).getTime();
        const start = s.appointmentStart ? new Date(s.appointmentStart).getTime() : -Infinity;
        const end = s.appointmentEnd ? new Date(s.appointmentEnd).getTime() + 86400000 : Infinity;
        return apptTime >= start && apptTime <= end;
      };
      return (
        includes(p.name, s.firstName) &&
        includes(p.name, s.lastName) &&
        dateMatch(p.dob, s.dob) &&
        inAppointmentRange()
      );
    });
    $scope.activeTab = 'search';
  };

  $scope.isToday = function(p) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayISO = `${yyyy}-${mm}-${dd}`;
    return p.nextAppointment.startsWith(todayISO);
  };

 $scope.formatNextAppointment = function(p) {
  const appointmentDate = new Date(p.nextAppointment);

  const today = new Date();
  const isToday =
    appointmentDate.getFullYear() === today.getFullYear() &&
    appointmentDate.getMonth() === today.getMonth() &&
    appointmentDate.getDate() === today.getDate();

  const options = { hour: 'numeric', minute: 'numeric', hour12: true };

  if (isToday) {
    return "Today " + appointmentDate.toLocaleTimeString('en-US', options);
  } else {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[appointmentDate.getMonth()];
    const day = appointmentDate.getDate();
    const year = appointmentDate.getFullYear();
    let hours = appointmentDate.getHours();
    const minutes = appointmentDate.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    return `${month} ${day}, ${year} ${hours}:${minutes} ${ampm}`;
  }};
});
