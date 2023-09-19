import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { fontSize } from "@mui/system";
import "../../components/footerLinks/Style.css";
const RefundPolicy = () => {
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
              Returns & Exchages
            </Typography>
            <Typography
              gutterBottom
              variant="h7"
              component="div"
              sx={{ textAlign: "justify", marginTop: "20px" }}
            >
              THE CAPRICORN 28 PROMISE
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "20px" }}
            >
              All products from Capricorn 28 are either handpicked from select
              manufacturers, or are handcrafted by our skilled tailors and craft
              persons. There could be slight variations within a certain product
              range itself, but only within our acceptable levels of quality. An
              irregular weave / print or / stitch on our handcrafted
              productsshould not be taken as a defect as these products are not
              mass manufactured.
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              We at Capricorn 28 will always stand by the words we promise to
              you in terms of the quality of our products. We allow return /
              exchange (for eligible products) if you are not satisfied with
              your purchase for any valid reason.
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              The return & exchange policies mentioned below are applicable only
              on the Purchases made online through our official website
              (capricorn28.com) or any of our official social channels. We
              accept return / exchange of item(s) purchased at full price
              (non-discounted / Non-SALE) within 30 days of delivery, excluding
              certain not exchangeable /non-returnable products.
            </Typography>

            <Typography
              gutterBottom
              variant="h7"
              component="div"
              sx={{ marginTop: "10px" }}
            >
              CONDITIONS FOR RETURN / EXCHANGE CLAIMS
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
                • If the product you received is physically damaged during
                delivery, please ensure that the same is reported at the
                earliest. For all such cases, you will have to inform Capricorn
                28 about the damage within 2 days of the product delivery.
                Capricorn 28 may request for proof of damage, such as an uncut
                unboxing video. Upon successful verification, Capricorn 28 shall
                take necessary steps to resolve the issue by providing an
                exchange / refund. Capricorn 28 will not take the case into
                consideration if the customer fails to produce the requested
                proof.
              </li>
              <li>
                • The customer will have to retain an original copy of our
                invoice for verification purposes, and to process returns /
                refunds.
              </li>
              <li>
                • If the product is found to have a manufacturing defect, you
                are expected to contact Capricorn 28 within 30 days of delivery.
                Upon successful verification of the defect, the product will be
                processed for return / refund. We will be unable to entertain
                any returns / refunds post 30 days of delivery.
              </li>
              <li>
                • The product(s) will be considered for return / refund only if
                it has not been worn, washed, altered, or damaged and is
                returned in a saleable condition with barcode and MRP Tags
                intact. Capricorn 28 reserves the right to decide whether the
                product(s) seems worn, washed, altered, or has post-purchase
                damage.
              </li>
            </ul>

            <Typography
              gutterBottom
              variant="h7"
              component="div"
              sx={{ marginTop: "10px" }}
            >
              RETURN SHIPMENT POLICY
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
                • The customer will be expected to safely ship the product using
                proper packaging. You may always contact us for any
                clarifications regarding product packaging for return shipment.
                Please ensure that all the returned product(s) are packed
                securely and safely to prevent any loss or damage during
                transit.
              </li>
              <li>
                • Capricorn 28 will cover shipping costs (back and forth) for
                legit claims, if the claim has been filed within 30 days of
                receiving the product.
              </li>
            </ul>

            <Typography
              gutterBottom
              variant="h7"
              component="div"
              sx={{ marginTop: "10px" }}
            >
              REFUND POLICY
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
                • The customer will have to return the product as per our return
                shipping guidelines to be eligible for a refund.
              </li>
              <li>
                • For all online transactions, we will provide a refund into the
                original mode of Payment.
              </li>
              <li>
                • In the case of refunds, banks normally take 4-5 business days
                to process a refund once it has been successfully initiated from
                our end.
              </li>
              <li>
                • Refunds will not be applicable if the product shipped by the
                customer is lost in transit.
              </li>
            </ul>
          </CardContent>
          {/* <CardActions>
    <Button size="small">Learn More</Button>
    </CardActions> */}
        </Card>
      </Container>
    </div>
  );
};

export default RefundPolicy;
