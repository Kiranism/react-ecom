import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import "../../components/footerLinks/Style.css";

const TermsConditions = () => {
  return (
    <div>
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
              Terms & Conditions
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "20px" }}
            >
              Please read the following terms and conditions very carefully as
              your use of service is subject to your acceptance of and
              compliance with the following terms and conditions ("Terms"). By
              subscribing to or using any of our services you agree that you
              have read, understood and are bound by the Terms, regardless of
              how you subscribe to or use the services. If you do not want to be
              bound by the Terms, you must not subscribe to or use our services.
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "15px" }}
            >
              YOUR USE OF THE WEBSITE IMPLIES THAT YOU AGREE WITH THE TERMS OF
              USE.
            </Typography>

            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ textAlign: "justify", marginTop: "15px" }}
            >
              Introduction
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify" }}
            >
              Capricorn 28 is a clothing brand under the firm HAMFARZ, owned by
              Farsana Shahbaz and Hamnath Shan. Capricorn 28 is a brand from
              India which was established in July 2022.
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              Capricorn 28 as a brand focuses on providing high quality
              handcrafted and handpicked attires which is all about comfortable
              and timeless fashion.
            </Typography>
            <ul
              style={{
                fontSize: "13px",
                color: "rgba(0, 0, 0, 0.6)",
                marginTop: "10px",
                textAlign: "justify",
              }}
            >
              <li>
                a) www.capricorn28.com ("Website") is an Internet based content
                and e-commerce portal licensed by HAMFARZ, a partnership firm
                incorporated under the laws of India.
              </li>
              <li>
                b) Use of the Website is offered to you conditioned on
                acceptance without modification of all the terms, conditions and
                notices contained in these Terms, as may be posted on the
                Website from time to time. The Website at its sole discretion
                reserves the right not to accept a User from registering on the
                Website without assigning any reason thereof.
              </li>
            </ul>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              User Account, Password, and Security Introduction
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify" }}
            >
              You will receive a password and account ID upon completing the
              Website's registration process. The Website requires you to
              register as a user by creating an Account in order to avail of the
              Services provided by the Website. You will be responsible for
              maintaining the confidentiality of the Account Information, and
              are fully responsible for all activities that occur under Your
              Account. You agree to (a) immediately notify Website of any
              unauthorized use of Your Account Information or any other breach
              of security, and (b) ensure that You exit from Your Account at the
              end of each session. Website cannot and will not be liable for any
              loss or damage arising from Your failure to comply with this
              Section. You may be held liable for losses incurred by Website or
              any other user of or visitor to the Website due to authorized or
              unauthorized use of Your Account as a result of Your failure in
              keeping Your Account Information secure and confidential.
            </Typography>

            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              Services provided
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify" }}
            >
              Website provides a number of Internet-based services (all such
              services, collectively, the "Service"). One such Online service
              which permits users to purchase by offering a huge range of Ethnic
              Indian wear. The Products can be purchased through the Website
              through various methods of payments offered. The purchase of
              Products shall be additionally governed by specific policies of
              sale, like cancellation policy, return policy, etc. (which are
              found on the following URL http://capricorn28.com / and all of
              which are incorporated here by reference. In addition, these terms
              and policies may be further supplemented by Product specific
              conditions, which may be displayed on the webpage of that Product.
            </Typography>

            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              Privacy Policy
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              The User hereby consents, expresses and agrees that he has read
              and fully understands the Privacy Policy (link for privacy policy)
              of www.capricorn28.com. The user further consents that the terms
              and contents of such Privacy Policy are acceptable to him. User
              Conduct and Rules You agree and undertake to use the Website and
              the Service only to post and upload messages and material that are
              proper. By way of example, and not as a limitation,you agree and
              undertake that when using a Service, you will not:
            </Typography>
            <ul
              style={{
                fontSize: "13px",
                color: "rgba(0, 0, 0, 0.6)",
                marginTop: "10px",
                textAlign: "justify",
              }}
            >
              <li>
                a) defame, abuse, harass, stalk, threaten or otherwise violate
                the legal rights of others;
              </li>
              <li>
                b) publish, post, upload, distribute or disseminate any
                inappropriate, profane, defamatory, infringing, obscene,
                indecent or unlawful topic, name, material or information;
              </li>
              <li>
                c) upload files that contain software or other material
                protected by intellectual property laws unless you own or
                control the rights thereto or have received all necessary
                consents;
              </li>
              <li>
                d) upload or distribute files that contain viruses, corrupted
                files, or any other similar software or programs that may damage
                the operation of the Website or another's computer;
              </li>
              <li>
                e) conduct or forward surveys, contests, pyramid schemes or
                chain letters;
              </li>
              <li>
                f) download any file posted by another user of a Service that
                you know, or reasonably should know, cannot be legally
                distributed in such manner;
              </li>
              <li>
                g) falsify or delete any author attributions, legal or other
                proper notices or proprietary designations or labels of the
                origin or source of software or other material contained in a
                file that is uploaded;
              </li>
              <li>
                h) violate any code of conduct or other guidelines, which may be
                applicable for or to any particular Service;
              </li>
              <li>
                i) violate any applicable laws or regulations for the time being
                in force in or outside India; and
              </li>
              <li>
                j) violate, abuse, unethically manipulate or exploit, any of the
                terms and conditions of this Agreement or any other terms and
                conditions for the use of the Website contained elsewhere.
              </li>
            </ul>

            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              Disclaimer Of Warranties & Liability
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              YOU EXPRESSLY UNDERSTAND AND AGREE THAT, TO THE MAXIMUM EXTENT
              PERMITTED BY APPLICABLE LAW: www.capricorn28.com (“Website”) has
              endeavoured to ensure that all the information is correct, but
              Website neither warrants nor makes any representations regarding
              the quality, accuracy or completeness of any data, information,
              product or Service. In no event shall Website be liable for any
              direct, indirect, punitive, incidental, special, consequential
              damages or any other damages resulting from:
            </Typography>
            <ul
              style={{
                fontSize: "13px",
                color: "rgba(0, 0, 0, 0.6)",
                marginTop: "10px",
                textAlign: "justify",
              }}
            >
              <li>
                a) the use or the inability to use the Services or Products
              </li>
              <li>
                b) unauthorized access to or alteration of the user's
                transmissions or data
              </li>
              <li>
                c) any other matter relating to the services; including, without
                limitation, damages for loss of use, data or profits, arising
                out of or in any way connected with the use or performance of
                the Website or Service. Neither shall Website be responsible for
                the delay or inability to use the Website or related services,
                the provision of or failure to provide Services, or for any
                information, software, products, services and related graphics
                obtained through the Website, or otherwise arising out of the
                use of the website, whether based on contract, tort, negligence,
                strict liability or otherwise. Further, Website shall not be
                held responsible for non-availability of the Website during
                periodic maintenance operations or any unplanned suspension of
                access to the website that may occur due to technical reasons or
                for any reason beyond Website’s control.
              </li>
            </ul>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              The user understands and agrees that any material and/or data
              downloaded or otherwise obtained through the Website is done
              entirely at their own discretion and risk and they will be solely
              responsible for any damage to their computer systems or loss of
              data thatresults from the download of such material and/or data.
            </Typography>

            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              Shipping
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              Title and risk of loss for all products ordered by you shall pass
              on to you upon Website’s shipment to the shipping carrier.
            </Typography>

            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              Termination
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              The Terms of Use will continue to apply until terminated by
              Website as set forth below. Website may suspend or terminate your
              use of the Website or any Service if it believes, in its sole and
              absolute discretion that you have breached, violated, abused, or
              unethically manipulated or exploited any term of these Terms or
              anyway otherwise acted unethically. If Website terminates your use
              of the Website or any Service , Website may delete any content or
              other materials relating to your use of the Service and Website
              will have no liability to you or any third party for doing so. You
              shall be liable to pay for any Service or product that you have
              already ordered till the time of Termination by either party
              whatsoever. Further, you shall be entitled to your royalty
              payments as per the User License Agreement that has or is legally
              deemed accrued to you.
            </Typography>

            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              Governing Law
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              These Terms of Use and all transactions entered into on or through
              the Website and the relationship between You and Website shall be
              governed in accordance with the laws of India without reference to
              conflict of laws principles. You agree that all claims,
              differences and disputes arising under or in connection with or in
              relation hereto the Website, the Terms of Use or any transactions
              entered into on or through the Website or the relationship between
              You and Website shall be subject to the exclusive jurisdiction of
              the courts at New Delhi, India andYou hereby accede to and accept
              the jurisdiction of such courts.
            </Typography>

            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              Report Abuse
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              <ul>
                <li>
                  In the event You come across any abuse or violation of these
                  Terms of Use or if You become aware of any objectionable
                  content on the Website, please report to supports numbers.
                </li>
                <li>
                  You hereby expressly agree to receive communications by way of
                  SMS, e-mails from Website relating to Services provided.
                </li>
                <li>
                  A User can unsubscribe/ opt-out from receiving communications
                  from the Website anytime via:
                </li>
                <li>
                  1. Newsletters sent periodically at the registered email
                  address, by clicking on the unsubscribe option attached at the
                  bottom of newsletter received through e-mail.
                </li>
              </ul>
            </Typography>

            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              Feedback and Information
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              Any feedback you provide to this Website shall be deemed to be
              non-confidential. Website shall be free to use such information on
              an unrestricted basis. Further, by submitting the feedback, You
              represent and warrant that (i) Your feedback does not contain
              confidential or proprietary information of You or of third
              parties; (ii) Website is not under any obligation of
              confidentiality, express or implied, with respect to the feedback;
              (iii) Website may have something similar to the feedback already
              under consideration or in development; and (iv) You are not
              entitled to any compensation or reimbursement of any kind from
              Website for the feedback under any circumstances.
            </Typography>
          </CardContent>
          {/* <CardActions>
      <Button size="small">Learn More</Button>
      </CardActions> */}
        </Card>
      </Container>
    </div>
  );
};

export default TermsConditions;
