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
import { businessOutline, callOutline, logoWhatsapp, mailOutline } from 'ionicons/icons';
import React from 'react';
import { useParams } from 'react-router';
import { Header } from '../../components';
import { useContactData } from '../../Context/DataContext';

const View = () => {
  const { contactData } = useContactData();
  const { id } = useParams();
  const filteredContactData = contactData.filter((data) => {
    return data.id === id;
  });

  return (
    <IonPage>
      <Header backbutton={true} />
      {filteredContactData[0] ? (
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonCard>
                  <IonItem className='ion-margin-top font16'>
                    <IonAvatar className='ion-margin'>
                      <img alt='person' src={filteredContactData[0].img} />
                    </IonAvatar>
                    <IonCardHeader>{filteredContactData[0].name}</IonCardHeader>
                  </IonItem>
                  <IonCardContent>
                    <IonItem>
                      <IonText>
                        <IonIcon icon={callOutline} className='ion-margin-end'></IonIcon> {filteredContactData[0].phone}
                      </IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>
                        <IonIcon icon={mailOutline} className='ion-margin-end'></IonIcon> {filteredContactData[0].email}
                      </IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>
                        <IonIcon icon={businessOutline} className='ion-margin-end'></IonIcon>{' '}
                        {filteredContactData[0].type}
                      </IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>
                        <IonIcon icon={logoWhatsapp} className='ion-margin-end'></IonIcon>{' '}
                        {filteredContactData[0].whatsapp}
                      </IonText>
                    </IonItem>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      ) : (
        <p>Page Not Found</p>
      )}
    </IonPage>
  );
};

export default View;
