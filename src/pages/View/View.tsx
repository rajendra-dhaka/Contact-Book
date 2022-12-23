import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonPage,
  IonRow,
  IonText,
} from '@ionic/react';
import { businessOutline, callOutline, logoWhatsapp, mailOutline, phonePortraitOutline } from 'ionicons/icons';
import React from 'react';
import { useParams } from 'react-router';
import { Header } from '../../components';


const View: React.FC = () => {
  const { id }: any = useParams();
  console.log(id,'id h ye')

  return (
    <IonPage>
      <Header backbutton={true} />
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCard>
                , <IonItem className='ion-margin-top font16'>
                  <IonAvatar className='ion-margin'>
                    <img
                      alt="Silhouette of a person's head"
                      src='https://ionicframework.com/docs/img/demos/avatar.svg'
                    />
                  </IonAvatar>
                  <IonCardHeader >Rajendra Dhaka</IonCardHeader>
                </IonItem>
                <IonCardContent>
                  <IonItem>
                    <IonText> <IonIcon icon={callOutline} className='ion-margin-end'></IonIcon> 123456789</IonText>
                  </IonItem>
                  <IonItem>
                    <IonText><IonIcon icon={mailOutline} className='ion-margin-end'></IonIcon> raju@gmail.com</IonText>
                  </IonItem>
                  <IonItem>
                    <IonText><IonIcon icon={businessOutline} className='ion-margin-end'></IonIcon> Office</IonText>
                  </IonItem>
                  <IonItem>
                    <IonText><IonIcon icon={logoWhatsapp} className='ion-margin-end'></IonIcon> Yes</IonText>
                 </IonItem>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default View;
