import nodemailer from "nodemailer";

function createTransport() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
}

export async function sendMail({ to, subject, html }) {
  const transport = createTransport();
  if (!transport) {
    console.log("Email skipped; SMTP credentials not configured:", subject);
    return;
  }
  await transport.sendMail({
    from: process.env.MAIL_FROM || "Arigya Hospital <no-reply@arigya.local>",
    to,
    subject,
    html
  });
}

export function notifyAppointmentCreated(appointment) {
  return Promise.allSettled([
    appointment.email
      ? sendMail({
          to: appointment.email,
          subject: "Arigya Hospital appointment request received",
          html: `<p>Dear ${appointment.name}, your ${appointment.department} appointment request has been received. We will confirm your slot shortly.</p>`
        })
      : Promise.resolve(),
    sendMail({
      to: process.env.ADMIN_EMAIL || "jeevankgowha@gmail.com",
      subject: "New appointment request",
      html: `<p>${appointment.name} requested ${appointment.department}. Phone: ${appointment.phone}</p>`
    })
  ]);
}

export function notifyLeadCreated(lead) {
  return sendMail({
    to: process.env.ADMIN_EMAIL || "jeevankgowha@gmail.com",
    subject: "New website inquiry",
    html: `<p>${lead.name} submitted an inquiry. Phone: ${lead.phone}. Message: ${lead.message}</p>`
  });
}

export function sendAppointmentReminder(appointment) {
  if (!appointment.email) return Promise.resolve();
  return sendMail({
    to: appointment.email,
    subject: "Arigya Hospital appointment reminder",
    html: `<p>Dear ${appointment.name}, this is a reminder for your ${appointment.department} appointment.</p>`
  });
}
