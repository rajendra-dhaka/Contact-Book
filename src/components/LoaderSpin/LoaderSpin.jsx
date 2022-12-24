import { IonSpinner } from "@ionic/react";
import './LoaderSpin.scss'
import React from "react";

export const LoaderSpin = () => {
  return (
    <div className='loader-spin'>
      <IonSpinner name='crescent' color='secondary'></IonSpinner>
    </div>
  );
};


