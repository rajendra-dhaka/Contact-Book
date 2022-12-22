import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonIcon, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import { imageOutline, personCircleOutline } from 'ionicons/icons';
import './Form.scss';

interface ContainerProps {  }

export const Form: React.FC<ContainerProps> = () => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle className="ion-text-center ion-margin-top">
          <div>Add User </div><IonIcon icon={personCircleOutline}></IonIcon>
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonItem>
          <IonLabel position="floating" className='ion-capitalize'>Name</IonLabel>
          <IonInput clearInput={true} required={true}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating" className='ion-capitalize'>Phone</IonLabel>
          <IonInput clearInput={true} type='tel' required={true}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating" className='ion-capitalize'>Email</IonLabel>
          <IonInput clearInput={true} type='email'></IonInput>
        </IonItem>
        <IonItem>
          <IonSelect interface="popover" placeholder="Select Type">
            <IonSelectOption value="apples">Office</IonSelectOption>
            <IonSelectOption value="oranges">Home</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonCheckbox slot="end"></IonCheckbox>
          <IonLabel>Whatsapp</IonLabel>
        </IonItem>
        <IonItem>
          <IonIcon icon={imageOutline}></IonIcon>
          <span className='ion-margin-start'> <input type="file" name="" id="" accept="image/*" /></span>
        </IonItem>

        <div className='ion-margin-top ion-text-center'>
          <IonButton color='primary'>Submit</IonButton>
        </div>
   
      </IonCardContent>
    </IonCard>

  );
};
