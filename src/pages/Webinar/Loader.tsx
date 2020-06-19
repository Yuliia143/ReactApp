import React from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import styles from "./Webinar.module.css";

export default function () {
  return (
    <Segment id={styles.loader}>
      <Dimmer active inverted>
        <Loader size="large">Loading...</Loader>
      </Dimmer>
    </Segment>
  );
}
