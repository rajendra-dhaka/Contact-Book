import { IonIcon, IonAccordion, IonAccordionGroup, IonAvatar, IonItem, IonLabel } from '@ionic/react';
import { createOutline, eyeOutline, logoWhatsapp, trashOutline } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import './ContactItem.scss';

interface ContainerProps { }

export const ContactItem: React.FC<ContainerProps> = () => {
  return (
    <IonAccordionGroup >
      {/* Accordion Start */}
      <IonAccordion value="first" >
        <IonItem slot="header" color="light">
          <IonAvatar className="ion-margin">
            <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
          </IonAvatar >
          <IonLabel>First Accordion</IonLabel>
        </IonItem>
        <div className="ion-padding cta" slot="content">
          <IonIcon icon={logoWhatsapp}></IonIcon>
          <Link to='/view/:id'>
            <IonIcon icon={eyeOutline}></IonIcon>
          </Link>
          <Link to='upsert/:id'>
            <IonIcon icon={createOutline}></IonIcon>
          </Link>
          <IonIcon icon={trashOutline}></IonIcon>
        </div>
      </IonAccordion>
      {/* Accordion Ends here */}
      <IonAccordion value="second" >
        <IonItem slot="header" color="light">
          <IonAvatar className="ion-margin">
            <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
          </IonAvatar >
          <IonLabel>First Accordion</IonLabel>
        </IonItem>
        <div className="ion-padding cta" slot="content">
          <IonIcon icon={logoWhatsapp}></IonIcon>
          <Link to='/view/:id'>
            <IonIcon icon={eyeOutline}></IonIcon>
          </Link>
          <Link to='upsert/:id'>
            <IonIcon icon={createOutline}></IonIcon>
          </Link>
          <IonIcon icon={trashOutline}></IonIcon>
        </div>
      </IonAccordion>
    </IonAccordionGroup>

  );
};


