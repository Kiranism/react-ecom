import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../../components/footerLinks/Style.css";
import axios from "axios";

const ShippingPolicy = () => {
  const [threshold, setThreshold] = React.useState();
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/settings/user/delivery`)
      .then((response) => {
        setThreshold(response.data.data.freeDeliveyThreshold);
      });
  }, []);

  function createData(name, charge) {
    return { name, charge };
  }

  const rows = [
    createData(
      `Below RS.${threshold}`,
      "Charges with respect to our delivery partner"
    ),
    createData(`RS.${threshold} and above`, "Free"),
  ];
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
              Shipping Policy
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "20px" }}
            >
              Capricorn28.com utilizes the services of reputed courier service
              providers for offering shipping in India. We strive to ensure
              timely delivery of Domestic orders within India in 4-5 Business
              Days* to most of the cities
            </Typography>
            <Typography
              gutterBottom
              variant="h7"
              component="div"
              sx={{ marginTop: "10px" }}
            >
              Processing Your Order
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify" }}
            >
              We try our best to ship goods to you as soon as possible. On an
              average, it takes us about 48 hours to ship goods out of our
              warehouses across India. However, if the quantities ordered are
              more than 5 pieces per product per style, it may take longer to
              process your order. Should this happen, we will keep you informed
              by email.
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              To calculate the time to receive your Capricorn 28 merchandise,
              please check delivery time for your pin code using “CHECK
              DELIVERY” option in the product details page.
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              For most of the locations we offer delivery within 4-5 Business
              days*. Add the shipping times to the 48-hour order processing
              period. Items are only delivered on business days. Apart from
              Sundays, there are certain holidays throughout the year that are
              notconsidered as business days. Deliveries will not happen during
              these days.
            </Typography>

            <Typography
              gutterBottom
              variant="h7"
              component="div"
              sx={{ marginTop: "10px" }}
            >
              Shipping
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              Get information on delivery schedules and shipping charges.
            </Typography>

            <Typography
              gutterBottom
              variant="h7"
              component="div"
              sx={{ marginTop: "10px" }}
            >
              Delivery Charges
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              Your delivery charges will be displayed during the checkout
              process.
            </Typography>

            <TableContainer
              component={Paper}
              sx={{ marginTop: "10px", background: "#FFF0ED" }}
            >
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Order Value</TableCell>
                    <TableCell align="right">Shipping Charges</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.charge}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Typography
              gutterBottom
              variant="h7"
              component="div"
              sx={{ marginTop: "10px" }}
            >
              Popular Questions
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              Get answers to our most frequently asked questions.
            </Typography>
            <Typography
              gutterBottom
              variant="h7"
              component="div"
              sx={{ marginTop: "10px" }}
            >
              I placed an order today. When can I expect my shipment?
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              Your delivery schedule will depend on the product, and the time
              when you placed your order. Go to the Orders section under “My
              Account” or click on the Order Number in your Order Confirmation
              email to check the status of your delivery.
            </Typography>
            <Typography
              gutterBottom
              variant="h7"
              component="div"
              sx={{ marginTop: "10px" }}
            >
              What if I miss a delivery?
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              If you are unavailable when our courier partner arrives with your
              merchandise, they will make two more delivery attempts. If you're
              still unavailable after the third attempt, your order will be
              returned to us. Call us on +91 7592020805 within one working day
              of the third attempt and we will schedule another delivery date
              and time that suits you better.
            </Typography>
            <Typography
              gutterBottom
              variant="h7"
              component="div"
              sx={{ marginTop: "10px" }}
            >
              Will I be charged for delivery?
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              {`Delivery is free on orders of RS.${threshold} and above. If your total
              order is less than RS.${threshold}, standard delivery charges (based on
              our delivery partner) will be applicable. Your delivery charges
              will be displayed during the checkout process.`}
            </Typography>
            <Typography
              gutterBottom
              variant="h7"
              component="div"
              sx={{ marginTop: "10px" }}
            >
              How do I track my order via My Account?
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              <ul>
                <li>1. Sign in to your capricorn28.com account.</li>
                <li>2. Click 'My Account'.</li>
                <li>3. Select 'Order History'.</li>
                <li>
                  4. In the orders page, select 'View Details' for the order
                  number you wish to track.
                </li>
                <li>5. Click on 'Courier Tracking #'.</li>
              </ul>
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

export default ShippingPolicy;
