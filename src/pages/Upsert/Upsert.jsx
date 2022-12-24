import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import React from "react";
import { Form, Header } from "../../components";


const Upsert = () => {
  return <IonPage>
    <Header backbutton={true} />
    <IonContent>
      <IonGrid>
        <IonRow>
          <IonCol>
            <Form />
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  </IonPage>
};

export default Upsert;
