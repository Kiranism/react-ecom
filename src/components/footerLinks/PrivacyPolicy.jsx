import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import "../../components/footerLinks/Style.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy">
      <Container maxWidth="xl" sx={{ padding: "20px" }}>
        <Card sx={{ background: "#FFF0ED" }}>
          <CardContent>
            <Typography
              variant="h4"
              textAlign={"center"}
              fontWeight="bold"
              sx={{
                fontSize: { xs: "25px", md: "40px" },
                margin: "5px",
              }}
            // sx={{ display: "flex", justifyContent: "center" }}
            >
              Privacy Policy
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "20px" }}
            >
              We take privacy and security concerns seriously. At the same time,
              we would like to give you the best possible experience when
              visiting our websites. Please read the following policy to
              understand how your personal information will be treated as you
              make full use of our Site. If you visit us at
              https://www.capricorn28.com (Website) you accept these terms and
              conditions:
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              1) Your Privacy
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              We are extremely proud of our commitment to protect your privacy.
              We value the trust you place on us. We will work hard to earn your
              confidence so that you can enthusiastically use our services.
              Protecting your privacy is very important to us. We have
              accordingly developed this Privacy Policy to protect your personal
              information and keep it confidential. We endeavor to comply with
              laws of other countries but cannot and do not warrant that we do.
              We do everything we reasonably can to protect your rights of
              privacy on systems and the Website controlled by us, but we are
              not liable for any unauthorized or unlawful disclosures of your
              personal and confidential information made by third parties who
              are not subject to our control, for example advertisers and
              websites that have links to our Website. You should take note that
              the information and privacy practices of our business partners,
              advertisers, sponsors or other sites to which we provide
              hyperlinks, may be different from ours. Our privacy policy is
              subject to change at any time without notice. To make sure you are
              aware of any changes, please review this policy periodically.
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              2) Privacy Assurance
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              We will not share or rent your information with third parties
              except our agents and alliance partners. We use personal
              information to provide the services you request. Any third party
              with whom we share the information shall maintain reasonable level
              of confidentiality and data security as required under law.
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              3) Electronic Communication
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              When you visit our site or send e-mails to us or give us your
              feedback, you are communicating with us electronically. You
              consent to receive communications from us electronically. You
              agree that all agreements, notices, disclosures and other
              communications that we provide to you electronically satisfy any
              legal requirement that such communications be in writing.
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              4) Payment and Account Information
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              Your account history with us including all billing information and
              communications, payment history etc. We maintain this in encrypted
              form on secure servers.
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              5) Transactional Information
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              Transactional history (other than banking details) about your
              e-commerce activities.
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              6) Service Usage
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              Information about your navigation using our Services, for example
              the URLs of websites, which you visit and from which you shop.
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              7) Deletion
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              We will process and store your personal data for as long as it is
              necessary and permitted under applicable data protection law.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default PrivacyPolicy;
