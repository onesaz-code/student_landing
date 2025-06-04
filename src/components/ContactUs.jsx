import React from "react";
import { Container, Typography } from "@mui/material";

const ContactUs = () => (
  <Container sx={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
    <Typography variant="h4" fontWeight="bold" gutterBottom>Contact Us</Typography>
    <Typography variant="body1" paragraph>
      We’d love to hear from you. Whether you're an institution looking for a complete digital solution or an educator looking to simplify your workflow—we’re here to help.
    </Typography>
    <Typography variant="body1" paragraph>
      <strong>Corporate Office:</strong><br />
      Suvarna Habitat, Jai Hind Gandhi Rd, Cyber Hills Colony,<br />
      VIP Hills, Jaihind Enclave, Madhapur,<br />
      Hyderabad, Telangana 500081
    </Typography>
    <Typography variant="body1" paragraph>
      <strong>Email:</strong> support@onesaz.com
    </Typography>
    <Typography variant="body1" paragraph>
      Our team is available Monday to Saturday, 9:00 AM – 6:00 PM IST.
    </Typography>
    <Typography variant="body1" paragraph>
      <strong>Other Ways to Reach Us:</strong>
    </Typography>
    <Typography variant="body1" paragraph>
      1. <strong>Support Portal:</strong> Submit tickets via our online support portal for faster resolution.
    </Typography>
    <Typography variant="body1" paragraph>
      2. <strong>Live Chat:</strong> Chat with our support team during business hours on our website.
    </Typography>
    <Typography variant="body1" paragraph>
      3. <strong>Social Media:</strong> Connect with us on LinkedIn, Twitter, and Facebook for updates and support.
    </Typography>
    <Typography variant="body1" paragraph>
      4. <strong>Feedback:</strong> Share your feedback or suggestions to help us improve.
    </Typography>
    <Typography variant="body1" paragraph>
      5. <strong>Partnerships:</strong> For business or partnership inquiries, email support@onesaz.com.
    </Typography>
    <Typography variant="body1" paragraph>
      6. <strong>Media:</strong> For press or media queries, contact support@onesaz.com.
    </Typography>
    <Typography variant="body1" paragraph>
      7. <strong>Careers:</strong> Interested in joining our team? Email support@onesaz.com.
    </Typography>
    <Typography variant="body1" paragraph>
      8. <strong>Workshops & Training:</strong> Request training or workshops for your institution.
    </Typography>
    <Typography variant="body1" paragraph>
      9. <strong>Emergency Support:</strong> For urgent issues, mark your email as 'URGENT' in the subject line.
    </Typography>
    <Typography variant="body1" paragraph>
      10. <strong>Location Map:</strong> Visit our website for a map and directions to our office.
    </Typography>
  </Container>
);

export default ContactUs;