const departmentSignals = [
  ["chest pain breath heart bp", "Cardiology"],
  ["headache seizure stroke weakness migraine", "Neurology"],
  ["bone joint knee fracture back pain", "Orthopedics"],
  ["child baby fever vaccination", "Pediatrics"],
  ["pregnancy periods women gynecology", "Gynecology"],
  ["fever cough diabetes thyroid general", "General Medicine"],
  ["accident bleeding unconscious severe emergency", "Emergency Care"]
];

export function recommendDepartment(message = "") {
  const text = message.toLowerCase();
  const match = departmentSignals.find(([signals]) => signals.split(" ").some((word) => text.includes(word)));
  return match ? match[1] : "General Medicine";
}

export function answerPatientQuestion(message = "") {
  const department = recommendDepartment(message);
  const urgent = /chest pain|unconscious|severe bleeding|stroke|breathing|accident/i.test(message);
  if (urgent) {
    return `This may need urgent care. Please call Arigya Hospital emergency at +91 8088929007 immediately. Suggested department: ${department}.`;
  }
  return `Based on your question, ${department} is a good starting point. You can book an appointment online or call +91 8088929007. This assistant is informational and not a medical diagnosis.`;
}
