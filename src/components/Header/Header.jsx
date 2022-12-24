import { IonHeader, IonToolbar, IonGrid, IonRow, IonTitle, IonIcon, IonBackButton, IonButtons } from '@ionic/react';
import { call, chevronBack } from 'ionicons/icons';
import './Header.scss';



export const Header = ({backbutton}) => {
  return (
    <IonHeader>
      <IonToolbar color='secondary'>
        {backbutton && <IonButtons slot="start">
          <IonBackButton className="ion-no-padding" icon={chevronBack} defaultHref={`/`} ></IonBackButton>
        </IonButtons>}
        <IonGrid className='ion-no-margin ion-no-padding'>
          <IonRow className='heading app-name'>
            <IonTitle className='ion-text-uppercase '>
              <IonIcon icon={call}></IonIcon>
              Tring Book
            </IonTitle>
            <p className='font14'>Yours Handy ContactBook</p>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonHeader>

  );
};
