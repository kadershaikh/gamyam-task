import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import styles from "./CardWithCarousel.module.css";
import CarouselItem from "../CarouselItem/CarouselItem";
import VerifiedIcon from "@mui/icons-material/Verified";
import Grid from "@mui/material/Grid";

const CardWithCarousel = ({ land }) => {
  console.log(land, "land");

  let landSize = land.total_land_size_in_acres.acres
    ? `${land.total_land_size_in_acres.acres} acres`
    : `${land.total_land_size_in_acres.guntas} guntas`;

  const convertToCroresOrLakhs = () => {
    const total =
      land.price_per_acre_crore.crore + land.price_per_acre_crore.lakh / 100;
    if (total >= 1) {
      return `${total} Crores`;
    } else {
      return `${land.price_per_acre_crore.lakh} Lakhs`;
    }
  };

  return (
    <Card className={styles.card}>
      <Carousel
        autoPlay={false}
        navButtonsAlwaysVisible={true}
        height={200}
        animation="slide"
        indicators={false}
      >
        {land.land_media.map((item, i) => (
          <CarouselItem key={i} item={item} />
        ))}
      </Carousel>
      <CardContent>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography gutterBottom variant="h6">
              <strong>
                {land.mandal_name}, {land.district_name}
              </strong>
            </Typography>
          </Grid>
          <Grid item>
            <VerifiedIcon style={{ color: "dodgerblue" }} height={10} />
          </Grid>
        </Grid>
        <Typography variant="body2" component="p">
          <strong> {landSize} </strong> | ₹ {convertToCroresOrLakhs()} per acre
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardWithCarousel;
